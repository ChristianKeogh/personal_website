"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

export type Category = "Production" | "Personal";

export interface ArtItem {
  id: string;
  title: string;
  category: Category;
  url: string;
  description: string;
  folder: string;
}

function ItemCaption({ item }: { item: ArtItem }) {
  const showDescription =
    item.description !== "" && item.description !== item.title;
  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-xs text-neutral-100 uppercase tracking-wider">
        {item.title}
      </h3>
      {showDescription ? (
        <p className="text-sm text-neutral-500">{item.description}</p>
      ) : null}
    </div>
  );
}

export default function GalleryClient({
  initialItems,
  error,
}: {
  initialItems: ArtItem[];
  error?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<Category | "All">(
    "Production"
  );
  const [index, setIndex] = useState(-1);

  const filteredItems = useMemo(
    () =>
      initialItems.filter((item) =>
        activeCategory === "All" ? true : item.category === activeCategory
      ),
    [initialItems, activeCategory]
  );

  const groups: { folder: string; items: ArtItem[] }[] = [];
  const ungrouped: ArtItem[] = [];
  const byFolder = new Map<string, ArtItem[]>();
  for (const item of filteredItems) {
    if (!item.folder) {
      ungrouped.push(item);
      continue;
    }
    let bucket = byFolder.get(item.folder);
    if (!bucket) {
      bucket = [];
      byFolder.set(item.folder, bucket);
      groups.push({ folder: item.folder, items: bucket });
    }
    bucket.push(item);
  }
  if (ungrouped.length) {
    groups.unshift({ folder: "", items: ungrouped });
  }

  const slides = useMemo(
    () =>
      filteredItems.map((item) => ({
        src: item.url,
        alt: item.title,
        title: item.title,
        description:
          item.description !== "" && item.description !== item.title
            ? item.description
            : undefined,
      })),
    [filteredItems]
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-12">
        <p className="text-neutral-400 mb-8">
          A collection of my work ranging from professional production pieces to
          personal explorations
        </p>

        {error && (
          <p className="text-red-400 mb-8 break-words">{error}</p>
        )}

        <div className="flex gap-4 border-b border-neutral-800 pb-2">
          {["All", "Production", "Personal"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat as Category | "All");
                setIndex(-1);
              }}
              className={`pb-2 px-1 text-sm font-medium transition-colors relative ${
                activeCategory === cat
                  ? "text-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.folder || "ungrouped"}>
            {group.folder ? (
              <h2 className="font-semibold text-xs text-neutral-100 uppercase tracking-wider mb-4">
                {group.folder}
              </h2>
            ) : null}
            <div className="columns-1 md:columns-2 gap-6">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setIndex(filteredItems.indexOf(item))}
                  className="group mb-6 break-inside-avoid flex flex-col space-y-3 cursor-zoom-in"
                >
                  <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-colors group-hover:border-neutral-700">
                    <Image
                      src={item.url}
                      alt={item.title}
                      width={1200}
                      height={800}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <ItemCaption item={item} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {!error && filteredItems.length === 0 && (
        <p className="text-neutral-500 text-center py-20">
          No items found in this category.
        </p>
      )}

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Zoom, Captions, Thumbnails, Counter]}
        controller={{ closeOnBackdropClick: true }}
      />
    </motion.div>
  );
}
