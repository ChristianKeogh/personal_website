/**
 * Toy market on made-up units: price in pounds, quantity in "units a week".
 * Both curves are straight lines that shift sideways, so a shift of +1 moves a
 * curve one unit to the right.
 */
export const Q_MAX = 18;
export const P_MAX = 14;

export const colors = {
  demand: "#60a5fa",
  supply: "#fbbf24",
  social: "#fb7185",
  mark: "#fafafa",
  grid: "#262626",
  axis: "#525252",
  label: "#a3a3a3"
};

export function demandPrice(quantity: number, shift = 0) {
  return 10 - 0.5 * (quantity - shift);
}

export function supplyPrice(quantity: number, shift = 0) {
  return 2 + 0.5 * (quantity - shift);
}

export function quantityDemanded(price: number, shift = 0) {
  return shift + 20 - 2 * price;
}

export function quantitySupplied(price: number, shift = 0) {
  return shift + 2 * price - 4;
}

export function equilibrium(demandShift = 0, supplyShift = 0) {
  return {
    quantity: 8 + (demandShift + supplyShift) / 2,
    price: 6 + (demandShift - supplyShift) / 4
  };
}

export interface MarketState {
  demandShift: number;
  supplyShift: number;
  externalCost?: number;
}

export function marketPoints({
  demandShift,
  supplyShift,
  externalCost = 0
}: MarketState) {
  const points: {
    quantity: number;
    demand: number | null;
    supply: number | null;
    social?: number | null;
  }[] = [];

  const visible = (price: number) =>
    price < 0 || price > P_MAX ? null : Number(price.toFixed(2));

  for (let quantity = 0; quantity <= Q_MAX; quantity += 1) {
    points.push({
      quantity,
      demand: visible(demandPrice(quantity, demandShift)),
      supply: visible(supplyPrice(quantity, supplyShift)),
      ...(externalCost > 0 && {
        social: visible(supplyPrice(quantity, supplyShift) + externalCost)
      })
    });
  }

  return points;
}

export function money(value: number) {
  return `£${value.toFixed(2)}`;
}

export function units(value: number) {
  return `${Number(value.toFixed(1))} units`;
}
