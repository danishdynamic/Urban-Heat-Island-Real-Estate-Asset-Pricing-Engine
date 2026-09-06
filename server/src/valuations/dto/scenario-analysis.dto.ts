import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ScenarioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  temperatureDelta: number;
}

export class ScenarioAnalysisDto {
  @IsUUID()
  buildingId: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  baseNoi: number;

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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScenarioDto)
  scenarios: ScenarioDto[];
}