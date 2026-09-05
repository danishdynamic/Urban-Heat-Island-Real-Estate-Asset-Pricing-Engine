import {
  IsNumber,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateValuationDto {
  @IsUUID()
  buildingId: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  annualRent: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  operatingExpenses: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  vacancyRate: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0.0001)
  @Max(0.9999)
  discountRate: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  years: number;

  @Type(() => Number)
  @IsNumber()
  temperatureDelta: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  hvacCostIncrease: number;
}