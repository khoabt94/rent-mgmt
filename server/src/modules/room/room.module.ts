import { Area, AreaSchema } from '@modules/area/schemas/area.schema';
import { RoomController } from '@modules/room/room.controller';
import { RoomService } from '@modules/room/room.service';
import { Room, RoomSchemaFactory } from '@modules/room/schemas/room.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AreasRepository } from '@repositories/areas/areas.repository';
import { RoomsRepository } from '@repositories/rooms/rooms.repository';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Room.name,
        useFactory: RoomSchemaFactory,
      }
    ]),
    MongooseModule.forFeature([
      {
        name: Area.name,
        schema: AreaSchema
      }
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService, RoomsRepository, AreasRepository],
})
export class RoomModule { }
