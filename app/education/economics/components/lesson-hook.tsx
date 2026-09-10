"use client";
import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { colors } from "./market";

const ease = [0.16, 1, 0.3, 1] as const;

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 240 80"
      aria-hidden
      className="w-full h-20 my-6 overflow-visible"
    >
      {children}
    </svg>
  );
}

function Stroke({
  d,
  color,
  delay = 0,
  still,
  dashed
}: {
  d: string;
  color: string;
  delay?: number;
  still: boolean;
  dashed?: boolean;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeDasharray={dashed ? "5 4" : undefined}
      initial={still ? false : { pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.4, delay, ease }}
    />
  );
}

function Ticker({ to, unit }: { to: number; unit: string }) {
  const still = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (still) {
      setValue(to);
      return;
    }

    const controls = animate(0, to, {
      duration: 1.8,
      ease,
      onUpdate: setValue
    });

    return () => controls.stop();
  }, [still, to]);

  return (
    <span className="text-lg tabular-nums text-neutral-100">
      {value.toFixed(1)}
      {unit}
    </span>
  );
}

function Scene({ slug, still }: { slug: string; still: boolean }) {
  switch (slug) {
    case "an-economy":
      return (
        <Frame>
          <Stroke
            d="M40 40 C40 12, 200 12, 200 40 C200 68, 40 68, 40 40"
            color={colors.mark}
            still={still}
          />
        </Frame>
      );

    case "scarcity-trade-offs":
      return (
        <Frame>
          <motion.rect
            y={30}
            width={45}
            height={20}
            rx={3}
            fill={colors.demand}
            initial={still ? false : { x: 75 }}
            animate={{ x: 40 }}
            transition={{ duration: 1.2, delay: 0.6, ease }}
          />
          <motion.rect
            y={30}
            width={45}
            height={20}
            rx={3}
            fill={colors.supply}
            initial={still ? false : { x: 120 }}
            animate={{ x: 155 }}
            transition={{ duration: 1.2, delay: 0.6, ease }}
          />
        </Frame>
      );

    case "supply-demand":
      return (
        <Frame>
          <Stroke d="M20 12 L220 68" color={colors.demand} still={still} />
          <Stroke
            d="M20 68 L220 12"
            color={colors.supply}
            delay={0.3}
            still={still}
          />
        </Frame>
      );

    case "equilibrium-shocks":
      return (
        <Frame>
          <Stroke d="M20 12 L220 68" color={colors.demand} still={still} />
          <motion.g
            initial={still ? false : { x: 0 }}
            animate={{ x: 40 }}
            transition={{ duration: 1, delay: 1.8, ease }}
          >
            <Stroke
              d="M20 68 L200 14"
              color={colors.supply}
              delay={0.3}
              still={still}
            />
          </motion.g>
        </Frame>
      );

    case "incentives":
      return (
        <Frame>
          {[
            { x: 70, from: 18, to: 46, fill: colors.demand },
            { x: 140, from: 46, to: 18, fill: colors.supply }
          ].map((bar) => (
            <motion.rect
              key={bar.x}
              x={bar.x}
              width={30}
              rx={3}
              fill={bar.fill}
              initial={still ? false : { height: bar.from, y: 66 - bar.from }}
              animate={{ height: bar.to, y: 66 - bar.to }}
              transition={{ duration: 1.2, delay: 0.8, ease }}
            />
          ))}
        </Frame>
      );

    case "markets-failure":
      return (
        <Frame>
          <Stroke d="M20 56 L220 56" color={colors.supply} still={still} />
          <motion.ellipse
            cx={150}
            cy={62}
            rx={34}
            ry={9}
            fill={colors.social}
            initial={still ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.6, delay: 1.2, ease }}
            style={{ originX: "150px", originY: "62px" }}
          />
        </Frame>
      );

    case "gdp-inflation-unemployment":
      return (
        <div className="my-6 grid grid-cols-3 gap-3 text-xs text-neutral-500">
          {[
            { label: "GDP", to: 2.1, unit: "%" },
            { label: "Inflation", to: 3.4, unit: "%" },
            { label: "Unemployment", to: 4.6, unit: "%" }
          ].map((gauge) => (
            <div key={gauge.label} className="flex flex-col">
              <Ticker to={gauge.to} unit={gauge.unit} />
              {gauge.label}
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export default function LessonHook({ slug }: { slug: string }) {
  const still = useReducedMotion();

  return <Scene slug={slug} still={Boolean(still)} />;
}
