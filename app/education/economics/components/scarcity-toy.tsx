"use client";
import { useState } from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import { Readout, Slider, Toy } from "./controls";
import { colors } from "./market";

const MAX_HOURS = 20;
const MAX_EARNINGS = 400;

/** Quarter ellipse: the first hours off are cheap, the last ones are dear. */
function earnings(freeHours: number) {
  return MAX_EARNINGS * Math.sqrt(1 - (freeHours / MAX_HOURS) ** 2);
}

const points = Array.from({ length: MAX_HOURS + 1 }, (_, freeHours) => ({
  freeHours,
  earnings: Math.round(earnings(freeHours))
}));

const axisStyle = { fill: colors.label, fontSize: 11 };

export default function ScarcityToy() {
  const [freeHours, setFreeHours] = useState(8);

  const kept = Math.round(earnings(freeHours));
  const nextHour =
    freeHours < MAX_HOURS ? kept - Math.round(earnings(freeHours + 1)) : null;

  const status =
    nextHour === null
      ? `All ${MAX_HOURS} hours are yours and you earn nothing. There is nothing left to trade away.`
      : `${freeHours} free hours and £${kept} earned. The next free hour costs £${nextHour} of earnings.`;

  return (
    <Toy note="Made-up numbers for one week.">
      <div
        role="img"
        aria-label={`A curve of earnings against free hours. ${status}`}
        className="h-56 sm:h-72 -ml-2 sm:ml-0"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={points}
            margin={{ top: 8, right: 12, bottom: 20, left: 0 }}
            accessibilityLayer={false}
          >
            <CartesianGrid stroke={colors.grid} />
            <XAxis
              dataKey="freeHours"
              type="number"
              domain={[0, MAX_HOURS]}
              tickCount={6}
              stroke={colors.axis}
              tick={axisStyle}
            >
              <Label
                value="Free hours"
                position="insideBottom"
                offset={-14}
                style={axisStyle}
              />
            </XAxis>
            <YAxis
              type="number"
              domain={[0, MAX_EARNINGS]}
              tickCount={5}
              stroke={colors.axis}
              tick={axisStyle}
              width={40}
            >
              <Label
                value="Earned (£)"
                angle={-90}
                position="insideLeft"
                offset={12}
                style={axisStyle}
              />
            </YAxis>
            <Line
              dataKey="earnings"
              stroke={colors.demand}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <ReferenceDot
              x={freeHours}
              y={kept}
              r={5}
              fill={colors.mark}
              stroke="#000"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Readout>{status}</Readout>
      <Slider
        label="Free time this week"
        readout={`${freeHours} h`}
        value={freeHours}
        min={0}
        max={MAX_HOURS}
        accent={colors.demand}
        onChange={setFreeHours}
      />
    </Toy>
  );
}
