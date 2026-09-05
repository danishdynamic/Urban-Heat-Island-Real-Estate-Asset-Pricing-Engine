export type HealthStatus = 'up' | 'down' | 'ok' | 'error' | string;

export interface ServiceHealth {
  status: HealthStatus;
  details?: Record<string, unknown>;
}

export interface SystemHealthData {
  status?: HealthStatus;
  timestamp?: string;
  // Supports direct top-level keys or nested .services wrapper
  services?: {
    database?: ServiceHealth;
    api?: ServiceHealth;
    quantService?: ServiceHealth;
  };
  database?: ServiceHealth;
  api?: ServiceHealth;
  quantService?: ServiceHealth;
}