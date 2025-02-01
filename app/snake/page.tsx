"use client";
import { motion } from "framer-motion";
import ClickToStart from "./game";

export default function snakePage() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <div className="flex justify-center h-screen">
        <div className="border-4 border-white w-60 h-60">
          <ClickToStart />
        </div>
      </div>
    </motion.section>
  );
}
