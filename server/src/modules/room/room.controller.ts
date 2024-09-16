import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RoomService } from '@modules/room/room.service';
import { CreateRoomDto } from '@modules/room/dto/create-room.dto';
import { UpdateRoomDto } from '@modules/room/dto/update-room.dto';
import { QueryRoomDto } from '@modules/room/dto/query-room.dto';
import { OwnerGuard } from '@modules/room/guards/check-owner.guard';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll(@Query() query: QueryRoomDto) {
    return this.roomService.getAll(query);
  }

  @UseGuards(OwnerGuard)
  @Get(':roomId')
  findOne(@Param('id') id: string) {
    return this.roomService.getOneById(id);
  }

  @UseGuards(OwnerGuard)
  @Patch(':roomId')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @UseGuards(OwnerGuard)
  @Delete(':roomId')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
