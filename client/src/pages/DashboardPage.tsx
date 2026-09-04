import AppShell from '../components/layout/AppShell';
import BuildingMap from '../components/map/BuildingMap';
import ClimateAnalytics from '../components/dashboard/ClimateAnalytics';
import ClimateTrendChart from '../components/dashboard/ClimateTrendChart';
import SystemHealth from '../components/health/SystemHealth';
import { useBuildingData } from '../hooks/useBuildingData';

export default function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useBuildingData();

  return (
    <AppShell>
      <div className="space-y-6 bg-slate-50 min-h-screen p-6 text-slate-900">
        <div>
          <p className="text-sm font-semibold tracking-wide text-cyan-600 uppercase">
            Urban Analytics
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Environmental and financial intelligence for urban real estate assets.
          </p>
        </div>

        <div id="overview">
          <section id="buildings">
            <h2 className="mb-4 text-xl font-semibold text-slate-800">
              Buildings
            </h2>

            <div className="h-150 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {isLoading && (
                <div className="flex h-full items-center justify-center">
                  <div className="text-sm font-medium text-slate-500">
                    Loading building data...
                  </div>
                </div>
              )}

              {isError && (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm font-medium text-rose-600">
                      Unable to load building data
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      {error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred.'}
                    </p>
                  </div>
                </div>
              )}

              {data && !isLoading && !isError && (
                <BuildingMap data={data} />
              )}
            </div>
          </section>
        </div>

        <section id="climate">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Climate Analytics
          </h2>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <ClimateAnalytics />
            <ClimateTrendChart />
          </div>
        </section>

        <section id="valuation">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Valuation
          </h2>

          <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
            DCF and property valuation will appear here.
          </div>
        </section>

        <section id="risk">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            Scenario Analysis
          </h2>

          <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
            Climate risk scenarios will appear here.
          </div>
        </section>

        <section id="health">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">
            System Health
          </h2>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <SystemHealth />
          </div>
        </section>
      </div>
    </AppShell>
  );
}