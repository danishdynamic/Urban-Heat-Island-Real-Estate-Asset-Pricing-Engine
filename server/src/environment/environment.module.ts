import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvironmentalReading } from './entities/environmental-reading.entity.js';
import { EnvironmentController } from './environment.controller.js';
import { EnvironmentService } from './environment.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EnvironmentalReading,
    ]),
  ],

  controllers: [
    EnvironmentController,
  ],

  providers: [
    EnvironmentService,
  ],
})
export class EnvironmentModule {}