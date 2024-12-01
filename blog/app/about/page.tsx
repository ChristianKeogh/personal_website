export const metadata = {
  title: "About",
  description: "About me"
};

export default function Page() {
  return (
    <section>
      {/* <h1 className="font-semibold text-2xl mb-8 tracking-tighter">About</h1> */}
      <p className="text-justify">
        Starting in 2019, I worked 4 years in the Animation industry but found
        the pay and job security unsatisfactory.
        <br />
        <br />
        In 2023, I undertook a 1-year Hdip in Computer Science, which I used to
        gain a position as a Frontend developer at Ryanair, working with
        Angular.
        <br />
        <br />
        My interests outside tech are History and Politics.
      </p>
      <br />
      <p className="text-neutral-400">Christianfkeogh@gmail.com</p>
    </section>
  );
}
