import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionSchemaFactory } from '@modules/collection/schemas/collection.schema';
import { CollectionsRepository } from '@repositories/collections/collections.repository';
import { RoomsRepository } from '@repositories/rooms/rooms.repository';
import { Room, RoomSchemaFactory } from '@modules/room/schemas/room.schema';
import { AreasRepository } from '@repositories/areas/areas.repository';
import { Area, AreaSchema } from '@modules/area/schemas/area.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Collection.name,
        useFactory: CollectionSchemaFactory,
      }
    ]),
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
  controllers: [CollectionController],
  providers: [CollectionService, CollectionsRepository, RoomsRepository, AreasRepository],
})
export class CollectionModule { }
