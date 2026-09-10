"use client";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import {
  colors,
  demandPrice,
  equilibrium,
  marketPoints,
  P_MAX,
  Q_MAX,
  quantityDemanded,
  quantitySupplied
} from "./market";

interface SupplyDemandChartProps {
  demandShift: number;
  supplyShift: number;
  /** Draws a price held away from equilibrium, e.g. a cap or a floor. */
  controlPrice?: number;
  /** Adds a social cost curve sitting this far above private supply. */
  externalCost?: number;
  /** Text equivalent of the chart, read instead of the drawing. */
  description: string;
}

const axisStyle = { fill: colors.label, fontSize: 11 };

export default function SupplyDemandChart({
  demandShift,
  supplyShift,
  controlPrice,
  externalCost = 0,
  description
}: SupplyDemandChartProps) {
  const market = equilibrium(demandShift, supplyShift);
  const efficient = {
    quantity: market.quantity - externalCost,
    price: demandPrice(market.quantity - externalCost, demandShift)
  };

  return (
    <div
      role="img"
      aria-label={description}
      className="h-64 sm:h-80 -ml-2 sm:ml-0"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={marketPoints({ demandShift, supplyShift, externalCost })}
          margin={{ top: 8, right: 12, bottom: 20, left: 0 }}
          accessibilityLayer={false}
        >
          <CartesianGrid stroke={colors.grid} />
          <XAxis
            dataKey="quantity"
            type="number"
            domain={[0, Q_MAX]}
            tickCount={7}
            stroke={colors.axis}
            tick={axisStyle}
          >
            <Label
              value="Quantity"
              position="insideBottom"
              offset={-14}
              style={axisStyle}
            />
          </XAxis>
          <YAxis
            type="number"
            domain={[0, P_MAX]}
            tickCount={8}
            stroke={colors.axis}
            tick={axisStyle}
            width={34}
          >
            <Label
              value="Price (£)"
              angle={-90}
              position="insideLeft"
              offset={14}
              style={axisStyle}
            />
          </YAxis>
          <Line
            dataKey="demand"
            stroke={colors.demand}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            dataKey="supply"
            stroke={colors.supply}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          {externalCost > 0 && (
            <Line
              dataKey="social"
              stroke={colors.social}
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
              isAnimationActive={false}
            />
          )}
          {controlPrice === undefined && (
            <ReferenceDot
              x={market.quantity}
              y={market.price}
              r={5}
              fill={colors.mark}
              stroke="#000"
            />
          )}
          {controlPrice !== undefined && (
            <>
              <ReferenceLine
                y={controlPrice}
                stroke={colors.mark}
                strokeDasharray="3 3"
              />
              <ReferenceLine
                segment={[
                  {
                    x: quantityDemanded(controlPrice, demandShift),
                    y: controlPrice
                  },
                  {
                    x: quantitySupplied(controlPrice, supplyShift),
                    y: controlPrice
                  }
                ]}
                stroke={colors.mark}
                strokeWidth={6}
                strokeOpacity={0.35}
              />
            </>
          )}
          {externalCost > 0 && (
            <ReferenceDot
              x={efficient.quantity}
              y={efficient.price}
              r={5}
              fill={colors.social}
              stroke="#000"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
