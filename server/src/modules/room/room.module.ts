import { Module } from '@nestjs/common';
import { RoomService } from '@modules/room/room.service';
import { RoomController } from '@modules/room/room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from '@modules/room/schemas/room.schema';
import { RoomsRepository } from '@repositories/rooms/rooms.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema
      }
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService, RoomsRepository],
})
export class RoomModule { }
