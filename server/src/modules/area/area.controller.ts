import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AreaService } from '@modules/area/area.service';
import { CreateAreaDto } from '@modules/area/dto/create-area.dto';
import { UpdateAreaDto } from '@modules/area/dto/update-area.dto';
import { CurrentUser } from '@decorators/current-user.decorator';
import { User } from '@modules/user/schemas/user.schema';
import { OwnerGuard } from '@modules/area/guards/check-owner.guard';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) { }

  @Post()
  create(@CurrentUser() user: User, @Body() createAreaDto: CreateAreaDto) {
    return this.areaService.create(createAreaDto, user._id);
  }

  @Get()
  getAll(@CurrentUser() user: User) {
    return this.areaService.getAll(user._id);
  }

  @UseGuards(OwnerGuard)
  @Get(':areaId')
  getOne(@Param('areaId') id: string) {
    return this.areaService.getOne(id);
  }

  @UseGuards(OwnerGuard)
  @Patch(':areaId')
  update(@Param('areaId') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areaService.update(id, updateAreaDto);
  }
}
