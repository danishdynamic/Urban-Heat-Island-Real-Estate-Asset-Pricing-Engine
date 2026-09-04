import { useQuery } from '@tanstack/react-query';

import {
  fetchBuildings,
  fetchBuildingsGeoJSON,
} from '../api/buildings';

export function useBuildings() {
  return useQuery({
    queryKey: ['buildings'],
    queryFn: () => fetchBuildings(),
  });
}

export function useBuildingGeoJson() {
  return useQuery({
    queryKey: ['buildings', 'geojson'],
    queryFn: fetchBuildingsGeoJSON,
  });
}