import {
  useMapStore,
} from '../../stores/mapStore';

import {
  useBuildings,
} from '../../hooks/useBuildings';

import {
  MetricCard,
} from '../ui/MetricCard';

export function BuildingDetailPanel() {
  const selectedBuildingId =
    useMapStore(
      (state) =>
        state.selectedBuildingId,
    );

  const {
    data,
  } = useBuildings();

  const building =
    data?.data.find(
      (item) =>
        item.id === selectedBuildingId,
    );

  if (!building) {
    return null;
  }

  return (
    <div className="absolute right-6 top-6 z-20 w-96 space-y-3">
      <div className="rounded-xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl backdrop-blur">
        <h2 className="text-lg font-semibold">
          {building.name}
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          {building.address}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Surface"
          value={`${building.surfaceTemperature}°C`}
        />

        <MetricCard
          label="Canopy"
          value={`${building.treeCanopyPercentage}%`}
        />

        <MetricCard
          label="HVAC"
          value={`$${building.annualHvacCost.toLocaleString()}`}
        />

        <MetricCard
          label="Yield"
          value={`${(
            building.rentalYield * 100
          ).toFixed(2)}%`}
        />
      </div>
    </div>
  );
}