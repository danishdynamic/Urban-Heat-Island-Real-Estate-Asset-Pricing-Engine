import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('buildings')
export class Building {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'external_id',
    unique: true,
  })
  externalId: string;

  @Column()
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  address: string | null;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  city: string | null;

  @Column({
    name: 'building_type',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  buildingType: string | null;

  @Column({
    name: 'year_built',
    type: 'integer',
    nullable: true,
  })
  yearBuilt: number | null;

  @Column({
    type: 'integer',
    nullable: true,
  })
  floors: number | null;

  @Column({
    name: 'height_m',
    type: 'numeric',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  heightM: number | null;

  @Column({
    name: 'square_footage',
    type: 'numeric',
  })
  squareFootage: number;

  @Column({
    name: 'annual_rent',
    type: 'numeric',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  annualRent: number | null;

  @Column({
    name: 'operating_expenses',
    type: 'numeric',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  operatingExpenses: number | null;

  @Column({
    name: 'vacancy_rate',
    type: 'numeric',
    precision: 5,
    scale: 4,
    nullable: true,
  })
  vacancyRate: number | null;

  @Column({
    name: 'rental_yield',
    type: 'numeric',
    precision: 8,
    scale: 4,
  })
  rentalYield: number;

  @Column({
    name: 'energy_efficiency_rating',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  energyEfficiencyRating: string | null;

  @Column({
    name: 'tree_canopy_percentage',
    type: 'numeric',
    precision: 5,
    scale: 2,
  })
  treeCanopyPercentage: number;

  @Column({
    name: 'surface_temperature',
    type: 'numeric',
    precision: 6,
    scale: 2,
  })
  surfaceTemperature: number;

  @Column({
    name: 'latitude',
    type: 'double precision',
  })
  latitude: number;

  @Column({
    name: 'longitude',
    type: 'double precision',
  })
  longitude: number;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  geometry: object;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}