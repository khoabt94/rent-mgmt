import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RenteeService } from './rentee.service';
import { CreateRenteeDto } from './dto/create-rentee.dto';
import { UpdateRenteeDto } from './dto/update-rentee.dto';
import { CurrentUser } from '@decorators/current-user.decorator';
import { User } from '@modules/user/schemas/user.schema';
import { OwnerGuard } from '@modules/rentee/guards/check-owner.guard';

@Controller('rentee')
export class RenteeController {
  constructor(private readonly renteeService: RenteeService) { }

  @Post()
  create(@Body() createRenteeDto: CreateRenteeDto) {
    return this.renteeService.create(createRenteeDto);
  }

  @Get()
  getAll(@CurrentUser() owner: User) {
    return this.renteeService.getAll(owner._id);
  }

  @UseGuards(OwnerGuard)
  @Get(':renteeId')
  getOne(@Param('renteeId') renteeId: string) {
    return this.renteeService.getOneById(renteeId);
  }

  @UseGuards(OwnerGuard)
  @Patch(':renteeId')
  async update(@Param('renteeId') renteeId: string, @Body() updateRenteeDto: UpdateRenteeDto) {
    return this.renteeService.update(renteeId, updateRenteeDto);
  }

  @UseGuards(OwnerGuard)
  @Delete(':renteeId')
  remove(@Param('renteeId') renteeId: string) {
    return this.renteeService.remove(renteeId);
  }
}
