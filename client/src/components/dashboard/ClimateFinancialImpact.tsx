import type { ScenarioResult } from '../../types/valuation';

interface ClimateFinancialImpactProps {
  scenarios: ScenarioResult[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

const formatPercent = (value: number) =>
  `${(value * 100).toFixed(2)}%`;

export function ClimateFinancialImpact({
  scenarios,
}: ClimateFinancialImpactProps) {
  if (!scenarios.length) {
    return null;
  }

  const baseline = scenarios[0];

  const worstCase =
    scenarios.reduce((worst, scenario) =>
      scenario.estimated_value < worst.estimated_value
        ? scenario
        : worst,
    );

  const valueAtRisk = Math.max(
    baseline.estimated_value -
      worstCase.estimated_value,
    0,
  );

  const valueAtRiskPercentage =
    baseline.estimated_value > 0
      ? valueAtRisk / baseline.estimated_value
      : 0;

  return (
    <section
      id="climate-financial-impact"
      className="space-y-6"
    >
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Climate Finance
        </p>

        <h2 className="text-2xl font-semibold">
          Climate Financial Impact
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Estimated financial impact of climate
          scenarios on property operating performance
          and value.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Baseline Property Value
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {formatCurrency(
              baseline.estimated_value,
            )}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Worst-Case Value
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {formatCurrency(
              worstCase.estimated_value,
            )}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {worstCase.name}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Climate Value at Risk
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {formatCurrency(valueAtRisk)}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {formatPercent(valueAtRiskPercentage)}
            {' '}of baseline value
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Additional HVAC Cost
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {formatCurrency(
              worstCase.additional_hvac_cost,
            )}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {worstCase.name}
          </p>
        </div>
      </div>

      {/* Financial chain */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">
          Climate-to-Value Impact
        </h3>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <ImpactMetric
            label="Temperature"
            value={`+${worstCase.temperature_delta.toFixed(1)}°C`}
          />

          <ImpactMetric
            label="Additional HVAC"
            value={formatCurrency(
              worstCase.additional_hvac_cost,
            )}
          />

          <ImpactMetric
            label="Adjusted NOI"
            value={formatCurrency(
              worstCase.adjusted_noi,
            )}
          />

          <ImpactMetric
            label="Property Value"
            value={formatCurrency(
              worstCase.estimated_value,
            )}
          />
        </div>
      </div>

      {/* Scenario comparison */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">
          Scenario Value Comparison
        </h3>

        <div className="mt-5 space-y-4">
          {scenarios.map((scenario) => {
            const valueLoss =
              Math.max(
                baseline.estimated_value -
                  scenario.estimated_value,
                0,
              );

            const lossPercentage =
              baseline.estimated_value > 0
                ? valueLoss /
                  baseline.estimated_value
                : 0;

            return (
              <div
                key={scenario.name}
                className="grid gap-2 md:grid-cols-[180px_1fr_140px_120px]"
              >
                <div>
                  <p className="font-medium">
                    {scenario.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    +{scenario.temperature_delta.toFixed(1)}°C
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="h-3 w-full rounded-full bg-gray-100">
                    <div
                      className="h-3 rounded-full bg-gray-700"
                      style={{
                        width: `${Math.max(
                          0,
                          Math.min(
                            100,
                            (scenario.estimated_value /
                              baseline.estimated_value) *
                              100,
                          ),
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <p className="text-right font-medium">
                  {formatCurrency(
                    scenario.estimated_value,
                  )}
                </p>

                <p className="text-right text-sm text-gray-500">
                  {lossPercentage > 0
                    ? `-${formatPercent(lossPercentage)}`
                    : 'Baseline'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface ImpactMetricProps {
  label: string;
  value: string;
}

function ImpactMetric({
  label,
  value,
}: ImpactMetricProps) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-semibold">
        {value}
      </p>
    </div>
  );
}