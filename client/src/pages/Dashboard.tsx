import { MapView } from '../components/map/MapView';

export function Dashboard() {
  return (
    <div className="relative h-full w-full">
      <MapView />

      <div className="absolute left-6 top-6 z-10">
        <div className="rounded-xl border border-white/10 bg-slate-950/90 p-5 shadow-xl backdrop-blur">
          <h1 className="text-xl font-semibold">
            Urban Heat Valuation
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Environmental impact on real estate
          </p>
        </div>
      </div>
    </div>
  );
}