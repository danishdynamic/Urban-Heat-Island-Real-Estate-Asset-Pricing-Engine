import React, { useMemo } from 'react';
import { useBuildings } from '../../hooks/useBuildings';
import { useEnvironmentReadings } from '../../hooks/useEnvironment';

export const ClimateAnalytics: React.FC = () => {
  const buildingsQuery = useBuildings();
  const environmentQuery = useEnvironmentReadings();

  const climateStats = useMemo(() => {
    const buildings = buildingsQuery.data?.data ?? [];
    const readings = environmentQuery.data ?? [];

    if (!readings.length) {
      return {
        avgSurfaceTemperature: 0,
        avgAirTemperature: 0,
        avgTemperatureDelta: 0,
        avgCanopy: 0,
        totalEnergyConsumption: 0,
        hottestBuilding: null,
      };
    }

    const avg = (values: number[]) =>
      values.length
        ? values.reduce((sum, value) => sum + value, 0) /
          values.length
        : 0;

    const surfaceTemperatures = readings.map(
      (reading) => reading.surfaceTemperature,
    );

    const airTemperatures = readings
      .map((reading) => reading.airTemperature)
      .filter((value): value is number => value !== null);

    const temperatureDeltas = readings
      .map((reading) => reading.temperatureDelta)
      .filter((value): value is number => value !== null);

    const canopyValues = readings
      .map((reading) => reading.treeCanopyPercentage)
      .filter((value): value is number => value !== null);

    const totalEnergyConsumption = readings.reduce(
      (sum, reading) =>
        sum + (reading.energyConsumptionKwh ?? 0),
      0,
    );

    const hottestReading = readings.reduce(
      (hottest, reading) =>
        reading.surfaceTemperature >
        hottest.surfaceTemperature
          ? reading
          : hottest,
      readings[0],
    );

    const hottestBuilding =
      buildings.find(
        (building) =>
          building.id === hottestReading.buildingId,
      ) ?? null;

    return {
      avgSurfaceTemperature: avg(surfaceTemperatures),
      avgAirTemperature: avg(airTemperatures),
      avgTemperatureDelta: avg(temperatureDeltas),
      avgCanopy: avg(canopyValues),
      totalEnergyConsumption,
      hottestBuilding,
    };
  }, [buildingsQuery.data, environmentQuery.data]);

  if (
    buildingsQuery.isLoading ||
    environmentQuery.isLoading
  ) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-zinc-400">
          Loading climate analytics...
        </p>
      </div>
    );
  }

  if (
    buildingsQuery.isError ||
    environmentQuery.isError
  ) {
    return (
      <div className="rounded-xl border border-red-900 bg-red-950/30 p-6">
        <p className="text-sm text-red-400">
          Unable to load climate analytics.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Climate Analytics
        </h2>

        <p className="text-sm text-zinc-400">
          Environmental conditions across monitored properties
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard
          label="Avg Surface Temp"
          value={`${climateStats.avgSurfaceTemperature.toFixed(1)}°C`}
        />

        <MetricCard
          label="Avg Air Temp"
          value={`${climateStats.avgAirTemperature.toFixed(1)}°C`}
        />

        <MetricCard
          label="Temperature Delta"
          value={`${climateStats.avgTemperatureDelta.toFixed(1)}°C`}
        />

        <MetricCard
          label="Avg Tree Canopy"
          value={`${climateStats.avgCanopy.toFixed(1)}%`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">
            Total Energy Consumption
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {climateStats.totalEnergyConsumption.toLocaleString()} kWh
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Across all environmental readings
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">
            Hottest Building
          </p>

          <p className="mt-2 text-xl font-semibold text-white">
            {climateStats.hottestBuilding?.name ??
              'No data'}
          </p>

          {climateStats.hottestBuilding && (
            <p className="mt-1 text-sm text-zinc-500">
              Surface temperature:{' '}
              {climateStats.hottestBuilding.surfaceTemperature}°C
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="text-sm text-zinc-400">{label}</p>

      <p className="mt-2 text-2xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
};

export default ClimateAnalytics;