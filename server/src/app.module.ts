import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration.js';
import { DatabaseModule } from './database/database.module.js';
import { HealthModule } from './health/health.module.js';
import { BuildingsModule } from './buildings/buildings.module.js';
import { EnvironmentModule } from './environment/environment.module.js';
import { ValuationsModule } from './valuations/valuations.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    DatabaseModule,

    HealthModule,

    BuildingsModule,

    EnvironmentModule,

    ValuationsModule,
  ],
})
export class AppModule {}