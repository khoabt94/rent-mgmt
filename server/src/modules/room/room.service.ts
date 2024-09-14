import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsRepository } from '@repositories/rooms/rooms.repository';
import { FilterQuery } from 'mongoose';
import { Room } from '@modules/room/schemas/room.schema';
import { QueryRoomDto } from './dto/query-room.dto';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomsRepository: RoomsRepository,
  ) { }

  create(createRoomDto: CreateRoomDto) {
    return this.roomsRepository.create(createRoomDto)
  }

  getAll(condition: QueryRoomDto) {
    return this.roomsRepository.getManyByQuery(condition as FilterQuery<Room>)
  }

  getOne(id: string) {
    return this.roomsRepository.getOneByQuery({
      _id: id,
    })
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomsRepository.update(id, updateRoomDto)
  }

  remove(id: string) {
    return this.roomsRepository.delete(id)
  }
}
