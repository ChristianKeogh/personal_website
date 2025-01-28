"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="w-16 h-16 border-4 border-neutral-400 border-t-transparent rounded-full animate-spin"></div>
    </motion.div>
  );
}
