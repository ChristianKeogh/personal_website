"use client";
export const dynamic = "force-dynamic";
import { motion } from "framer-motion";
import { APODType } from "./page";

export default function ClientSideApod({ apod }: { apod: APODType }) {
  return (
    <motion.section
      className="text-justify"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {apod.title === "Error" ? (
        <p className="text-neutral-400">Failed to load ...?</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{apod.title}</h1>
          <p className="text-neutral-400">{apod.date}</p>
          <br />
          {apod.media_type === "image" ? (
            <img src={apod.url} alt={apod.title} className="max-w-full" />
          ) : (
            <iframe
              src={apod.url}
              title={apod.title}
              width="100%"
              height="400"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
          <br />
          <p>{apod.explanation}</p>
        </>
      )}
    </motion.section>
  );
}
