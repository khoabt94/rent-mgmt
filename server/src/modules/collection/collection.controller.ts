import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { CurrentUser } from '@decorators/current-user.decorator';
import { User } from '@modules/user/schemas/user.schema';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) { }

  @Post()
  create(@CurrentUser() owner: User, @Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto, owner._id);
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
