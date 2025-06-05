"use client";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <section>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-justify"
      >
        Hi, I’m Christian. I’m based in Dublin and spent about four years
        working as an animation designer before switching to web development in
        2024. I work on frontend, using Angular and React, and still do some
        design work when it fits.
        <br />
        <br />
        I’ve always been into computers, the internet, and design. One of those
        nerdy kids who lived online. Outside of tech, I’m interested in history,
        politics, and a bit of finance.
      </motion.p>
      <br />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex space-x-4"
      >
        <p className="text-neutral-400">christianfkeogh@gmail.com</p>
        <a
          className="text-neutral-400"
          rel="noopener noreferrer"
          target="_blank"
          href="/pdfs/Curriculum-Vitae-2025.pdf"
        >
          cv
        </a>
      </motion.div>
    </section>
  );
}
