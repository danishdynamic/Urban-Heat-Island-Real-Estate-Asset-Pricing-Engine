import { useState } from 'react';
import AppShell from '../components/layout/AppShell';
import BuildingMap from '../components/map/BuildingMap';
import ClimateAnalytics from '../components/dashboard/ClimateAnalytics';
import ClimateTrendChart from '../components/dashboard/ClimateTrendChart';
import SystemHealth from '../components/health/SystemHealth';
import ValuationPanel from '../components/dashboard/ValuationPanel';
import ScenarioAnalysis from '../components/dashboard/ScenarioAnalysis';
import { useBuildingData } from '../hooks/useBuildingData';
import { useBuildings } from '../hooks/useBuildings';
import type { Building } from '../types/building';

export default function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useBuildingData();

  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);

  const buildingsQuery = useBuildings();

  const selectedBuilding: Building | null =
    buildingsQuery.data?.data.find(
      (building) => building.id === selectedBuildingId,
    ) ?? null;

  return (
    <AppShell>
      <div className="space-y-8 bg-slate-50 min-h-screen p-6 text-slate-900">
        {/* Header Banner */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold tracking-wider text-cyan-600 uppercase">
              Urban Analytics
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Environmental and financial intelligence for urban real estate assets.
            </p>
          </div>
        </div>

        {/* Top Summary Metrics */}
        <section id="climate" className="space-y-4">
          <ClimateAnalytics selectedBuildingId={selectedBuildingId} />
        </section>

        {/* Main Grid: Map & Trend Analytics Side-by-Side */}
        <div id="overview" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Map View (Primary Focus) */}
          <section id="buildings" className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Spatial Building View
                </h2>
                {selectedBuilding && (
                  <p className="text-xs font-medium text-cyan-600 mt-0.5">
                    Selected: {selectedBuilding.name}
                  </p>
                )}
              </div>
            </div>
            <div className="h-[520px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {isLoading && (
                <div className="flex h-full items-center justify-center">
                  <div className="text-sm font-medium text-slate-500">
                    Loading building data...
                  </div>
                </div>
              )}

              {isError && (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center px-4">
                    <p className="text-sm font-medium text-rose-600">
                      Unable to load building data
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred.'}
                    </p>
                  </div>
                </div>
              )}

              {data && !isLoading && !isError && (
                <BuildingMap
                  data={data}
                  onBuildingSelect={setSelectedBuildingId}
                />
              )}
            </div>
          </section>

          {/* Climate Trends Chart */}
        <section className="lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-800">
              Climate Trends
            </h2>
          </div>
          <div className="h-[520px] rounded-xl border border-slate-200 bg-white p-5 shadow-sm overflow-y-auto">
            <ClimateTrendChart selectedBuildingId={selectedBuildingId} />
          </div>
        </section>
        </div>

        {/* Secondary Modules: Financial Valuation & Risk Scenarios */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <section id="valuation">
            <h2 className="mb-3 text-lg font-semibold text-slate-800">
              Valuation Engine
            </h2>
            <ValuationPanel building={selectedBuilding} />
          </section>

          <section id="risk">
            <h2 className="mb-3 text-lg font-semibold text-slate-800">
              Scenario Analysis
            </h2>
            <ScenarioAnalysis building={selectedBuilding} />
          </section>
        </div>

        {/* System Health Footer */}
        <section id="health" className="pt-2 border-t border-slate-200">
          <SystemHealth />
        </section>
      </div>
    </AppShell>
  );
}