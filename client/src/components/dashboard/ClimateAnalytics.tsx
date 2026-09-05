import React, { useMemo } from 'react';
import { useBuildings } from '../../hooks/useBuildings';
import { useEnvironmentReadings } from '../../hooks/useEnvironment';

interface ClimateAnalyticsProps {
  selectedBuildingId?: string | null;
}

const average = (values: Array<number | string | null | undefined>) => {
  const validValues = values
    .filter((value) => value !== null && value !== undefined)
    .map(Number)
    .filter(Number.isFinite);

  if (!validValues.length) {
    return null;
  }

  return (
    validValues.reduce((sum, value) => sum + value, 0) / validValues.length
  );
};

export const ClimateAnalytics: React.FC<ClimateAnalyticsProps> = ({
  selectedBuildingId,
}) => {
  const buildingsQuery = useBuildings();
  const environmentQuery = useEnvironmentReadings(
    selectedBuildingId ?? undefined,
  );

  const climateStats = useMemo(() => {
    const buildings = buildingsQuery.data?.data ?? [];
    const readings = environmentQuery.data ?? [];

    if (!readings.length) {
      return {
        avgSurfaceTemp: null,
        avgAirTemp: null,
        avgTemperatureDelta: null,
        avgTreeCanopy: null,
        totalEnergyConsumption: 0,
        hottestBuilding: null,
      };
    }

    const avgSurfaceTemp = average(
      readings.map((reading) => reading.surfaceTemperature),
    );

    const avgAirTemp = average(
      readings.map((reading) => reading.airTemperature),
    );

    const avgTemperatureDelta = average(
      readings.map((reading) => reading.temperatureDelta),
    );

    const avgTreeCanopy = average(
      readings.map((reading) => reading.treeCanopyPercentage),
    );

    const totalEnergyConsumption = readings.reduce(
      (sum, reading) =>
        sum + (Number(reading.energyConsumptionKwh) || 0),
      0,
    );

    const hottestReading = readings.reduce((hottest, reading) => {
      const currentTemp = Number(reading.surfaceTemperature) || 0;
      const maxTemp = Number(hottest.surfaceTemperature) || 0;
      return currentTemp > maxTemp ? reading : hottest;
    }, readings[0]);

    const hottestBuilding =
      buildings.find(
        (building) => building.id === hottestReading?.buildingId,
      ) ?? null;

    return {
      avgSurfaceTemp,
      avgAirTemp,
      avgTemperatureDelta,
      avgTreeCanopy,
      totalEnergyConsumption,
      hottestBuilding,
    };
  }, [buildingsQuery.data, environmentQuery.data]);

  if (buildingsQuery.isLoading || environmentQuery.isLoading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-zinc-400">
          Loading climate analytics...
        </p>
      </div>
    );
  }

  if (buildingsQuery.isError || environmentQuery.isError) {
    return (
      <div className="rounded-xl border border-red-900 bg-red-950/30 p-6">
        <p className="text-sm text-red-400">
          Unable to load climate analytics.
        </p>
      </div>
    );
  }

  const {
    avgSurfaceTemp,
    avgAirTemp,
    avgTemperatureDelta,
    avgTreeCanopy,
    totalEnergyConsumption,
    hottestBuilding,
  } = climateStats;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Climate Analytics
        </h2>

        <p className="text-sm text-zinc-400">
          {selectedBuildingId
            ? 'Environmental conditions for the selected property'
            : 'Environmental conditions across monitored properties'}
        </p>
      </div>

      {!selectedBuildingId && (
        <div className="rounded-lg border border-amber-900/50 bg-amber-950/20 px-4 py-3">
          <p className="text-sm text-amber-400">
            Select a building on the map to view property-specific
            climate analytics.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard
          label="Avg Surface Temp"
          value={
            avgSurfaceTemp !== null
              ? `${avgSurfaceTemp.toFixed(1)}°C`
              : '—'
          }
        />

        <MetricCard
          label="Avg Air Temp"
          value={
            avgAirTemp !== null
              ? `${avgAirTemp.toFixed(1)}°C`
              : '—'
          }
        />

        <MetricCard
          label="Temperature Delta"
          value={
            avgTemperatureDelta !== null
              ? `${avgTemperatureDelta.toFixed(1)}°C`
              : '—'
          }
        />

        <MetricCard
          label="Avg Tree Canopy"
          value={
            avgTreeCanopy !== null
              ? `${avgTreeCanopy.toFixed(1)}%`
              : '—'
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">
            Energy Consumption
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {totalEnergyConsumption.toLocaleString('en-US', {
              maximumFractionDigits: 2,
            })}{' '}
            kWh
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            {selectedBuildingId
              ? 'Across readings for selected building'
              : 'Across all environmental readings'}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm text-zinc-400">
            {selectedBuildingId
              ? 'Selected Building'
              : 'Hottest Building'}
          </p>

          <p className="mt-2 text-xl font-semibold text-white">
            {hottestBuilding?.name ?? 'No data'}
          </p>

          {hottestBuilding && (
            <p className="mt-1 text-sm text-zinc-500">
              Surface temperature:{' '}
              {Number(hottestBuilding.surfaceTemperature).toFixed(1)}°C
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

const MetricCard: React.FC<MetricCardProps> = ({ label, value }) => {
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