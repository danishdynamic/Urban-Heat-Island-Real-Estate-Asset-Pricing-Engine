interface MetricCardProps {
  label: string;
  value: string;
  description?: string;
}

export function MetricCard({
  label,
  value,
  description,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4">
      <p className="text-xs uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}