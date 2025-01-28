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
        Starting in 2019, I worked 4 years in the Animation industry but for a
        few reasons, decided to make a career change.
        <br />
        <br />
        In 2023, I undertook a 1-year Hdip in Computer Science, which I used to
        gain a position as a Frontend developer at Ryanair.
        <br />
        <br />
        My interests outside tech are History and Politics.
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
