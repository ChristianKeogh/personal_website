export interface Lesson {
  slug: string;
  title: string;
  blurb: string;
  idea: string;
  takeaways: [string, string, string];
}

export const lessons: Lesson[] = [
  {
    slug: "scarcity-trade-offs",
    title: "Scarcity & trade-offs",
    blurb: "Why every choice quietly costs you something else.",
    idea: "You cannot have everything. Time, money and materials run out, so choosing one thing means giving up another. What you gave up is the opportunity cost.",
    takeaways: [
      "Scarcity is the starting point of economics.",
      "Every choice has an opportunity cost.",
      "“Free” still costs time, or something else you could have done."
    ]
  },
  {
    slug: "supply-demand",
    title: "Supply & demand",
    blurb: "Where buyers and sellers agree on a price.",
    idea: "Buyers want more at low prices. Sellers want to sell more at high prices. Price settles where those two willingnesses meet.",
    takeaways: [
      "Demand slopes down; supply slopes up.",
      "Shifts move the intersection, changing price and quantity.",
      "A price stuck away from the intersection creates shortage or surplus."
    ]
  },
  {
    slug: "equilibrium-shocks",
    title: "Equilibrium & shocks",
    blurb: "What happens when something moves a curve.",
    idea: "Markets rest at a crossing. A shock moves supply or demand, and price and quantity slide to a new crossing. Which way they move depends on which curve was hit.",
    takeaways: [
      "Equilibrium is a resting point, not a moral judgment.",
      "Demand shocks and supply shocks move price in different directions.",
      "Read the cause before guessing what happens to price."
    ]
  },
  {
    slug: "incentives",
    title: "Incentives",
    blurb: "Change the payoff, change the behaviour.",
    idea: "People respond to costs and benefits. Make something cheaper or easier and you get more of it; make it costlier and you get less. Not all incentives are money.",
    takeaways: [
      "Incentives are everywhere, not just money.",
      "Unintended consequences often come from ignored incentives.",
      "If a policy fails, ask what it actually rewarded."
    ]
  },
  {
    slug: "markets-failure",
    title: "Markets & failure",
    blurb: "When the price leaves out part of the cost.",
    idea: "Markets work well when the costs and benefits land on the people choosing. They fail when someone else pays, information is bad, or one seller dominates.",
    takeaways: [
      "A market can be efficient and still miss a cost.",
      "Externalities, public goods and thin competition are the usual failure modes.",
      "“Failure” means the price signal is incomplete, not that trade is bad."
    ]
  },
  {
    slug: "gdp-inflation-unemployment",
    title: "GDP, inflation, unemployment",
    blurb: "The three headline gauges of a whole economy.",
    idea: "GDP measures what an economy produces, inflation measures how fast prices rise, and unemployment counts people who want work and cannot find it. Together they sketch the state of an economy.",
    takeaways: [
      "GDP is a flow of production, not a measure of happiness.",
      "Inflation is a rise in the price level, not one thing getting expensive.",
      "Unemployment counts people who want work; not everyone without a job."
    ]
  }
];

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getNeighbours(slug: string) {
  const index = lessons.findIndex((lesson) => lesson.slug === slug);

  return {
    previous: index > 0 ? lessons[index - 1] : undefined,
    next: index < lessons.length - 1 ? lessons[index + 1] : undefined
  };
}
