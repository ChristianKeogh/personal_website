"use client";

import { useState, useEffect } from "react";
import { animate } from "motion";

const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
};

const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0");
const day = today.getDate().toString().padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

export default function DebtPage() {
  const [debtNumber, setDebtNumber] = useState<number>(0);

  useEffect(() => {
    const fetchDebt = async () => {
      const res = await fetch(
        `https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date`,
        { cache: "no-store" }
      );
      const data = await res.json();
      const rawDebt = parseFloat(data.data[0].tot_pub_debt_out_amt);

      animate(0, rawDebt, {
        duration: 6,
        ease: [0, 1, 0.31, 1],
        onUpdate: (latest) => setDebtNumber(latest)
      });
    };

    fetchDebt();
  }, []);

  return (
    <section className="text-center">
      <h1 className="text-xl">United States Total Debt</h1>
      <h3 className="text-neutral-400">{formattedDate}</h3>
      <br />
      <h1 className="text-4xl">${formatNumber(debtNumber)} </h1>
    </section>
  );
}
