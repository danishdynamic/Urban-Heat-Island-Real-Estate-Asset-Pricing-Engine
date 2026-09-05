import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { useEnvironmentReadings } from '../../hooks/useEnvironment';

interface ClimateTrendChartProps {
  selectedBuildingId?: string | null;
}

export const ClimateTrendChart: React.FC<
  ClimateTrendChartProps
> = ({ selectedBuildingId }) => {
  const {
    data: readings,
    isLoading,
    isError,
  } = useEnvironmentReadings(
    selectedBuildingId ?? undefined,
  );

  const chartData = useMemo(() => {
    if (!selectedBuildingId || !readings?.length) {
      return [];
    }

    return readings.map((reading) => ({
      time: new Date(reading.recordedAt).toLocaleDateString(
        'de-DE',
        {
          month: 'short',
          day: 'numeric',
        },
      ),

      surfaceTemperature:
        reading.surfaceTemperature,

      airTemperature:
        reading.airTemperature,
    }));
  }, [readings, selectedBuildingId]);

  if (!selectedBuildingId) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-slate-700">
            Select a building
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Temperature trends will appear here.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading temperature trends...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <p className="text-sm text-rose-600">
          Unable to load temperature trends.
        </p>
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          No environmental readings available for this building.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Temperature Trend
        </span>

        <h3 className="text-sm font-semibold text-slate-800">
          Selected Building — Surface vs. Air Temperature
        </h3>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="time"
              stroke="#64748b"
              fontSize={11}
            />

            <YAxis
              stroke="#64748b"
              fontSize={11}
              domain={['auto', 'auto']}
              unit="°C"
            />

            <Tooltip
              formatter={(value: number | undefined) =>
                value !== undefined
                  ? `${value.toFixed(1)}°C`
                  : ''
              }
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#cbd5e1',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />

            <Legend
              wrapperStyle={{
                fontSize: '12px',
                paddingTop: '10px',
              }}
            />

            <Line
              type="monotone"
              dataKey="surfaceTemperature"
              name="Surface Temperature"
              stroke="#0891b2"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="airTemperature"
              name="Air Temperature"
              stroke="#64748b"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClimateTrendChart;