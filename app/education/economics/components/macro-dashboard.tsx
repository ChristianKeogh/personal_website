"use client";
import { useState } from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import { ChartKey, Readout, Slider, Toy } from "./controls";
import { colors } from "./market";

interface Year {
  year: number;
  gdp: number;
  inflation: number;
  unemployment: number;
}

/** Made-up but plausible. Not a live series. */
const series: Year[] = [
  { year: 2016, gdp: 1.7, inflation: 0.7, unemployment: 4.9 },
  { year: 2017, gdp: 1.8, inflation: 2.7, unemployment: 4.4 },
  { year: 2018, gdp: 1.4, inflation: 2.5, unemployment: 4.1 },
  { year: 2019, gdp: 1.4, inflation: 1.8, unemployment: 3.8 },
  { year: 2020, gdp: -9.4, inflation: 0.9, unemployment: 4.6 },
  { year: 2021, gdp: 8.1, inflation: 2.6, unemployment: 4.5 },
  { year: 2022, gdp: 4.3, inflation: 9.1, unemployment: 3.7 },
  { year: 2023, gdp: 0.3, inflation: 6.8, unemployment: 4.0 },
  { year: 2024, gdp: 1.1, inflation: 2.5, unemployment: 4.2 },
  { year: 2025, gdp: 1.4, inflation: 2.6, unemployment: 4.4 }
];

const FIRST = series[0].year;
const LAST = series[series.length - 1].year;
const axisStyle = { fill: colors.label, fontSize: 11 };

function pct(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

function Card({
  label,
  value,
  hint
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border border-neutral-800 rounded-lg p-3 flex flex-col gap-1">
      <span className="text-xs uppercase tracking-widest text-neutral-500">
        {label}
      </span>
      <span className="text-xl tabular-nums text-neutral-100">{value}</span>
      <span className="text-xs text-neutral-500">{hint}</span>
    </div>
  );
}

export default function MacroDashboard() {
  const [year, setYear] = useState(2022);
  const point = series.find((item) => item.year === year) ?? series[0];

  const status = `In ${year}, output grew ${pct(point.gdp)}, prices rose ${pct(point.inflation)}, and ${point.unemployment.toFixed(1)}% of people who wanted work did not have it.`;

  return (
    <Toy note="Illustrative series. No live data.">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Card
          label="GDP"
          value={pct(point.gdp)}
          hint="Flow of production this year"
        />
        <Card
          label="Inflation"
          value={pct(point.inflation)}
          hint="Rise in the price level"
        />
        <Card
          label="Unemployment"
          value={`${point.unemployment.toFixed(1)}%`}
          hint="Want work, do not have it"
        />
      </div>
      <div
        role="img"
        aria-label={status}
        className="h-56 sm:h-72 -ml-2 sm:ml-0"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={series}
            margin={{ top: 8, right: 12, bottom: 20, left: 0 }}
            accessibilityLayer={false}
          >
            <CartesianGrid stroke={colors.grid} />
            <XAxis
              dataKey="year"
              type="number"
              domain={[FIRST, LAST]}
              ticks={series.map((item) => item.year)}
              interval="equidistantPreserveStart"
              minTickGap={12}
              stroke={colors.axis}
              tick={axisStyle}
            >
              <Label
                value="Year"
                position="insideBottom"
                offset={-14}
                style={axisStyle}
              />
            </XAxis>
            <YAxis
              type="number"
              domain={[-12, 12]}
              tickCount={7}
              stroke={colors.axis}
              tick={axisStyle}
              width={34}
              tickFormatter={(value: number) => `${value}`}
            >
              <Label
                value="%"
                angle={-90}
                position="insideLeft"
                offset={14}
                style={axisStyle}
              />
            </YAxis>
            <ReferenceLine y={0} stroke={colors.axis} />
            <ReferenceLine x={year} stroke={colors.mark} strokeDasharray="3 3" />
            <Line
              dataKey="gdp"
              stroke={colors.demand}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              dataKey="inflation"
              stroke={colors.supply}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              dataKey="unemployment"
              stroke={colors.social}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <ChartKey
        items={[
          { label: "GDP growth", color: colors.demand },
          { label: "Inflation", color: colors.supply },
          { label: "Unemployment", color: colors.social }
        ]}
      />
      <Readout>{status}</Readout>
      <Slider
        label="Year"
        readout={String(year)}
        value={year}
        min={FIRST}
        max={LAST}
        onChange={setYear}
      />
    </Toy>
  );
}
