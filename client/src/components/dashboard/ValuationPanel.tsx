import React, { useEffect, useState } from 'react';

import { useEnvironmentReadings } from '../../hooks/useEnvironment';
import { useValuation } from '../../hooks/useValuation';
import type { Building } from '../../types/building';

interface ValuationPanelProps {
  building: Building | null;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

export const ValuationPanel: React.FC<ValuationPanelProps> = ({ building }) => {
  const valuation = useValuation();
  const environmentQuery = useEnvironmentReadings(building?.id);

  const [discountRate, setDiscountRate] = useState(0.08);
  const [years, setYears] = useState(10);
  const [hvacCostIncrease, setHvacCostIncrease] = useState(0);

  useEffect(() => {
    valuation.reset();
  }, [building?.id]);

  // Calculate average temperature delta from environmental readings
  const temperatureDelta =
    environmentQuery.data
      ?.map((reading) => reading.temperatureDelta)
      .filter((value): value is number => value !== null)
      .reduce(
        (sum, value, _, values) => sum + value / values.length,
        0,
      ) ?? null;

  if (!building) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold text-white">Valuation</h2>

        <p className="mt-2 text-sm text-zinc-400">
          Select a building to calculate its climate-adjusted valuation.
        </p>
      </section>
    );
  }

  const handleCalculate = () => {
    valuation.mutate({
      buildingId: building.id,
      annualRent: building.annualRent,
      operatingExpenses: building.operatingExpenses,
      vacancyRate: building.vacancyRate,
      discountRate,
      years,
      temperatureDelta: temperatureDelta ?? 0,
      hvacCostIncrease,
    });
  };

  const result = valuation.data;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white">Valuation</h2>

        <p className="text-sm text-zinc-400">
          Climate-adjusted real estate valuation
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Selected Property
          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">
            {building.name}
          </h3>

          <p className="text-sm text-zinc-400">{building.externalId}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InputField
            label="Discount Rate"
            type="number"
            step="0.01"
            value={discountRate}
            onChange={(value) => setDiscountRate(Number(value))}
          />

          <InputField
            label="Projection Years"
            type="number"
            min="1"
            max="50"
            value={years}
            onChange={(value) => setYears(Number(value))}
          />

          <InputField
            label="HVAC Cost Increase"
            type="number"
            min="0"
            value={hvacCostIncrease}
            onChange={(value) => setHvacCostIncrease(Number(value))}
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <PropertyMetric
            label="Annual Rent"
            value={formatCurrency(building.annualRent)}
          />

          <PropertyMetric
            label="Operating Expenses"
            value={formatCurrency(building.operatingExpenses)}
          />

          <PropertyMetric
            label="Vacancy Rate"
            value={`${(building.vacancyRate * 100).toFixed(1)}%`}
          />

          <PropertyMetric
            label="Temperature Delta"
            value={
              temperatureDelta !== null
                ? `${temperatureDelta.toFixed(1)}°C`
                : 'No data'
            }
          />
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          disabled={valuation.isPending}
          className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {valuation.isPending ? 'Calculating...' : 'Calculate Valuation'}
        </button>

        {valuation.isError && (
          <p className="mt-4 text-sm text-red-400">
            Unable to calculate valuation. Check that the Quant service is
            running.
          </p>
        )}
      </div>

      {result && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <ResultCard
            label="Estimated Value"
            value={formatCurrency(result.estimated_value)}
            emphasis
          />

          <ResultCard label="NOI" value={formatCurrency(result.noi)} />

          <ResultCard
            label="Adjusted NOI"
            value={formatCurrency(result.adjusted_noi)}
          />

          <ResultCard
            label="Cap Rate"
            value={`${(result.cap_rate * 100).toFixed(2)}%`}
          />
        </div>
      )}
    </section>
  );
};

interface InputFieldProps {
  label: string;
  type: string;
  value: number;
  onChange: (value: string) => void;
  step?: string;
  min?: string;
  max?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  step,
  min,
  max,
}) => (
  <label className="block">
    <span className="mb-2 block text-sm text-zinc-400">{label}</span>

    <input
      type={type}
      step={step}
      min={min}
      max={max}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-white outline-none focus:border-zinc-400"
    />
  </label>
);

interface PropertyMetricProps {
  label: string;
  value: string;
}

const PropertyMetric: React.FC<PropertyMetricProps> = ({ label, value }) => (
  <div className="rounded-lg bg-zinc-950 p-3">
    <p className="text-xs text-zinc-500">{label}</p>
    <p className="mt-1 text-sm font-medium text-white">{value}</p>
  </div>
);

interface ResultCardProps {
  label: string;
  value: string;
  emphasis?: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({
  label,
  value,
  emphasis = false,
}) => (
  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
    <p className="text-sm text-zinc-400">{label}</p>

    <p
      className={`mt-2 text-2xl font-semibold ${
        emphasis ? 'text-white' : 'text-zinc-200'
      }`}
    >
      {value}
    </p>
  </div>
);

export default ValuationPanel;