import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { CollectionsRepository } from './repositories/collections.repository';
import axios from 'axios';

@Injectable()
export class CollectionsService {
  constructor(private collectionsRepository: CollectionsRepository) { }

  async create(createCollectionDto: CreateCollectionDto) {
    const response = await axios.get(
      'https://api.reservoir.tools/collections/v6',
    );
    const collectionExists = response.data.collections.findIndex(
      (item) => item.id === createCollectionDto.externalId,
    );
    if (collectionExists) {
      throw new NotFoundException('Collection not found');
    }
    const findCollection = await this.collectionsRepository.findByExternalId(
      createCollectionDto.externalId,
    );
    if (findCollection) {
      throw new ConflictException('Collection already exists');
    }
    const collection = await this.collectionsRepository.create(
      createCollectionDto,
    );

    return collection;
  }

  async findAll() {
    const collections = await this.collectionsRepository.findAll();
    console.log(collections);

    const allSync = collections.every(
      (item) => item.FloorSale !== null && item.FloorSale !== undefined,
    );
    if (!allSync) {
      return { message: 'Need Sync before' };
    }

    const total = collections.reduce(
      (acc, item) => acc + item.FloorSale['30day'],
      0,
    );
    const media = total / collections.length;

    const max = collections.reduce((acc, item) => {
      if (item.FloorSale['30day']) {
      }
      return item.FloorSale['30day'] > acc ? item.FloorSale['30day'] : acc;
    }, -Infinity);

    const min = collections.reduce((min, item) => {
      return item.FloorSale['30day'] < min ? item.FloorSale['30day'] : min;
    }, Infinity);

    return {
      average30DayFloor: `${media}%`,
      biggert30DayFloor: `${max}%`,
      smaller30DayFloor: `${min}%`,
      collections: collections,
    };
  }

  async findOne(id: string) {
    const collection = await this.collectionsRepository.findOne(id);
    if (!collection) {
      throw new NotFoundException('Collection not found !');
    }
    return collection;
  }

  async findByExternal(id: string) {
    const collection = await this.collectionsRepository.findByExternalId(id);
    if (!collection) {
      throw new NotFoundException('Collection not found !');
    }
    return collection;
  }

  async syncDB() {
    try {
      const response = await axios.get(
        'https://api.reservoir.tools/collections/v6',
      );

      const collectionsData = response.data.collections;

      for (const item of collectionsData) {
        const body = {
          name: item.name,
          FloorSale: item.floorSale,
        };
        const externalId = item.id;
        const collection = await this.collectionsRepository.findByExternalId(
          externalId,
        );
        if (collection) {
          await this.collectionsRepository.update(collection.id, body);
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to synchronize collections');
    }
    return { message: 'Synchronized successfully' };
  }
}
