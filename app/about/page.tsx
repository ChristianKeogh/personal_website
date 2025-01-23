export const metadata = {
  title: "About",
  description: "About me"
};

export default function Page() {
  return (
    <section>
      <p className="text-justify">
        Starting in 2019, I worked 4 years in the Animation industry but for a
        few reasons, decided to make a career change.
        <br />
        <br />
        In 2023, I undertook a 1-year Hdip in Computer Science, which I used to
        gain a position as a Frontend developer at Ryanair.
        <br />
        <br />
        My interests outside tech are History and Politics.
      </p>
      <br />
      <div className="flex space-x-4">
        <p className="text-neutral-400">christianfkeogh@gmail.com</p>
        <a
          className="text-neutral-400"
          rel="noopener noreferrer"
          target="_blank"
          href="/pdf/Curriculum-Vitae-2025.pdf"
        >
          cv
        </a>
      </div>
    </section>
  );
}
