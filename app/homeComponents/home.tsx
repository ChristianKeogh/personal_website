import Image from "next/image";

export default function HomeAbout() {
  return (
    <section className="w-full max-w-full">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-0 md:space-x-8">
        <Image
          src="/images/home/self.jpeg"
          alt="Mineself"
          width={250}
          height={250}
          className="rounded-md h-auto w-[168px] shrink-0 md:w-[250px]"
          priority
        />

        <div className="flex flex-col space-y-6 text-left text-[1.05rem] leading-7 md:text-justify md:text-base md:leading-normal">
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
