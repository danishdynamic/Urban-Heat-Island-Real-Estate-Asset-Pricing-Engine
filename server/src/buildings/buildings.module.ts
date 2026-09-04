import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BuildingsController } from './buildings.controller.js';
import { BuildingsService } from './buildings.service.js';
import { Building } from './entities/building.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Building]),
  ],

  controllers: [
    BuildingsController,
  ],

  providers: [
    BuildingsService,
  ],

  exports: [
    BuildingsService,
  ],
})
export class BuildingsModule {}