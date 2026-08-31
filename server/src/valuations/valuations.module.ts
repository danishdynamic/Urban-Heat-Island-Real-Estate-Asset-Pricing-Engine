import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ValuationsController } from './valuations.controller.js';
import { ValuationsService } from './valuations.service.js';

@Module({
  imports: [
    HttpModule,
  ],

  controllers: [
    ValuationsController,
  ],

  providers: [
    ValuationsService,
  ],
})
export class ValuationsModule {}