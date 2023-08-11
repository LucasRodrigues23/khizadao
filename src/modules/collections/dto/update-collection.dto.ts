import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionDto } from './create-collection.dto';

export class UpdateCollectionDto extends PartialType(CreateCollectionDto) {
  externalId?: string;
  name: string;
  FloorSale:
    | {
      '1day': any;
      '7day': any;
      '30day': any;
    }
    | any;
}
