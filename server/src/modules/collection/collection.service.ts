import { ERRORS_DICTIONARY } from '@constraints/error-dictionary.constraint';
import { CreateCollectionDto } from '@modules/collection/dto/create-collection.dto';
import { UpdateCollectionItemDto } from '@modules/collection/dto/update-collection-item.dto';
import { CollectionItemStatuses, CollectionStatuses } from '@modules/shared/constants/collection';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CollectionsRepository } from '@repositories/collections/collections.repository';
import { RoomsRepository } from '@repositories/rooms/rooms.repository';

@Injectable()
export class CollectionService {
  constructor(
    private readonly collectionsRepository: CollectionsRepository,
    private readonly roomsRepository: RoomsRepository,
  ) { }

  async validateOwner(ownerId: string, collectionId: string) {
    const findCollection = await this.getOneById(collectionId)
    if (!findCollection) return false
    return String(ownerId) === String(findCollection.owner)
  }

  async create(createCollectionDto: CreateCollectionDto, ownerId: string) {
    const { collection_items } = createCollectionDto

    const latestCollectionResult = await this.collectionsRepository.getManyByQuery({
      owner: ownerId
    }, {
      sort: { 'created_at': -1 },
      limit: 1,
    })

    const { items } = latestCollectionResult
    const [latestCollection] = items
    // if (
    //   (new Date().getMonth() === new Date(latestCollection.created_at).getMonth())
    //   &&
    //   (new Date().getFullYear() === new Date(latestCollection.created_at).getFullYear())
    // ) {
    //   throw new BadRequestException(ERRORS_DICTIONARY.SAME_MONTH_COLLECTION_EXISTED)
    // }

    const modifiedCollectionItems = await Promise.all(collection_items.map(async (item) => {
      const findRoom = await this.roomsRepository.getOneById(String(item.room))
      if (!findRoom) throw new NotFoundException(ERRORS_DICTIONARY.INFO_NOT_FOUND)

      const findItems = latestCollection.collection_items.find(item => item.room === item.room)

      return {
        ...item,
        status: CollectionItemStatuses.DRAFT,
        rent_fee: findRoom.rent_fee,
        electricity_unit_price: findRoom.area.electricity_unit_price,
        water_unit_price: findRoom.area.water_unit_price,
        begin_electricity: findItems?.end_electricity || 0,
        begin_water: findItems?.end_electricity || 0,
      }
    }))


    return this.collectionsRepository.create({
      ...createCollectionDto,
      status: CollectionStatuses.DRAFT,
      owner: ownerId,
      collection_items: modifiedCollectionItems
    })
  }

  async updateCollectionItem(collectionId: string, roomId: string, updateCollectionItemDto: UpdateCollectionItemDto) {
    const findCollection = await this.getOneById(collectionId)
    if (!findCollection) throw new NotFoundException(ERRORS_DICTIONARY.INFO_NOT_FOUND)

    const findItem = findCollection.collection_items.find(item => String(item.room) === String(roomId))
    if (!findItem) throw new NotFoundException(ERRORS_DICTIONARY.INFO_NOT_FOUND)

    const { end_electricity, end_water, deduction, other_fee } = updateCollectionItemDto
    if (end_electricity < findItem.begin_electricity) throw new BadRequestException(ERRORS_DICTIONARY.UNSUITABLE_END_ELECTRICITY)
    if (end_water < findItem.begin_water) throw new BadRequestException(ERRORS_DICTIONARY.UNSUITABLE_END_WATER)

    await this.collectionsRepository.updateKeyInItems({
      _id: collectionId,
    }, {
      $set: {
        'collection_items.$[].end_electricity': end_electricity,
        'collection_items.$[].end_water': end_water,
        'collection_items.$[].deduction': deduction,
        'collection_items.$[].other_fee': other_fee,
      }
    }, {
      arrayFilters: [
        {
          "i.room": roomId,
        }
      ]
    })

    return {}
  }

  getOneById(id: string) {
    return this.collectionsRepository.getOneById(id)
  }
}
