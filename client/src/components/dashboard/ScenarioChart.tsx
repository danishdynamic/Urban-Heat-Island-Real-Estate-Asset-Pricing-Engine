import {
  Bar,
} from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
);

interface Scenario {
  name: string;
  estimated_value: number;
}

interface Props {
  scenarios: Scenario[];
}

export function ScenarioChart({
  scenarios,
}: Props) {
  const data = {
    labels: scenarios.map(
      (scenario) => scenario.name,
    ),

    datasets: [
      {
        label: 'Estimated Property Value',
        data: scenarios.map(
          (scenario) =>
            scenario.estimated_value,
        ),
      },
    ],
  };

  return (
    <div className="h-72 rounded-xl border border-white/10 bg-slate-900/90 p-4">
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}