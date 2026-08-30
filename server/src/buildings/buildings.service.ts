import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './entities/building.entity'; 

export interface GeoJsonFeature {
  type: 'Feature';
  geometry: any;
  properties: {
    id: string;
    externalId: string;
    name: string;
    address: string;
    squareFootage: number;
    rentalYield: number;
    treeCanopyPercentage: number;
    surfaceTemperature: number;
    energyEfficiencyRating: string;
    annualHvacCost: number;
  };
}

export interface GeoJsonFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJsonFeature[];
}

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
  ) {}

  /**
   * Retrieves all buildings.
   */
  async findAll(): Promise<Building[]> {
    return this.buildingRepository.find();
  }

  /**
   * Retrieves a single building by its primary key ID.
   */
  async findById(id: string): Promise<Building | null> {
    return this.buildingRepository.findOneBy({ id } as any);
  }

  /**
   * Retrieves all buildings transformed directly into a valid GeoJSON FeatureCollection.
   */
  async findGeoJson(): Promise<GeoJsonFeatureCollection> {
    const result = await this.buildingRepository.query(`
      SELECT
        id,
        external_id,
        name,
        address,
        square_footage,
        rental_yield,
        tree_canopy_percentage,
        surface_temperature,
        energy_efficiency_rating,
        annual_hvac_cost,
        ST_AsGeoJSON(geometry)::json AS geometry
      FROM buildings
    `);

    return {
      type: 'FeatureCollection',
      features: result.map((building: any) => ({
        type: 'Feature',
        geometry: building.geometry,
        properties: {
          id: building.id,
          externalId: building.external_id,
          name: building.name,
          address: building.address,
          squareFootage: Number(building.square_footage),
          rentalYield: Number(building.rental_yield),
          treeCanopyPercentage: Number(building.tree_canopy_percentage),
          surfaceTemperature: Number(building.surface_temperature),
          energyEfficiencyRating: building.energy_efficiency_rating,
          annualHvacCost: Number(building.annual_hvac_cost),
        },
      })),
    };
  }
}