interface Props {
  value: number;
  onChange: (value: number) => void;
}

export function HeatSliderControls({
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">
          Temperature scenario
        </span>

        <span className="font-semibold">
          +{value.toFixed(1)}°C
        </span>
      </div>

      <input
        className="mt-4 w-full"
        type="range"
        min="0"
        max="5"
        step="0.5"
        value={value}
        onChange={(event) =>
          onChange(
            Number(event.target.value),
          )
        }
      />
    </div>
  );
}