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
        href="https://hacker-news-tawny-one.vercel.app/"
      >
        Remake of Hacker News
      </a>
      <p className="text-neutral-400 text-xl">(Angular and Material)</p>
      <a />
    </motion.section>
  );
}
