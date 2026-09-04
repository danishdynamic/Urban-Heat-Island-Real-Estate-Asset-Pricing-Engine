import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './entities/building.entity.js'; 
import { BuildingQueryDto } from './dto/building-query.dto.js';

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
   * Retrieves paginated buildings based on filtering criteria.
   */
  async findAll(query: BuildingQueryDto) {
    const {
      search,
      minTemperature,
      maxTemperature,
      minCanopy,
      maxCanopy,
      limit = 50,
      offset = 0,
    } = query;

    const qb = this.buildingRepository
      .createQueryBuilder('building')
      .orderBy('building.createdAt', 'DESC')
      .take(Math.min(limit, 100))
      .skip(offset);

    if (search) {
      qb.andWhere(
        `
        (
          building.name ILIKE :search
          OR building.externalId ILIKE :search
          OR building.address ILIKE :search
        )
        `,
        {
          search: `%${search}%`,
        },
      );
    }

    if (minTemperature !== undefined) {
      qb.andWhere(
        'building.surfaceTemperature >= :minTemperature',
        { minTemperature },
      );
    }

    if (maxTemperature !== undefined) {
      qb.andWhere(
        'building.surfaceTemperature <= :maxTemperature',
        { maxTemperature },
      );
    }

    if (minCanopy !== undefined) {
      qb.andWhere(
        'building.treeCanopyPercentage >= :minCanopy',
        { minCanopy },
      );
    }

    if (maxCanopy !== undefined) {
      qb.andWhere(
        'building.treeCanopyPercentage <= :maxCanopy',
        { maxCanopy },
      );
    }

    const [buildings, total] = await qb.getManyAndCount();

    return {
      data: buildings,
      meta: {
        total,
        limit,
        offset,
      },
    };
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
        height_m,
        square_footage,
        rental_yield,
        tree_canopy_percentage,
        surface_temperature,
        energy_efficiency_rating,
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
          heightM: Number(building.height_m),
          squareFootage: Number(building.square_footage),
          rentalYield: Number(building.rental_yield),
          treeCanopyPercentage: Number(building.tree_canopy_percentage),
          surfaceTemperature: Number(building.surface_temperature),
          energyEfficiencyRating: building.energy_efficiency_rating,
        },
      })),
    };
  };
};