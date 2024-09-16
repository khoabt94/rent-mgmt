import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { CurrentUser } from '@decorators/current-user.decorator';
import { User } from '@modules/user/schemas/user.schema';

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

  @Get(':id')
  getOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.areaService.getOne(id, user._id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areaService.update(id, updateAreaDto);
  }
}
