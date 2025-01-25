"use client";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <section className="flex flex-col items-center">
      <img src="/images/home/IMG_4172.JPG" alt="Mineself" className="mb-4" />
      <br />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4 text-justify"
      >
        I'm a Frontend Developer from Dublin. I use this website to blog about
        things.
      </motion.p>
      <br /> <br /> <br />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-neutral-400"
      >
        This website will be in a perpetual state of WIP for the time being.
      </motion.p>
    </section>
  );
}
