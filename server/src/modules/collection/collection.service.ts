import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { CollectionsRepository } from '@repositories/collections/collections.repository';
import { CollectionItemStatuses, CollectionStatuses } from '@modules/shared/constants/collection';
import { RoomsRepository } from '@repositories/rooms/rooms.repository';
import { ERRORS_DICTIONARY } from '@constraints/error-dictionary.constraint';

@Injectable()
export class CollectionService {
  constructor(
    private readonly collectionsRepository: CollectionsRepository,
    private readonly roomsRepository: RoomsRepository,
  ) { }
  create(createCollectionDto: CreateCollectionDto, ownerId: string) {
    const { collection_items } = createCollectionDto


    const modifiedCollectionItems = collection_items.map(async (item) => {
      const findRoom = await this.roomsRepository.getOneById(String(item.room))
      console.log("🚀 ~ CollectionService ~ modifiedCollectionItems ~ findRoom:", findRoom)
      if (!findRoom) throw new NotFoundException(ERRORS_DICTIONARY.INFO_NOT_FOUND)

      return {
        ...item,
        status: CollectionItemStatuses.DRAFT,
        rent_fee: findRoom.rent_fee,
        // electricity_unit_price: number,
        // water_unit_price: number,
        // begin_electricity: number,
        // begin_water: number,
      }
    })


    return this.collectionsRepository.create({
      ...createCollectionDto,
      status: CollectionStatuses.DRAFT,
      owner: ownerId,
      collection_items: modifiedCollectionItems
    })
  }

  findAll() {
    return `This action returns all collection`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collection`;
  }

  update(id: number, updateCollectionDto: any) {
    return `This action updates a #${id} collection`;
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
