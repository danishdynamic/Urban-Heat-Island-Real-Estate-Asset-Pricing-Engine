import React from 'react';
import { useSystemHealth } from '../../hooks/useSystemHealth';

export const SystemHealth: React.FC = () => {
  const { data, isLoading, isError } = useSystemHealth();

  if (isLoading) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          System Health
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          Checking services...
        </p>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className="rounded-xl border border-rose-200 bg-rose-50/50 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          System Health
        </h2>
        <p className="mt-3 text-sm text-rose-600">
          Unable to reach the health API.
        </p>
      </section>
    );
  }

  // Extract DB and Quant statuses from API payload
  const dbStatus =
    data.services?.database?.status ?? data.database?.status ?? 'down';

  const quantStatus =
    data.services?.quantService?.status ?? data.quantService?.status ?? 'down';

  // If we received data from /api/v1/health, NestJS API is up
  const apiStatus =
    data.services?.api?.status ?? data.api?.status ?? data.status ?? 'up';

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          System Health
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Live status of application services.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <HealthCard name="PostgreSQL" status={dbStatus} />
        <HealthCard name="NestJS API" status={apiStatus} />
        <HealthCard name="Quant Service" status={quantStatus} />
      </div>
    </section>
  );
};

interface HealthCardProps {
  name: string;
  status?: string;
}

const HealthCard: React.FC<HealthCardProps> = ({ name, status = 'down' }) => {
  const safeStatus = typeof status === 'string' ? status : 'down';
  const isUp =
    safeStatus.toLowerCase() === 'up' || safeStatus.toLowerCase() === 'ok';

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div>
        <p className="text-sm font-medium text-slate-900">{name}</p>

        <p
          className={`mt-1 text-xs font-semibold ${
            isUp ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {safeStatus.toUpperCase()}
        </p>
      </div>

      <div
        className={`h-3 w-3 rounded-full ${
          isUp ? 'bg-emerald-500' : 'bg-rose-500'
        }`}
      />
    </div>
  );
};

export default SystemHealth;