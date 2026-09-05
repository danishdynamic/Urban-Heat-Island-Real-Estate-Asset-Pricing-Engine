import React, { useState } from 'react';

import { useEnvironmentReadings } from '../../hooks/useEnvironment';
import { useScenarioAnalysis } from '../../hooks/useValuation';
import type { Building } from '../../types/building';

interface ScenarioAnalysisProps {
  building: Building | null;
}

interface ScenarioItem {
  name: string;
  temperature_delta: number;
  estimated_value?: number;
  adjusted_noi?: number;
  cap_rate?: number;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const ScenarioAnalysis: React.FC<ScenarioAnalysisProps> = ({
  building,
}) => {
  const scenarioMutation = useScenarioAnalysis();
  const environmentQuery = useEnvironmentReadings(building?.id);

  const [discountRate, setDiscountRate] = useState(0.08);
  const [years, setYears] = useState(10);

  // Compute average baseline temperature delta from readings
  const baselineDelta =
    environmentQuery.data
      ?.map((reading) => reading.temperatureDelta)
      .filter((value): value is number => value !== null)
      .reduce((sum, value, _, values) => sum + value / values.length, 0) ?? 0;

  if (!building) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold text-white">Scenario Analysis</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Select a building to run climate risk scenarios.
        </p>
      </section>
    );
  }

  const effectiveGrossIncome =
    building.annualRent * (1 - building.vacancyRate);
  const baseNoi = effectiveGrossIncome - building.operatingExpenses;

  const scenarios = [
    {
      name: 'Baseline',
      temperatureDelta: Number(baselineDelta.toFixed(1)),
    },
    {
      name: 'Moderate Heat',
      temperatureDelta: Number((baselineDelta + 2).toFixed(1)),
    },
    {
      name: 'Severe Heat',
      temperatureDelta: Number((baselineDelta + 4).toFixed(1)),
    },
  ];

  const handleRunAnalysis = () => {
    scenarioMutation.mutate({
      buildingId: building.id,
      baseNoi,
      baseHvacCost: 0,
      discountRate,
      years,
      scenarios,
    });
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
          Climate Risk
        </p>

        <h3 className="mt-1 text-lg font-semibold text-white">
          {building.name}
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          Stress-test property value under different temperature scenarios.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-zinc-400">
            Discount Rate
          </span>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            value={discountRate}
            onChange={(event) => setDiscountRate(Number(event.target.value))}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-zinc-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-zinc-400">
            Projection Years
          </span>
          <input
            type="number"
            min="1"
            max="50"
            value={years}
            onChange={(event) => setYears(Number(event.target.value))}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-zinc-400"
          />
        </label>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {scenarios.map((scenario) => (
          <div
            key={scenario.name}
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4"
          >
            <p className="text-sm font-semibold text-white">{scenario.name}</p>

            <p className="mt-1 text-xs text-zinc-400">Temperature impact</p>

            <p className="mt-2 text-lg font-semibold text-cyan-400">
              +{scenario.temperatureDelta}°C
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleRunAnalysis}
        disabled={scenarioMutation.isPending}
        className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {scenarioMutation.isPending
          ? 'Running Analysis...'
          : 'Run Scenario Analysis'}
      </button>

      {scenarioMutation.isError && (
        <p className="mt-4 text-sm text-red-400">
          Unable to run scenario analysis. Check that the Quant service is
          running.
        </p>
      )}

      {scenarioMutation.data && (
        <ScenarioResults rawData={scenarioMutation.data} />
      )}
    </div>
  );
};

interface ScenarioResultsProps {
  rawData: unknown;
}

const ScenarioResults: React.FC<ScenarioResultsProps> = ({ rawData }) => {
  // Extract scenarios array regardless of response envelope wrapper
  const items: ScenarioItem[] = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as { data?: unknown })?.data)
    ? (rawData as { data: ScenarioItem[] }).data
    : Array.isArray((rawData as { scenarios?: unknown })?.scenarios)
    ? (rawData as { scenarios: ScenarioItem[] }).scenarios
    : [];

  if (!items.length) {
    return (
      <div className="mt-6 rounded-lg bg-zinc-950 p-4 text-sm text-zinc-400">
        No scenario items found in response payload.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <h4 className="text-sm font-semibold text-zinc-200">
        Scenario Valuation Results
      </h4>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((scenario, index) => (
          <div
            key={`${scenario.name}-${index}`}
            className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-4 space-y-4"
          >
            <div>
              <p className="text-sm font-medium text-zinc-300">
                {scenario.name ?? `Scenario ${index + 1}`}
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                {typeof scenario.estimated_value === 'number'
                  ? formatCurrency(scenario.estimated_value)
                  : '—'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-zinc-800/60 pt-3 text-xs">
              <div>
                <span className="text-zinc-500 block">Adjusted NOI</span>
                <span className="font-semibold text-zinc-300">
                  {typeof scenario.adjusted_noi === 'number'
                    ? formatCurrency(scenario.adjusted_noi)
                    : '—'}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">Cap Rate</span>
                <span className="font-semibold text-zinc-300">
                  {typeof scenario.cap_rate === 'number'
                    ? formatPercent(scenario.cap_rate)
                    : '—'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScenarioAnalysis;