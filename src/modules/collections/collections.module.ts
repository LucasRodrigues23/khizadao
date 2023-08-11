import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import {
  CollectionsController,
  SyncController,
} from './collections.controller';
import { CollectionsRepository } from './repositories/collections.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CollectionsPrismaRespository } from './repositories/prisma/collections.prisma.repository';

@Module({
  controllers: [CollectionsController, SyncController],
  providers: [
    CollectionsService,
    PrismaService,
    {
      provide: CollectionsRepository,
      useClass: CollectionsPrismaRespository,
    },
  ],
  exports: [CollectionsService],
})
export class CollectionsModule {}
