import { api } from './axios';

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

export async function calculateValuation(
  request: ValuationRequest,
) {
  const response =
    await api.post(
      '/valuations',
      request,
    );

  return response.data;
}