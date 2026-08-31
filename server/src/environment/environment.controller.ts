import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import { EnvironmentService } from './environment.service.js';
import { EnvironmentQueryDto } from './dto/environment-query.dto.js';

@Controller('environment')
export class EnvironmentController {
  constructor(
    private readonly environmentService:
      EnvironmentService,
  ) {}

  @Get('readings')
  findReadings(
    @Query() query: EnvironmentQueryDto,
  ) {
    return this.environmentService.findReadings(
      query,
    );
  }
}