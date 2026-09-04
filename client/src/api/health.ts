import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface HealthResponse {
  status: string;
  services: {
    database: {
      status: string;
    };
    quantService: {
      status: string;
    };
  };
}

export async function fetchSystemHealth(): Promise<HealthResponse> {
  const response = await api.get<HealthResponse>(
    '/api/v1/health',
  );

  return response.data;
}