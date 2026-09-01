import {
  useQuery,
} from '@tanstack/react-query';

import {
  getBuildings,
  getBuildingGeoJson,
} from '../api/buildings';

export function useBuildings() {
  return useQuery({
    queryKey: ['buildings'],
    queryFn: getBuildings,
  });
}

export function useBuildingGeoJson() {
  return useQuery({
    queryKey: ['buildings', 'geojson'],
    queryFn: getBuildingGeoJson,
  });
}