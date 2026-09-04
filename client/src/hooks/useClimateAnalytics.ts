import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { BuildingListResponse } from '../types/building';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function useClimateAnalytics() {
  const query = useQuery({
    queryKey: ['buildings'],
    queryFn: async (): Promise<BuildingListResponse> => {
      const response = await api.get<BuildingListResponse>(
        '/api/v1/buildings',
      );

      return response.data;
    },
  });

  const analytics = useMemo(() => {
    const buildings = query.data?.data ?? [];

    if (buildings.length === 0) {
      return {
        buildingCount: 0,
        averageSurfaceTemperature: 0,
        averageTreeCanopy: 0,
        hottestTemperature: 0,
        hottestBuilding: null,
      };
    }

    const averageSurfaceTemperature =
      buildings.reduce(
        (sum, building) => sum + building.surfaceTemperature,
        0,
      ) / buildings.length;

    const averageTreeCanopy =
      buildings.reduce(
        (sum, building) => sum + building.treeCanopyPercentage,
        0,
      ) / buildings.length;

    const hottestBuilding = buildings.reduce((hottest, building) =>
      building.surfaceTemperature > hottest.surfaceTemperature
        ? building
        : hottest,
    );

    return {
      buildingCount: buildings.length,
      averageSurfaceTemperature,
      averageTreeCanopy,
      hottestTemperature: hottestBuilding.surfaceTemperature,
      hottestBuilding,
    };
  }, [query.data]);

  return {
    ...query,
    analytics,
  };
}