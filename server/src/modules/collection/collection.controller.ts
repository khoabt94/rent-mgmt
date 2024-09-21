import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CollectionService } from '@modules/collection/collection.service';
import { CreateCollectionDto } from '@modules/collection/dto/create-collection.dto';
import { CurrentUser } from '@decorators/current-user.decorator';
import { User } from '@modules/user/schemas/user.schema';
import { OwnerGuard } from '@modules/collection/guards/check-owner.guard';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { QueryCollectionDto } from './dto/query-collection.dto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) { }

  @Post()
  create(@CurrentUser() owner: User, @Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto, owner._id);
  }

  @UseGuards(OwnerGuard)
  @Patch(':collectionId')
  updateCollectionItem(
    @Param('collectionId') collectionId: string,
    @Body() updateCollectionDto: UpdateCollectionDto
  ) {
    return this.collectionService.updateData(collectionId, updateCollectionDto);
  }

  @UseGuards(OwnerGuard)
  @Get('/latest')
  getLatestCollection(
    @Query('room') room: string,
  ) {
    return this.collectionService.getLatestCollection(room);
  }

  @Get()
  findAll(@CurrentUser() owner: User, @Query() queryCollectionDto: QueryCollectionDto) {
    return this.collectionService.getAll({
      owner: owner._id,
      ...queryCollectionDto
    });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.collectionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
  //   return this.collectionService.update(+id, updateCollectionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.collectionService.remove(+id);
  // }
}
