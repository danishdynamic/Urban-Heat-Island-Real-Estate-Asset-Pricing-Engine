import { useQuery } from '@tanstack/react-query';

import { fetchEnvironmentReadings } from '../api/environment';

export function useEnvironmentReadings(
  buildingId?: string,
) {
  return useQuery({
    queryKey: ['environment', 'readings', buildingId],
    queryFn: () =>
      fetchEnvironmentReadings(
        buildingId ? { buildingId } : undefined,
      ),
  });
}