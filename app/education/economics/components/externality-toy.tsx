"use client";
import { useState } from "react";
import { ChartKey, Readout, Slider, Toy } from "./controls";
import {
  colors,
  demandPrice,
  equilibrium,
  money,
  units
} from "./market";
import SupplyDemandChart from "./supply-demand-chart";

export default function ExternalityToy() {
  const [spill, setSpill] = useState(2);
  const market = equilibrium();
  const efficientQuantity = market.quantity - spill;
  const efficientPrice = demandPrice(efficientQuantity);

  const status =
    spill === 0
      ? `No spill. Private and social cost match, so ${units(market.quantity)} at ${money(market.price)} is fine.`
      : `Market sells ${units(market.quantity)} at ${money(market.price)}. Counting the spill, ${units(efficientQuantity)} at ${money(efficientPrice)} would be better. The extra units look cheap because someone else pays.`;

  return (
    <Toy note="Toy numbers. The spill is a cost left out of the price.">
      <SupplyDemandChart
        demandShift={0}
        supplyShift={0}
        externalCost={spill}
        description={`Private supply versus social cost. ${status}`}
      />
      <ChartKey
        items={[
          { label: "Demand", color: colors.demand },
          { label: "Private cost", color: colors.supply },
          { label: "Social cost", color: colors.social, dashed: true }
        ]}
      />
      <Readout>{status}</Readout>
      <Slider
        label="Spill not in the price"
        readout={spill === 0 ? "none" : money(spill)}
        value={spill}
        min={0}
        max={4}
        accent={colors.social}
        onChange={setSpill}
      />
    </Toy>
  );
}
