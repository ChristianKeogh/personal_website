"use client";

interface SliderProps {
  label: string;
  readout: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  accent?: string;
  onChange: (value: number) => void;
}

export function Slider({
  label,
  readout,
  value,
  min,
  max,
  step = 1,
  accent = "#fafafa",
  onChange
}: SliderProps) {
  return (
    <label className="flex flex-col">
      <span className="flex justify-between items-baseline gap-4 text-sm">
        <span className="text-neutral-300">{label}</span>
        <span className="text-neutral-400 tabular-nums">{readout}</span>
      </span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ accentColor: accent }}
        className="w-full h-11 cursor-pointer"
      />
    </label>
  );
}

interface ChartKeyProps {
  items: { label: string; color: string; dashed?: boolean }[];
}

export function ChartKey({ items }: ChartKeyProps) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span
            aria-hidden
            className="w-4 border-t-2"
            style={{
              borderColor: item.color,
              borderTopStyle: item.dashed ? "dashed" : "solid"
            }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function Readout({ children }: { children: React.ReactNode }) {
  return (
    <p aria-live="polite" className="text-sm text-neutral-200 min-h-10">
      {children}
    </p>
  );
}

interface ToyProps {
  children: React.ReactNode;
  note?: string;
}

export function Toy({ children, note }: ToyProps) {
  return (
    <div className="mt-8 border border-neutral-800 rounded-lg p-4 flex flex-col gap-4">
      {children}
      {note && <p className="text-xs text-neutral-500">{note}</p>}
    </div>
  );
}
