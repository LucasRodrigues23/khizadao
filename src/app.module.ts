import { Module } from '@nestjs/common';
import { CollectionsModule } from './modules/collections/collections.module';

@Module({
  imports: [CollectionsModule],
})
export class AppModule { }
