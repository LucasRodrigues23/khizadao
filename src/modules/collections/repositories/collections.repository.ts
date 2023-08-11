import { CreateCollectionDto } from '../dto/create-collection.dto';
import { UpdateCollectionDto } from '../dto/update-collection.dto';
import { Collection } from '../entities/collection.entity';

export abstract class CollectionsRepository {
  abstract create(data: CreateCollectionDto): Promise<Collection> | Collection;
  abstract findAll(): Promise<Collection[]> | Collection[];
  abstract findOne(id: string): Promise<Collection> | Collection;
  abstract findByExternalId(
    externalId: string,
  ): Promise<Collection> | Collection;
  abstract update(
    id: string,
    data: UpdateCollectionDto,
  ): Promise<Collection> | Collection;
}
