import axios from 'axios';
import type {
  BuildingListResponse,
} from '../types/building';
import type { BuildingsGeoJSON } from '../types/geojson';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function fetchBuildings(
  params?: {
    search?: string;
    minTemperature?: number;
    maxTemperature?: number;
    minCanopy?: number;
    maxCanopy?: number;
    limit?: number;
    offset?: number;
  },
): Promise<BuildingListResponse> {
  const response = await api.get<BuildingListResponse>(
    '/api/v1/buildings',
    { params },
  );

  return response.data;
}

export async function fetchBuildingsGeoJSON(): Promise<BuildingsGeoJSON> {
  const response = await api.get<BuildingsGeoJSON>(
    '/api/v1/buildings/geojson',
  );

  return response.data;
}