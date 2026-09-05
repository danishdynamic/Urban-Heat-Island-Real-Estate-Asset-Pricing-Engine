import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async check() {
    const databaseStatus = await this.checkDatabase();
    const quantServiceStatus = await this.checkQuantService();

    const allHealthy =
      databaseStatus.status === 'up' &&
      quantServiceStatus.status === 'up';

    return {
      status: allHealthy ? 'ok' : 'degraded',
      service: 'urban-heat-api',
      timestamp: new Date().toISOString(),
      services: {
        database: databaseStatus,
        quantService: quantServiceStatus,
      },
    };
  }

  private async checkDatabase() {
    try {
      await this.dataSource.query('SELECT 1');

      return {
        status: 'up',
      };
    } catch {
      return {
        status: 'down',
      };
    }
  }

  private async checkQuantService() {
    try {
      const quantServiceUrl =
        this.configService.get<string>(
          'quantService.url',
        ) ?? 'http://localhost:8000';

      const response = await fetch(
        `${quantServiceUrl}/health`,
      );

      return {
        status: response.ok ? 'up' : 'down',
      };
    } catch {
      return {
        status: 'down',
      };
    }
  }
}