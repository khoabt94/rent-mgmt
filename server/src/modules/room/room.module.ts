import { RoomController } from '@modules/room/room.controller';
import { RoomService } from '@modules/room/room.service';
import { Room, RoomSchemaFactory } from '@modules/room/schemas/room.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsRepository } from '@repositories/rooms/rooms.repository';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Room.name,
        useFactory: RoomSchemaFactory,
      }
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService, RoomsRepository],
})
export class RoomModule { }
