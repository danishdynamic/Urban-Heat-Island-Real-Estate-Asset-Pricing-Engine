import { useMutation } from '@tanstack/react-query';

import {
  calculateValuation,
  calculateScenarioAnalysis,
} from '../api/valuations';

import type {
  ScenarioAnalysisRequest,
  ValuationRequest,
} from '../types/valuation';

export function useValuation() {
  return useMutation({
    mutationFn: (request: ValuationRequest) =>
      calculateValuation(request),
  });
}

export function useScenarioAnalysis() {
  return useMutation({
    mutationFn: (request: ScenarioAnalysisRequest) =>
      calculateScenarioAnalysis(request),
  });
}