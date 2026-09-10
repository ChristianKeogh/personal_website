"use client";
import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Readout, Toy } from "./controls";
import { colors } from "./market";

type Focus = "you" | "firms" | "loop";

const copy: Record<Focus, string> = {
  you: "Your wage, your shopping, your rent. You are already in it.",
  firms: "A shop is people organising production. If spending dries up, so does the work.",
  loop: "This loop, scaled up, is an economy. When it snags, prices, jobs and shelves move for everyone."
};

function Dots({ still }: { still: boolean }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (still) {
      return;
    }

    const controls = animate(0, 1, {
      duration: 5,
      ease: "linear",
      repeat: Infinity,
      onUpdate: setT
    });

    return () => controls.stop();
  }, [still]);

  return (
    <>
      {[0, 0.25, 0.5, 0.75].map((offset, index) => {
        const theta = Math.PI + 2 * Math.PI * ((t + offset) % 1);

        return (
          <circle
            key={offset}
            r={3.5}
            cx={160 + 90 * Math.cos(theta)}
            cy={90 + 62 * Math.sin(theta)}
            fill={index % 2 === 0 ? colors.demand : colors.supply}
          />
        );
      })}
    </>
  );
}

function NodeButton({
  label,
  active,
  className,
  onClick
}: {
  label: string;
  active: boolean;
  className: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`absolute h-11 px-3 rounded-full border text-sm transition-colors ${
        active
          ? "border-neutral-100 bg-neutral-900 text-neutral-100"
          : "border-neutral-600 bg-black text-neutral-300 hover:border-neutral-400"
      } ${className}`}
    >
      {label}
    </button>
  );
}

export default function EconomyToy() {
  const still = Boolean(useReducedMotion());
  const [focus, setFocus] = useState<Focus>("loop");

  return (
    <Toy>
      <div
        role="img"
        aria-label={`You and firms in a loop of work, pay, goods and spending. ${copy[focus]}`}
        className="relative min-h-44"
      >
        <svg viewBox="0 0 320 180" className="w-full h-auto overflow-visible">
          <motion.path
            d="M 70 90 C 70 28, 250 28, 250 90 C 250 152, 70 152, 70 90"
            fill="none"
            stroke={focus === "loop" ? colors.mark : colors.axis}
            strokeWidth={2}
            initial={still ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <Dots still={still} />
          <text
            x="160"
            y="22"
            textAnchor="middle"
            fill={colors.label}
            fontSize="11"
          >
            work · spend
          </text>
          <text
            x="160"
            y="172"
            textAnchor="middle"
            fill={colors.label}
            fontSize="11"
          >
            pay · goods
          </text>
        </svg>
        <NodeButton
          label="You"
          active={focus === "you"}
          className="left-0 top-1/2 -translate-y-1/2"
          onClick={() => setFocus("you")}
        />
        <NodeButton
          label="Firms"
          active={focus === "firms"}
          className="right-0 top-1/2 -translate-y-1/2"
          onClick={() => setFocus("firms")}
        />
        <NodeButton
          label="the loop"
          active={focus === "loop"}
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={() => setFocus("loop")}
        />
      </div>
      <Readout>{copy[focus]}</Readout>
    </Toy>
  );
}
