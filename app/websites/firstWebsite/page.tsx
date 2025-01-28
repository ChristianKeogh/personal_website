"use client";
import { motion } from "framer-motion";

export default function firstWebsite() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <a
        className="text-xl"
        rel="noopener noreferrer"
        target="_blank"
        href="https://first-website-black-five.vercel.app/"
      >
        First website
      </a>
      <p className="text-neutral-400 text-xl">(made with HTML and CSS)</p>
      <a />
    </motion.section>
  );
}
