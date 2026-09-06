import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ValuationsController } from './valuations.controller.js';
import { ValuationsService } from './valuations.service.js';
import { EnvironmentalReading } from '../environment/entities/environmental-reading.entity.js';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      EnvironmentalReading,
    ]),
  ],
  controllers: [
    ValuationsController,
  ],
  providers: [
    ValuationsService,
  ],
})
export class ValuationsModule {}