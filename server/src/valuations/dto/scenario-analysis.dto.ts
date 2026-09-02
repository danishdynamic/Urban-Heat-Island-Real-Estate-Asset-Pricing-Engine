import {
  IsArray,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import {
  Type,
} from 'class-transformer';

class ScenarioDto {
  @IsString()
  name: string;

  @IsNumber()
  temperatureDelta: number;
}

export class ScenarioAnalysisDto {
  @IsUUID()
  buildingId: string;

  @IsNumber()
  @Min(0)
  baseNoi: number;

  @IsNumber()
  @Min(0)
  baseHvacCost: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  discountRate: number;

  @IsNumber()
  @Min(1)
  @Max(50)
  years: number;

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => ScenarioDto)
  scenarios: ScenarioDto[];
}