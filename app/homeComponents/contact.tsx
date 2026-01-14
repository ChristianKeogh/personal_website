"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="text-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pb-20"
      >
        <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
        <a
          href="mailto:christianfkeogh@gmail.com"
          className="inline-block border border-neutral-700 hover:border-neutral-200 bg-neutral-900 hover:bg-neutral-800 text-white rounded-md px-6 py-3 transition-all duration-300"
        >
          christianfkeogh@gmail.com
        </a>
      </motion.div>
    </section>
  );
}
