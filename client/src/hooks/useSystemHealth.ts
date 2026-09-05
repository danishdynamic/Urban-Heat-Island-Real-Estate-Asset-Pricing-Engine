import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface ServiceStatus {
  status: string;
}

export interface HealthResponse {
  status: string; 
  services?: {
    database?: ServiceStatus;
    quantService?: ServiceStatus;
    api?: ServiceStatus;
  };
  database?: ServiceStatus;
  quantService?: ServiceStatus;
  api?: ServiceStatus;
}

export async function fetchSystemHealth(): Promise<HealthResponse> {
  const response = await api.get<HealthResponse>('/api/v1/health');
  return response.data;
}

export function useSystemHealth() {
  return useQuery<HealthResponse>({
    queryKey: ['system-health'],
    queryFn: fetchSystemHealth,
    refetchInterval: 10000,
  });
}