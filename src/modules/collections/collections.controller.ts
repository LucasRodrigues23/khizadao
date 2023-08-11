import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import path from 'path';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) { }

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @Get()
  findAll() {
    return this.collectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionsService.findOne(id);
  }

  @Get('external/:id')
  findByExternal(@Param('id') id: string) {
    return this.collectionsService.findByExternal(id);
  }
}

@Controller('sync')
export class SyncController {
  constructor(private readonly collectionsService: CollectionsService) { }

  @Post()
  syncDB() {
    return this.collectionsService.syncDB();
  }
}
