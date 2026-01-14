"use client";
export const dynamic = "force-dynamic";
import { motion } from "framer-motion";
import { APODType } from "./page";

export default function ClientSideApod({ apod }: { apod: APODType }) {
  return (
    <motion.section
      className="flex flex-col items-center justify-center max-w-2xl mx-auto py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {apod.title === "Error" ? (
        <div className="text-center space-y-4">
          <p className="text-red-400">Failed to load content.</p>
          <p className="text-sm text-neutral-500">
            Please try again later.
          </p>
        </div>
      ) : (
        <article className="w-full text-center space-y-6">
          <header>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {apod.title}
            </h1>
            <p className="text-neutral-400 text-sm font-mono">{apod.date}</p>
          </header>

          <div className="rounded-xl overflow-hidden shadow-2xl border border-neutral-800 bg-neutral-900">
            {apod.media_type === "image" ? (
              <img
                src={apod.url}
                alt={apod.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            ) : (
              <div className="aspect-video w-full">
                <iframe
                  src={apod.url}
                  title={apod.title}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          <div className="text-left prose prose-neutral prose-invert max-w-none">
            <p className="text-neutral-300 leading-relaxed">
              {apod.explanation}
            </p>
          </div>
        </article>
      )}
    </motion.section>
  );
}
