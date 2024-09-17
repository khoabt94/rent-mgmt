import { ERRORS_DICTIONARY } from '@constraints/error-dictionary.constraint';
import { Room } from '@modules/room/schemas/room.schema';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RoomsRepository } from '@repositories/rooms/rooms.repository';
import { FilterQuery, Schema, Types } from 'mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { QueryRoomDto } from './dto/query-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AreasRepository } from '@repositories/areas/areas.repository';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomsRepository: RoomsRepository,
    private readonly areasRepository: AreasRepository,
  ) { }

  async validateOwner(ownerId: string, roomId: string) {
    const findRoom = await this.getOneById(roomId)
    if (!findRoom) return false
    return String(ownerId) === String(findRoom.area.user)
  }

  async create(createRoomDto: CreateRoomDto) {
    const newRoom = await this.roomsRepository.create(createRoomDto)
    const findArea = await this.areasRepository.getOneById(createRoomDto.area)
    if (!findArea) throw new BadRequestException(ERRORS_DICTIONARY.INFO_NOT_FOUND)
    findArea.room.push(newRoom._id);
    this.areasRepository.update(findArea._id, findArea)
    return newRoom
  }

  getAll(condition: QueryRoomDto) {
    return this.roomsRepository.getManyByQuery(condition as FilterQuery<Room>)
  }

  getOneById(id: string) {
    return this.roomsRepository.getOneById(id)
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomsRepository.update(id, updateRoomDto)
  }

  remove(id: string) {
    return this.roomsRepository.delete(id)
  }
}
