import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';

import { BuildingsService } from './buildings.service.js';
import { BuildingQueryDto } from './dto/building-query.dto.js';

@Controller('buildings')
export class BuildingsController {
  constructor(
    private readonly buildingsService: BuildingsService,
  ) {}

  @Get()
  findAll(
    @Query() query: BuildingQueryDto,
  ) {
    return this.buildingsService.findAll(query);
  }

  @Get('geojson')
  findGeoJson() {
    return this.buildingsService.findGeoJson();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ) {
    const building =
      await this.buildingsService.findById(id);

    if (!building) {
      throw new NotFoundException(
        'Building not found',
      );
    }

    return building;
  }
}