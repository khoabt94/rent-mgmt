import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RenteesRepository } from '@repositories/rentees/rentees.repository';
import { CreateRenteeDto } from '@modules/rentee/dto/create-rentee.dto';
import { UpdateRenteeDto } from '@modules/rentee/dto/update-rentee.dto';

@Injectable()
export class RenteeService {
  constructor(
    private readonly renteesRepository: RenteesRepository,
  ) { }

  async validateOwner(ownerId: string, renteeId: string) {
    const findRentee = await this.getOneById(renteeId)
    if (!findRentee) return false
    return String(ownerId) === String(findRentee.owner)
  }

  create(createRoomDto: CreateRenteeDto, ownerId: string) {
    return this.renteesRepository.create({
      ...createRoomDto,
      owner: ownerId
    })
  }

  getAll(ownerId: string) {
    return this.renteesRepository.getManyByQuery({
      owner: ownerId
    })
  }

  getOneById(id: string) {
    return this.renteesRepository.getOneById(id)
  }

  update(id: string, updateRenteeDto: UpdateRenteeDto) {
    return this.renteesRepository.update(id, updateRenteeDto)
  }

  remove(id: string) {
    return this.renteesRepository.delete(id)
  }
}
