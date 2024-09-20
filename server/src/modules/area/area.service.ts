import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { AreasRepository } from '@repositories/areas/areas.repository';

@Injectable()
export class AreaService {

  constructor(
    private readonly areasRepository: AreasRepository,
  ) { }

  async validateOwner(ownerId: string, areaId: string) {
    const findArea = await this.getOne(areaId)
    if (!findArea) return false
    return String(ownerId) === String(findArea.user)
  }

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

  getOne(id: string) {
    return this.areasRepository.getOneById(id)
  }

  update(id: string, updateAreaDto: UpdateAreaDto) {
    return this.areasRepository.update(id, updateAreaDto)
  }


}
