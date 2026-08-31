import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('environmental_readings')
@Index([
  'buildingId',
  'recordedAt',
])
export class EnvironmentalReading {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'building_id',
    type: 'uuid',
  })
  buildingId: string;

  @Column({
    name: 'surface_temperature',
    type: 'numeric',
    precision: 6,
    scale: 2,
  })
  surfaceTemperature: number;

  @Column({
    name: 'air_temperature',
    type: 'numeric',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  airTemperature: number | null;

  @Column({
    name: 'temperature_delta',
    type: 'numeric',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  temperatureDelta: number | null;

  @Column({
    name: 'tree_canopy_percentage',
    type: 'numeric',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  treeCanopyPercentage: number | null;

  @Column({
    name: 'energy_consumption_kwh',
    type: 'numeric',
    nullable: true,
  })
  energyConsumptionKwh: number | null;

  @Column({
    name: 'recorded_at',
    type: 'timestamptz',
  })
  recordedAt: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}