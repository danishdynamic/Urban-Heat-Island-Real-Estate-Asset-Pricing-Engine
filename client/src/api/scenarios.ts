import axios from 'axios';

import type {
  ScenarioAnalysisRequest,
  ScenarioAnalysisResponse,
} from '../types/valuation';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function calculateScenarioAnalysis(
  request: ScenarioAnalysisRequest,
): Promise<ScenarioAnalysisResponse> {
  const response = await api.post<ScenarioAnalysisResponse>(
    '/api/v1/valuations/scenario',
    request,
  );

  return response.data;
}