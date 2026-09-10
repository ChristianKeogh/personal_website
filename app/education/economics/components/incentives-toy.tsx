"use client";
import { useState } from "react";
import { Readout, Toy } from "./controls";
import { colors } from "./market";

type Policy = "none" | "tax" | "subsidy";

const policies: { id: Policy; label: string; cycle: number; drive: number }[] =
  [
    { id: "none", label: "No policy", cycle: 8, drive: 12 },
    { id: "tax", label: "Tax driving", cycle: 14, drive: 6 },
    { id: "subsidy", label: "Subsidise cycling", cycle: 13, drive: 7 }
  ];

const total = 20;

function Bar({
  label,
  count,
  color
}: {
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm text-neutral-300 mb-1">
        <span>{label}</span>
        <span className="tabular-nums text-neutral-400">
          {count} of {total}
        </span>
      </div>
      <div className="h-8 rounded bg-neutral-900 overflow-hidden">
        <div
          className="h-full rounded transition-[width] duration-500"
          style={{ width: `${(count / total) * 100}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function IncentivesToy() {
  const [policy, setPolicy] = useState<Policy>("none");
  const active = policies.find((item) => item.id === policy) ?? policies[0];

  const status =
    policy === "none"
      ? "Twenty people pick a way to work. Most drive because it is faster for them."
      : policy === "tax"
        ? "A driving tax makes the car dearer. Some switch even if they still prefer driving."
        : "A cycling subsidy makes the bike cheaper. A few switch; driving is still easier for others.";

  return (
    <Toy note="Qualitative toy. Counts are made up.">
      <div
        role="img"
        aria-label={`${active.cycle} cycle, ${active.drive} drive. ${status}`}
        className="flex flex-col gap-4"
      >
        <Bar label="Cycle" count={active.cycle} color={colors.demand} />
        <Bar label="Drive" count={active.drive} color={colors.supply} />
      </div>
      <Readout>{status}</Readout>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Policy">
        {policies.map((item) => {
          const isActive = item.id === policy;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setPolicy(item.id)}
              className={`h-11 px-3 rounded-lg border text-sm transition-colors ${
                isActive
                  ? "border-neutral-400 text-neutral-100"
                  : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </Toy>
  );
}
