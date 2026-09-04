import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useEnvironmentReadings } from '../../hooks/useEnvironment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

export const ClimateTrendChart: React.FC = () => {
  const { data: readings = [], isLoading, isError } =
    useEnvironmentReadings();

  const chartData = useMemo(() => {
    const sortedReadings = [...readings].sort(
      (a, b) =>
        new Date(a.recordedAt).getTime() -
        new Date(b.recordedAt).getTime(),
    );

    return {
      labels: sortedReadings.map((reading) =>
        new Date(reading.recordedAt).toLocaleDateString(),
      ),

      datasets: [
        {
          label: 'Surface Temperature (°C)',
          data: sortedReadings.map(
            (reading) => reading.surfaceTemperature,
          ),
          tension: 0.3,
        },
        {
          label: 'Air Temperature (°C)',
          data: sortedReadings.map(
            (reading) => reading.airTemperature,
          ),
          tension: 0.3,
        },
      ],
    };
  }, [readings]);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-zinc-400">
          Loading climate trends...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-900 bg-red-950/30 p-6">
        <p className="text-sm text-red-400">
          Unable to load climate trends.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">
          Temperature Trend
        </h3>

        <p className="text-sm text-zinc-400">
          Surface temperature vs. air temperature over time
        </p>
      </div>

      <div className="h-[320px]">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
              legend: {
                position: 'top',
              },
            },

            scales: {
              x: {
                ticks: {
                  maxTicksLimit: 8,
                },
              },

              y: {
                title: {
                  display: true,
                  text: 'Temperature (°C)',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ClimateTrendChart;