import { Module } from '@nestjs/common';
import { AreaService } from '@modules/area/area.service';
import { AreaController } from '@modules/area/area.controller';
import { AreasRepository } from '@repositories/areas/areas.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from '@modules/area/schemas/area.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Area.name,
        schema: AreaSchema
      }
    ]),
  ],
  controllers: [AreaController],
  providers: [AreaService, AreasRepository],
})
export class AreaModule { }
