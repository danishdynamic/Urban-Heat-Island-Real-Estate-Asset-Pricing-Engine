import axios from 'axios';

import type {
  ScenarioAnalysisRequest,
  ValuationRequest,
  ValuationResponse,
} from '../types/valuation';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function calculateValuation(
  request: ValuationRequest,
): Promise<ValuationResponse> {
  const response = await api.post<ValuationResponse>(
    '/api/v1/valuations',
    request,
  );

  return response.data;
}

export async function calculateScenarioAnalysis(
  request: ScenarioAnalysisRequest,
) {
  const response = await api.post(
    '/api/v1/valuations/scenario',
    request,
  );

  return response.data;
}