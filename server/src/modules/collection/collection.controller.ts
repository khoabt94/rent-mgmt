import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CollectionService } from '@modules/collection/collection.service';
import { CreateCollectionDto } from '@modules/collection/dto/create-collection.dto';
import { CurrentUser } from '@decorators/current-user.decorator';
import { User } from '@modules/user/schemas/user.schema';
import { UpdateCollectionItemDto } from '@modules/collection/dto/update-collection-item.dto';
import { OwnerGuard } from '@modules/collection/guards/check-owner.guard';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) { }

  @Post()
  create(@CurrentUser() owner: User, @Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto, owner._id);
  }

  @UseGuards(OwnerGuard)
  @Patch(':collectionId/item/:roomId')
  updateCollectionItem(
    @Param('collectionId') collectionId: string,
    @Param('roomId') roomId: string,
    @Body() updateCollectionItemDto: UpdateCollectionItemDto
  ) {
    return this.collectionService.updateCollectionItem(collectionId, roomId, updateCollectionItemDto);
  }

  // @Get()
  // findAll() {
  //   return this.collectionService.findAll();
  // }

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
