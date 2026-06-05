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
          src="/images/home/self.jpeg"
          alt="Mineself"
          width={250}
          height={250}
          className="rounded-md"
          priority
        />

        <div className="flex flex-col space-y-6 text-justify">
          <p>
            Hi, I’m Christian, a professional Frontend Developer in London.
            Previously I worked as an animation designer before switching to web
            development. I work in Angular and React, and still do some design
            work when it fits.
            <br />
            <br />
            I’ve always been into computers, the internet, and design. Outside
            of tech, I’m interested in history, politics, and a bit of finance.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
