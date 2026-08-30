import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
    name: 'square_footage',
    type: 'numeric',
  })
  squareFootage: number;

  @Column({
    name: 'rental_yield',
    type: 'numeric',
    precision: 8,
    scale: 4,
  })
  rentalYield: number;

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
    name: 'energy_efficiency_rating',
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  energyEfficiencyRating: string | null;

  @Column({
    name: 'annual_hvac_cost',
    type: 'numeric',
  })
  annualHvacCost: number;

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

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}