import axios from 'axios';

export interface EnvironmentalReading {
  id: string;
  buildingId: string;
  surfaceTemperature: number;
  airTemperature: number | null;
  temperatureDelta: number | null;
  treeCanopyPercentage: number | null;
  energyConsumptionKwh: number | null;
  recordedAt: string;
  createdAt: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function fetchEnvironmentReadings(
  params?: {
    buildingId?: string;
    from?: string;
    to?: string;
  },
): Promise<EnvironmentalReading[]> {
  const response = await api.get<EnvironmentalReading[]>(
    '/api/v1/environment/readings',
    { params },
  );

  return response.data;
}