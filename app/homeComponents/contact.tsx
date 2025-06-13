"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-20"
      >
        christianfkeogh@gmail.com
      </motion.div>
    </section>
  );
}
