import React, { useState } from 'react';

import { useEnvironmentReadings } from '../../hooks/useEnvironment';
import { useScenarioAnalysis } from '../../hooks/useValuation';
import type { Building } from '../../types/building';
import type { ScenarioResult } from '../../types/valuation';

interface ScenarioAnalysisProps {
  building: Building | null;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value: number) => `${(value * 100).toFixed(2)}%`;

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

      {scenarioMutation.data?.scenarios && (
        <>
          {/* Financial Impact Summary Cards */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Baseline Value</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {formatCurrency(
                  scenarioMutation.data.scenarios[0]?.estimated_value ?? 0,
                )}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Severe Heat Value</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {formatCurrency(
                  scenarioMutation.data.scenarios[
                    scenarioMutation.data.scenarios.length - 1
                  ]?.estimated_value ?? 0,
                )}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
              <p className="text-sm text-zinc-400">Climate Value at Risk</p>
              <p className="mt-1 text-2xl font-semibold text-red-400">
                {formatCurrency(
                  scenarioMutation.data.scenarios[
                    scenarioMutation.data.scenarios.length - 1
                  ]?.value_at_risk ?? 0,
                )}
              </p>
            </div>
          </div>

          {/* Detailed Valuation Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm text-zinc-300">
              <thead>
                <tr className="border-b border-zinc-800 text-left text-zinc-400">
                  <th className="px-4 py-3">Scenario</th>
                  <th className="px-4 py-3">Temp Δ</th>
                  <th className="px-4 py-3">Additional HVAC</th>
                  <th className="px-4 py-3">Adjusted NOI</th>
                  <th className="px-4 py-3">Property Value</th>
                  <th className="px-4 py-3">Value at Risk</th>
                </tr>
              </thead>

              <tbody>
                {scenarioMutation.data.scenarios.map(
                  (scenario: ScenarioResult) => (
                    <tr
                      key={scenario.name}
                      className="border-b border-zinc-800/60 hover:bg-zinc-950/50"
                    >
                      <td className="px-4 py-3 font-medium text-white">
                        {scenario.name}
                      </td>

                      <td className="px-4 py-3 text-cyan-400">
                        +{scenario.temperature_delta.toFixed(1)}°C
                      </td>

                      <td className="px-4 py-3">
                        {formatCurrency(scenario.additional_hvac_cost)}
                      </td>

                      <td className="px-4 py-3">
                        {formatCurrency(scenario.adjusted_noi)}
                      </td>

                      <td className="px-4 py-3 font-semibold text-white">
                        {formatCurrency(scenario.estimated_value)}
                      </td>

                      <td className="px-4 py-3 text-red-400">
                        {formatCurrency(scenario.value_at_risk)}
                        <span className="ml-2 text-xs text-zinc-500">
                          ({formatPercent(scenario.value_at_risk_percentage)})
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ScenarioAnalysis;