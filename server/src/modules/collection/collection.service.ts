import { ERRORS_DICTIONARY } from '@constraints/error-dictionary.constraint';
import { CreateCollectionDto } from '@modules/collection/dto/create-collection.dto';
import { CollectionStatuses } from '@modules/shared/constants/collection';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CollectionsRepository } from '@repositories/collections/collections.repository';
import { RoomsRepository } from '@repositories/rooms/rooms.repository';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { QueryCollectionDto } from './dto/query-collection.dto';
import { AreasRepository } from '@repositories/areas/areas.repository';

@Injectable()
export class CollectionService {
  constructor(
    private readonly collectionsRepository: CollectionsRepository,
    private readonly roomsRepository: RoomsRepository,
    private readonly areasRepository: AreasRepository,
  ) { }

  async validateOwner(ownerId: string, collectionId: string) {
    const findCollection = await this.getOneById(collectionId)
    if (!findCollection) return false
    return String(ownerId) === String(findCollection.owner)
  }

  async create(createCollectionDto: CreateCollectionDto, owner: string) {
    const { room, end_electricity, end_water, other_fee, deduction } = createCollectionDto

    const latestCollectionResult = await this.getLatestCollection(String(room))

    const { items } = latestCollectionResult
    const [latestCollection] = items
    const findRoom = await this.roomsRepository.getOneById(String(room))
    if (!findRoom) throw new NotFoundException(ERRORS_DICTIONARY.INFO_NOT_FOUND)


    const { rent_fee, area: { electricity_unit_price, water_unit_price } } = findRoom
    const begin_electricity = latestCollection ? latestCollection.end_electricity : 0
    const begin_water = latestCollection ? latestCollection.begin_water : 0
    if ((begin_electricity > end_electricity)) {
      throw new NotFoundException(ERRORS_DICTIONARY.UNSUITABLE_END_ELECTRICITY)
    }
    if ((begin_water > end_water)) {
      throw new NotFoundException(ERRORS_DICTIONARY.UNSUITABLE_END_WATER)
    }
    const amount_due = rent_fee
      + (end_electricity - begin_electricity) * electricity_unit_price
      + (end_water - begin_water) * water_unit_price
      + other_fee
      + deduction

    return this.collectionsRepository.create({
      ...createCollectionDto,
      status: CollectionStatuses.DRAFT,
      owner,
      amount_collect: 0,
      rent_fee,
      electricity_unit_price,
      water_unit_price,
      begin_electricity,
      begin_water,
      amount_due,
    })
  }

  async updateData(collectionId: string, updateCollectionDto: UpdateCollectionDto) {
    const findCollection = await this.getOneById(collectionId)
    if (!findCollection) throw new NotFoundException(ERRORS_DICTIONARY.INFO_NOT_FOUND)
    const { begin_electricity, begin_water, amount_due } = findCollection
    const { end_electricity, end_water, amount_collect } = updateCollectionDto
    if ((begin_electricity > end_electricity)) {
      throw new NotFoundException(ERRORS_DICTIONARY.UNSUITABLE_END_ELECTRICITY)
    }
    if ((begin_water > end_water)) {
      throw new NotFoundException(ERRORS_DICTIONARY.UNSUITABLE_END_WATER)
    }
    await this.collectionsRepository.update(collectionId, {
      ...updateCollectionDto,
      status: amount_collect === amount_due ? CollectionStatuses.COLLECTED : undefined
    })
    return {}
  }

  getOneById(id: string) {
    return this.collectionsRepository.getOneById(id)
  }

  getLatestCollection(room: string) {
    return this.collectionsRepository.getManyByQuery({
      room,
    }, {
      sort: { 'created_at': -1 },
      limit: 1,
    })
  }

  async getAll(queryCollectionDto: QueryCollectionDto) {
    const { area, owner } = queryCollectionDto
    const findArea = await this.areasRepository.getOneById(String(area))
    if (!findArea) throw new NotFoundException(ERRORS_DICTIONARY.INFO_NOT_FOUND)

    const { room } = findArea
    return this.collectionsRepository.getManyByQuery({
      owner,
      room: { $in: room },
      status: queryCollectionDto.isUnpaid ? CollectionStatuses.DRAFT : CollectionStatuses.COLLECTED
    }, {
      populate: 'room'
    })
  }
}
