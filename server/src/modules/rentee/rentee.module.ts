import { Module } from '@nestjs/common';
import { RenteeService } from '@modules/rentee/rentee.service';
import { RenteeController } from '@modules/rentee/rentee.controller';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Rentee, RenteeSchema, RenteeSchemaFactory } from '@modules/rentee/schemas/rentee.schema';
import { RenteesRepository } from '@repositories/rentees/rentees.repository';
import { Room, RoomSchema } from '@modules/room/schemas/room.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Rentee.name,
        useFactory: RenteeSchemaFactory,
        inject: [getModelToken(Room.name)],
        imports: [
          MongooseModule.forFeature([
            { name: Room.name, schema: RoomSchema },
          ]),
        ],
      }
    ]),
  ],
  controllers: [RenteeController],
  providers: [RenteeService, RenteesRepository],
})
export class RenteeModule { }
