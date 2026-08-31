import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { CreateValuationDto } from './dto/create-valuation.dto.js';
import { ValuationsService } from './valuations.service.js';

@Controller('valuations')
export class ValuationsController {
  constructor(
    private readonly valuationsService:
      ValuationsService,
  ) {}

  @Post()
  calculate(
    @Body() request: CreateValuationDto,
  ) {
    return this.valuationsService.calculate(
      request,
    );
  }
}