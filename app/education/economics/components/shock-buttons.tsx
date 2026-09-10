"use client";
import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChartKey, Readout, Toy } from "./controls";
import { colors, equilibrium, money, units } from "./market";
import SupplyDemandChart from "./supply-demand-chart";

interface Shock {
  name: string;
  demand: number;
  supply: number;
  effect: string;
}

const shocks: Shock[] = [
  {
    name: "Calm market",
    demand: 0,
    supply: 0,
    effect: "Nothing has moved. The market sits at its crossing."
  },
  {
    name: "Oil shock",
    demand: 0,
    supply: -3,
    effect:
      "Fuel gets dear, so sellers offer less at every price. Supply moves left: price up, quantity down."
  },
  {
    name: "Good harvest",
    demand: 0,
    supply: 3,
    effect:
      "There is more to sell at every price. Supply moves right: price down, quantity up."
  },
  {
    name: "Sudden popularity",
    demand: 3,
    supply: 0,
    effect:
      "Everyone wants one. Demand moves right: price up and quantity up together."
  },
  {
    name: "New tax on buyers",
    demand: -3,
    supply: 0,
    effect:
      "Buyers face a higher total cost, so they want less. Demand moves left: price down, quantity down."
  }
];

export default function ShockButtons() {
  const still = useReducedMotion();
  const [active, setActive] = useState(shocks[0]);
  const [shifts, setShifts] = useState({ demand: 0, supply: 0 });
  const running = useRef<{ stop: () => void }[]>([]);
  const current = useRef(shifts);
  current.current = shifts;

  useEffect(
    () => () => running.current.forEach((control) => control.stop()),
    []
  );

  function apply(shock: Shock) {
    running.current.forEach((control) => control.stop());
    setActive(shock);

    if (still) {
      setShifts({ demand: shock.demand, supply: shock.supply });
      return;
    }

    running.current = (["demand", "supply"] as const).map((curve) =>
      animate(current.current[curve], shock[curve], {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) => {
          current.current = { ...current.current, [curve]: value };
          setShifts({ ...current.current });
        }
      })
    );
  }

  const market = equilibrium(shifts.demand, shifts.supply);
  const status = `${active.effect} Now ${money(market.price)} and ${units(
    market.quantity
  )}, from £6.00 and 8 units.`;

  return (
    <Toy note="Toy numbers, not a real market.">
      <SupplyDemandChart
        demandShift={shifts.demand}
        supplyShift={shifts.supply}
        description={`Supply and demand crossing after the shock “${active.name}”. ${status}`}
      />
      <ChartKey
        items={[
          { label: "Demand", color: colors.demand },
          { label: "Supply", color: colors.supply }
        ]}
      />
      <Readout>{status}</Readout>
      <div className="flex flex-wrap gap-2">
        {shocks.map((shock) => {
          const isActive = shock.name === active.name;

          return (
            <button
              key={shock.name}
              type="button"
              aria-pressed={isActive}
              onClick={() => apply(shock)}
              className={`h-11 px-3 rounded-lg border text-sm transition-colors ${
                isActive
                  ? "border-neutral-400 text-neutral-100"
                  : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
              }`}
            >
              {shock.name}
            </button>
          );
        })}
      </div>
    </Toy>
  );
}
