export interface Lesson {
  slug: string;
  title: string;
  blurb: string;
  idea: string;
}

export const lessons: Lesson[] = [
  {
    slug: "an-economy",
    title: "An economy is",
    blurb: "People making, trading and using things — including you.",
    idea: "An economy is people making, trading and using things. Not a building. The same loop that fills a shop also sets your rent, your wage, and whether the bus still runs."
  },
  {
    slug: "scarcity-trade-offs",
    title: "Scarcity & trade-offs",
    blurb: "Why every choice quietly costs you something else.",
    idea: "You cannot have everything. Time, money and materials run out, so choosing one thing means giving up another. What you gave up is the opportunity cost."
  },
  {
    slug: "supply-demand",
    title: "Supply & demand",
    blurb: "Where buyers and sellers agree on a price.",
    idea: "Buyers want more at low prices. Sellers want to sell more at high prices. Price settles where those two willingnesses meet."
  },
  {
    slug: "equilibrium-shocks",
    title: "Equilibrium & shocks",
    blurb: "What happens when something moves a curve.",
    idea: "Markets rest at a crossing. A shock moves supply or demand, and price and quantity slide to a new crossing. Which way they move depends on which curve was hit."
  },
  {
    slug: "incentives",
    title: "Incentives",
    blurb: "Change the payoff, change the behaviour.",
    idea: "People respond to costs and benefits. Make something cheaper or easier and you get more of it; make it costlier and you get less. Not all incentives are money."
  },
  {
    slug: "markets-failure",
    title: "Markets & failure",
    blurb: "When the price leaves out part of the cost.",
    idea: "Markets work well when the costs and benefits land on the people choosing. They fail when someone else pays, information is bad, or one seller dominates."
  },
  {
    slug: "gdp-inflation-unemployment",
    title: "GDP, inflation, unemployment",
    blurb: "The three headline gauges of a whole economy.",
    idea: "GDP measures what an economy produces, inflation measures how fast prices rise, and unemployment counts people who want work and cannot find it. Together they sketch the state of an economy."
  }
];

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}
