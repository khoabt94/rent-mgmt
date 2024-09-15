import { Module } from '@nestjs/common';
import { RenteeService } from '@modules/rentee/rentee.service';
import { RenteeController } from '@modules/rentee/rentee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rentee, RenteeSchema, RenteeSchemaFactory } from '@modules/rentee/schemas/rentee.schema';
import { RenteesRepository } from '@repositories/rentees/rentees.repository';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Rentee.name,
        useFactory: RenteeSchemaFactory,
      }
    ]),
  ],
  controllers: [RenteeController],
  providers: [RenteeService, RenteesRepository],
})
export class RenteeModule { }
