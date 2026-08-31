import {
  IsNumber,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateValuationDto {
  @IsUUID()
  buildingId: string;

  @IsNumber()
  @Min(0)
  annualRent: number;

  @IsNumber()
  @Min(0)
  operatingExpenses: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  vacancyRate: number;

  @IsNumber()
  @Min(0.0001)
  @Max(0.9999)
  discountRate: number;

  @IsNumber()
  @Min(1)
  @Max(50)
  years: number;

  @IsNumber()
  temperatureDelta: number;

  @IsNumber()
  @Min(0)
  hvacCostIncrease: number;
}