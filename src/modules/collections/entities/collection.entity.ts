import { JsonValue } from '@prisma/client/runtime/library';
import { randomUUID } from 'node:crypto';

export class Collection {
  readonly id: string;
  externalId: string;
  name?: string | null;
  FloorSale?:
    | {
        '1day': number;
        '7day': number;
        '30day': number;
      }
    | JsonValue;

  constructor() {
    this.id = randomUUID();
  }
}
