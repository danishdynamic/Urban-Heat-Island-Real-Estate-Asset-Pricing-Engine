export interface ValuationRequest {
  buildingId: string;
  annualRent: number;
  operatingExpenses: number;
  vacancyRate: number;
  discountRate: number;
  years: number;
  temperatureDelta: number;
  hvacCostIncrease: number;
}

export interface ValuationResponse {
  property_id: string;
  noi: number;
  adjusted_noi: number;
  cap_rate: number;
  estimated_value: number;
  temperature_delta: number;
  hvac_cost_increase: number;
}

export interface Scenario {
  name: string;
  temperatureDelta: number;
}

export interface ScenarioAnalysisRequest {
  buildingId: string;
  baseNoi: number;
  baseHvacCost: number;
  discountRate: number;
  years: number;
  scenarios: Scenario[];
}

export interface ScenarioResult {
  name: string;
  estimated_value?: number;
  [key: string]: unknown;
}

export interface ScenarioAnalysisResponse {
  scenarios: ScenarioResult[];
}