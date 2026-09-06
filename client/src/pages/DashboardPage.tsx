import { useState } from 'react';
import AppShell from '../components/layout/AppShell';
import BuildingMap from '../components/map/BuildingMap';
import ClimateAnalytics from '../components/dashboard/ClimateAnalytics';
import ClimateTrendChart from '../components/dashboard/ClimateTrendChart';
import SystemHealth from '../components/health/SystemHealth';
import ValuationPanel from '../components/dashboard/ValuationPanel';
import ScenarioAnalysis from '../components/dashboard/ScenarioAnalysis';
import { ClimateFinancialImpact } from '../components/dashboard/ClimateFinancialImpact';
import { useBuildingData } from '../hooks/useBuildingData';
import { useBuildings } from '../hooks/useBuildings';
import { useScenarioAnalysis } from '../hooks/useValuation';
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
  const scenarioMutation = useScenarioAnalysis();

  const selectedBuilding: Building | null =
    buildingsQuery.data?.data.find(
      (building) => building.id === selectedBuildingId,
    ) ?? null;

  return (
    <AppShell>
      <div className="min-h-screen space-y-8 bg-slate-50 p-6 text-slate-900">
        {/* Header Banner */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-600">
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

        {/* 1. KPI Cards */}
        <section id="climate" className="space-y-4">
          <ClimateAnalytics selectedBuildingId={selectedBuildingId} />
        </section>

        {/* 2. 3D Map & 3. Climate Analytics (Trends) */}
        <div id="overview" className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Spatial Building Map */}
          <section id="buildings" className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Spatial Building View
                </h2>
                {selectedBuilding && (
                  <p className="mt-0.5 text-xs font-medium text-cyan-600">
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
                  <div className="px-4 text-center">
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
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Climate Trends
              </h2>
            </div>
            <div className="h-[520px] overflow-y-auto rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <ClimateTrendChart selectedBuildingId={selectedBuildingId} />
            </div>
          </section>
        </div>

        {/* 4. Financial Impact, Valuation & Risk Scenarios */}
        <div className="space-y-6">
          <section id="financial-impact">
            <ClimateFinancialImpact
              scenarios={scenarioMutation.data?.scenarios ?? []}
            />
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
        </div>

        {/* System Health Footer */}
        <section id="health" className="border-t border-slate-200 pt-2">
          <SystemHealth />
        </section>
      </div>
    </AppShell>
  );
}