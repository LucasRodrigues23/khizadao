import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from '../../dto/create-collection.dto';
import { UpdateCollectionDto } from '../../dto/update-collection.dto';
import { Collection } from '../../entities/collection.entity';
import { CollectionsRepository } from '../collections.repository';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CollectionsPrismaRespository implements CollectionsRepository {
  constructor(public prisma: PrismaService) {}
  async create(data: CreateCollectionDto): Promise<Collection> {
    const collection = new Collection();
    Object.assign(collection, { ...data });
    const newCollection = await this.prisma.collections.create({
      data: { ...collection },
    });
    return newCollection;
  }
  async findAll(): Promise<Collection[]> {
    const collections = await this.prisma.collections.findMany();
    return collections;
  }
  async findOne(id: string): Promise<Collection> {
    const collection = await this.prisma.collections.findUnique({
      where: { id: id },
    });
    return collection;
  }
  async findByExternalId(externalId: string): Promise<Collection> {
    const collection = await this.prisma.collections.findUnique({
      where: { externalId: externalId },
    });
    return collection;
  }
  async update(id: string, data: UpdateCollectionDto): Promise<Collection> {

    const updatedCollection = await this.prisma.collections.update({
      where: { id: id },
      data: { ...data },
    });
    return updatedCollection;
  }
}
