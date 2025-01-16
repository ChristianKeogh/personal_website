const formatNumber = (number) => {
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

export default async function useDebt() {
  const res = await fetch(
    `https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date`,
    { cache: "no-store" }
  );
  const debt = await res.json();

  return (
    <section className="text-center">
      <h1 className="text-4xl">United States Total Debt</h1>
      <h3 className="text-neutral-400">{formattedDate}</h3>
      <br />
      <h1 className="text-5xl">
        ${formatNumber(debt.data[debt.data.length - 1].tot_pub_debt_out_amt)}{" "}
      </h1>
    </section>
  );
}
