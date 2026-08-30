import {
  Controller,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  BuildingsService,
  GeoJsonFeatureCollection,
} from './buildings.service';

@Controller('buildings')
export class BuildingsController {
  constructor(
    private readonly buildingsService: BuildingsService,
  ) {}

  @Get()
  findAll() {
    return this.buildingsService.findAll();
  }

  // MUST be registered before @Get(':id') to prevent route collision
  @Get('geojson')
  async findGeoJson(): Promise<GeoJsonFeatureCollection> {
    return this.buildingsService.findGeoJson();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const building = await this.buildingsService.findById(id);

    if (!building) {
      throw new NotFoundException('Building not found');
    }

    return building;
  }
}