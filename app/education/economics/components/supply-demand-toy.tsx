"use client";
import { useState } from "react";
import { ChartKey, Readout, Slider, Toy } from "./controls";
import {
  colors,
  equilibrium,
  money,
  quantityDemanded,
  quantitySupplied,
  units
} from "./market";
import SupplyDemandChart from "./supply-demand-chart";

function shiftLabel(shift: number) {
  if (shift === 0) return "unchanged";
  return `${Math.abs(shift)} ${shift > 0 ? "right" : "left"}`;
}

export default function SupplyDemandToy() {
  const [demandShift, setDemandShift] = useState(0);
  const [supplyShift, setSupplyShift] = useState(0);
  const [heldPrice, setHeldPrice] = useState<number>();

  const market = equilibrium(demandShift, supplyShift);

  let status: string;
  if (heldPrice === undefined) {
    status = `Clears at ${money(market.price)}, ${units(market.quantity)}.`;
  } else {
    const wanted = quantityDemanded(heldPrice, demandShift);
    const offered = quantitySupplied(heldPrice, supplyShift);
    const gap = wanted - offered;

    if (Math.abs(gap) < 0.05) {
      status = `Held at ${money(heldPrice)}, which is exactly where the market clears.`;
    } else if (gap > 0) {
      status = `Shortage of ${units(gap)}: at ${money(heldPrice)} buyers want ${units(wanted)} but sellers offer ${units(offered)}.`;
    } else {
      status = `Surplus of ${units(-gap)}: at ${money(heldPrice)} sellers offer ${units(offered)} but buyers want ${units(wanted)}.`;
    }
  }

  return (
    <Toy note="Toy numbers, not a real market.">
      <SupplyDemandChart
        demandShift={demandShift}
        supplyShift={supplyShift}
        controlPrice={heldPrice}
        description={`Demand slopes down, supply slopes up. ${status}`}
      />
      <ChartKey
        items={[
          { label: "Demand", color: colors.demand },
          { label: "Supply", color: colors.supply }
        ]}
      />
      <Readout>{status}</Readout>
      <div className="flex flex-col gap-2">
        <Slider
          label="Demand"
          readout={shiftLabel(demandShift)}
          value={demandShift}
          min={-3}
          max={3}
          accent={colors.demand}
          onChange={setDemandShift}
        />
        <Slider
          label="Supply"
          readout={shiftLabel(supplyShift)}
          value={supplyShift}
          min={-3}
          max={3}
          accent={colors.supply}
          onChange={setSupplyShift}
        />
        <label className="flex items-center gap-3 h-11 text-sm text-neutral-300">
          <input
            type="checkbox"
            checked={heldPrice !== undefined}
            onChange={(event) =>
              setHeldPrice(event.target.checked ? 4 : undefined)
            }
            className="w-5 h-5 cursor-pointer"
          />
          Hold the price away from the crossing
        </label>
        {heldPrice !== undefined && (
          <Slider
            label="Held price"
            readout={money(heldPrice)}
            value={heldPrice}
            min={2}
            max={10}
            step={0.5}
            onChange={setHeldPrice}
          />
        )}
      </div>
    </Toy>
  );
}
