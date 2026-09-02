import {
  useMutation,
} from '@tanstack/react-query';

import {
  calculateValuation,
  type ValuationRequest,
} from '../api/valuations';

export function useValuation() {
  return useMutation({
    mutationFn: (
      request: ValuationRequest,
    ) =>
      calculateValuation(request),
  });
}