"use client";
import { motion } from "framer-motion";

export default function ClientSideApod({ apod }) {
  return (
    <motion.section
      className="text-justify"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-2xl font-bold">{apod.title}</h1>
      <p className="text-neutral-400">{apod.date}</p>
      <br />
      {apod.media_type === "image" ? (
        <img src={apod.url} alt={apod.title} style={{ maxWidth: "100%" }} />
      ) : (
        <iframe
          src={apod.url}
          title={apod.title}
          width="100%"
          height="400"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}
      <br />
      <p>{apod.explanation}</p>
    </motion.section>
  );
}
