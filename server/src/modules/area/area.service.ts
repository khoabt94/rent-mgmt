import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AreasRepository } from '@repositories/areas/areas.repository';

@Injectable()
export class AreaService {

  constructor(
    private readonly areasRepository: AreasRepository,
  ) { }

  create(createAreaDto: CreateAreaDto, userId: string) {
    return this.areasRepository.create({
      ...createAreaDto,
      user: userId
    })
  }

  getAll(userId: string) {
    return this.areasRepository.getManyByQuery({
      user: userId
    })
  }

  getOne(id: string, userId: string) {
    return this.areasRepository.getOneByQuery({
      user: userId,
      _id: id,
    })
  }

  update(id: string, updateAreaDto: UpdateAreaDto) {
    console.log({ id, updateAreaDto });
    return this.areasRepository.update(id, updateAreaDto)
  }


}
