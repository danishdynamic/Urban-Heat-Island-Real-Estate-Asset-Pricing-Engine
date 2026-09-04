import { useQuery } from '@tanstack/react-query';

import { fetchBuildingsGeoJSON } from '../api/buildings';

export function useBuildingData() {
  return useQuery({
    queryKey: ['buildings', 'geojson'],
    queryFn: fetchBuildingsGeoJSON,
  });
}