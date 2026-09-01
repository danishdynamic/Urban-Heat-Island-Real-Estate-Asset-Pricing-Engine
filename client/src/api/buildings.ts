import { api } from './axios';

import type {
  BuildingListResponse,
} from '../types/building';

import type {
  BuildingFeatureCollection,
} from '../types/geojson';

export async function getBuildings() {
  const response =
    await api.get<BuildingListResponse>(
      '/buildings',
    );

  return response.data;
}

export async function getBuildingGeoJson() {
  const response =
    await api.get<BuildingFeatureCollection>(
      '/buildings/geojson',
    );

  return response.data;
}