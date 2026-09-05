import {
  Injectable,
  BadGatewayException,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';

import { CreateValuationDto } from './dto/create-valuation.dto.js';
import { ScenarioAnalysisDto } from './dto/scenario-analysis.dto.js';

@Injectable()
export class ValuationsService {
  private readonly quantServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.quantServiceUrl =
      this.configService.get<string>(
        'quantService.url',
      ) ?? 'http://localhost:8000';
  }

    async calculate(request: CreateValuationDto) {
    console.log('Valuation request received:', request);

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.quantServiceUrl}/valuation/dcf`,
          {
            property_id: request.buildingId,
            annual_rent: request.annualRent,
            operating_expenses: request.operatingExpenses,
            vacancy_rate: request.vacancyRate,
            discount_rate: request.discountRate,
            years: request.years,
            temperature_delta: request.temperatureDelta,
            hvac_cost_increase: request.hvacCostIncrease,
          },
        ),
      );

      return response.data;
    } catch (error) {
      console.error('Quant valuation error:', error);

      throw new BadGatewayException(
        'Quant valuation service unavailable',
      );
    }
  }

  async scenarioAnalysis(
    request: ScenarioAnalysisDto,
  ) {
    try {
      const response =
        await firstValueFrom(
          this.httpService.post(
            `${this.quantServiceUrl}/risk/scenario`,
            {
              base_noi: request.baseNoi,

              base_hvac_cost:
                request.baseHvacCost,

              discount_rate:
                request.discountRate,

              years: request.years,

              scenarios:
                request.scenarios.map(
                  (scenario) => ({
                    name: scenario.name,

                    temperature_delta:
                      scenario.temperatureDelta,
                  }),
                ),
            },
          ),
        );

      return response.data;
    } catch {
      throw new BadGatewayException(
        'Risk valuation service unavailable',
      );
    }
  }
}