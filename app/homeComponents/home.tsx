"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomeAbout() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-row items-start space-x-8"
      >
        <Image
          src="/images/home/IMG_4172.JPG"
          alt="Mineself"
          width={300}
          height={500}
          className="rounded-md"
          priority
        />

        <div className="flex flex-col space-y-6 text-justify">
          <p>
            Hi, I’m Christian, a professional Frontend Developer in Dublin.
            Previously spent about four years working as an animation designer
            before switching to web development in 2024. I work in Angular and
            React, and still do some design work when it fits.
            <br />
            <br />
            I’ve always been into computers, the internet, and design. One of
            those nerdy kids who lived online. Outside of tech, I’m interested
            in history, politics, and a bit of finance.
          </p>

          {/* <div className="flex space-x-4 text-neutral-400">
            <p>christianfkeogh@gmail.com</p>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="/pdfs/Curriculum-Vitae-2025.pdf"
            >
              cv
            </a>
          </div> */}
        </div>
      </motion.div>
    </section>
  );
}
