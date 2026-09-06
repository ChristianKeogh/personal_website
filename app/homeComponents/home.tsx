import Image from "next/image";

export default function HomeAbout() {
  return (
    <section>
      <div className="flex flex-row items-center space-x-8">
        <Image
          src="/images/home/self.jpeg"
          alt="Mineself"
          width={250}
          height={250}
          className="rounded-md"
          priority
        />

        <div className="flex flex-col space-y-6 text-justify">
          <p>
            Hi, I’m Christian, a UI Developer and former Animation Designer.
            Outside of work, my interests include history, politics, and a
            little finance.
          </p>
        </div>
      </div>
    </section>
  );
}
