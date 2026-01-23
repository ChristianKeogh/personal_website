"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Category = "Production" | "Personal";

interface ArtItem {
  id: string;
  title: string;
  category: Category;
  url: string;
  description: string;
}

// const ART_ITEMS: ArtItem[] = [
//   {
//     id: "1",
//     title: "VikingSkool",
//     category: "Production",
//     url: "https://images-ch.s3.eu-north-1.amazonaws.com/FmMWx0XXkAEFDF-.jpeg", 
//     description: "",
//   },
//   {
//     id: "2",
//     title: "VikingSkool",
//     category: "Production",
//     url: "https://images-ch.s3.eu-north-1.amazonaws.com/FlZru6zXwAIxPe6.jpeg", 
//     description: "",
//   },
//   {
//     id: "3",
//     title: "VikingSkool",
//     category: "Production",
//     url: "https://images-ch.s3.eu-north-1.amazonaws.com/FlZru61X0AIF-Ou.jpeg", 
//     description: "",
//   },
//     {
//     id: "4",
//     title: "VikingSkool",
//     category: "Production",
//     url: "https://images-ch.s3.eu-north-1.amazonaws.com/FlZru6zXoAA41lM.jpeg", 
//     description: "",
//   },
//   {
//     id: "5",
//     title: "VikingSkool",
//     category: "Production",
//     url: "https://images-ch.s3.eu-north-1.amazonaws.com/FlurrZwWYBgdpCi.jpeg", 
//     description: "",
//   }
// ];

export default function ArtPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      console.log(process.env.NEXT_PUBLIC_PERSONAL_WEBSITE_IMAGES);
      try {
        const response = await fetch("https://60772oqba0.execute-api.eu-north-1.amazonaws.com/get-images-api", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_PERSONAL_WEBSITE_IMAGES || ""
          }
        });
        const data = await response.json();
        setApiResponse(data);
      } catch (err) {
        setApiError(err instanceof Error ? err.message : String(err));
      }
    }
    fetchImages();
  }, []);

  // // const filteredItems = ART_ITEMS.filter((item) =>
  // //   activeCategory === "All" ? true : item.category === activeCategory
  // // );

  // const handleNext = useCallback(() => {
  //   if (selectedIndex === null) return;
  //   setSelectedIndex((prev) => (prev! + 1) % filteredItems.length);
  //   setScale(1);
  //   x.set(0);
  //   y.set(0);
  // }, [selectedIndex, filteredItems.length, x, y]);

  // const handlePrev = useCallback(() => {
  //   if (selectedIndex === null) return;
  //   setSelectedIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  //   setScale(1);
  //   x.set(0);
  //   y.set(0);
  // }, [selectedIndex, filteredItems.length, x, y]);

  // const handleClose = useCallback(() => {
  //   setSelectedIndex(null);
  //   setScale(1);
  //   x.set(0);
  //   y.set(0);
  // }, [x, y]);

  // const handleWheel = useCallback((e: React.WheelEvent) => {
  //   if (selectedIndex === null) return;
  //   // Zoom sensitivity
  //   const zoomStep = 0.1;
  //   const newScale = e.deltaY < 0 ? scale + zoomStep : scale - zoomStep;
  //   // Constrain scale between 1 and 5
  //   const clampedScale = Math.min(Math.max(newScale, 1), 5);
  //   setScale(clampedScale);
    
  //   // Reset position if zooming all the way out
  //   if (clampedScale === 1) {
  //     x.set(0);
  //     y.set(0);
  //   }
  // }, [scale, selectedIndex, x, y]);

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (selectedIndex === null) return;
  //     if (e.key === "ArrowRight") handleNext();
  //     if (e.key === "ArrowLeft") handlePrev();
  //     if (e.key === "Escape") handleClose();
  //   };

  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [selectedIndex, handleNext, handlePrev, handleClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-8"
    >
      <div className="mb-12">
        {/* Raw API Response for Debugging */}
        <div className="mb-8 p-4 bg-neutral-900 border border-neutral-800 rounded-lg overflow-auto max-h-60">
          <h3 className="text-xs font-mono text-neutral-500 mb-2 uppercase tracking-wider">Raw API Response</h3>
          {apiError ? (
            <p className="text-red-400 font-mono text-sm">Error: {apiError}</p>
          ) : apiResponse ? (
            <pre className="text-xs font-mono text-neutral-300">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          ) : (
            <p className="text-neutral-500 font-mono text-sm animate-pulse">Fetching API response...</p>
          )}
        </div>

        <p className="text-neutral-400 mb-8">
          A collection of my work ranging from professional production pieces to personal explorations
        </p>

        <div className="flex gap-4 border-b border-neutral-800 pb-2">
          {["All", "Production", "Personal"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat as Category | "All");
                setSelectedIndex(null);
              }}
              className={`pb-2 px-1 text-sm font-medium transition-colors relative ${
                activeCategory === cat ? "text-white" : "text-neutral-500 hover:text-neutral-300"
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

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedIndex(index)}
            className="group relative flex flex-col space-y-3 cursor-zoom-in"
          >
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-colors group-hover:border-neutral-700">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-semibold text-xs text-neutral-100">{item.title}</h3>
              <p className="text-sm text-neutral-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <p className="text-neutral-500 text-center py-20">No items found in this category.</p>
      )}

      {/* Lightbox Overlay */}
      {/* <AnimatePresence mode="wait">
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 flex flex-col items-center justify-center p-4 md:p-8"
            onClick={handleClose}
            onWheel={handleWheel}
          >
            <button
              className="fixed top-6 right-6 text-neutral-400 hover:text-white p-2 z-[10002] transition-transform hover:scale-110 active:scale-95 bg-black/50 rounded-full"
              onClick={handleClose}
            >
              <X size={32} />
            </button>

            <div 
              ref={containerRef}
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
            >
              {filteredItems.length > 1 && scale === 1 && (
                <>
                  <button
                    className="fixed left-4 md:left-8 text-neutral-400 hover:text-white p-4 z-[10001] transition-colors bg-black/20 rounded-full hover:bg-black/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                  >
                    <ChevronLeft size={48} />
                  </button>
                  <button
                    className="fixed right-4 md:right-8 text-neutral-400 hover:text-white p-4 z-[10001] transition-colors bg-black/20 rounded-full hover:bg-black/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                  >
                    <ChevronRight size={48} />
                  </button>
                </>
              )}

              <motion.div 
                className={`relative w-full h-full max-w-5xl max-h-[85vh] flex flex-col items-center gap-4 ${
                  scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
                }`}
                style={{ x, y, scale }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag={scale > 1}
                dragConstraints={containerRef}
                dragElastic={0.1}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={filteredItems[selectedIndex].url}
                    alt={filteredItems[selectedIndex].title}
                    fill
                    className="object-contain pointer-events-none"
                    priority
                    sizes="100vw"
                  />
                </div>
                {scale === 1 && (
                  <div 
                    className="text-center bg-black/50 px-6 py-4 rounded-xl backdrop-blur-sm pointer-events-none absolute bottom-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-xl font-bold text-white mb-1">
                      {filteredItems[selectedIndex].title}
                    </h2>
                    {filteredItems[selectedIndex].description && (
                      <p className="text-neutral-400">
                        {filteredItems[selectedIndex].description}
                      </p>
                    )}
                    <p className="text-neutral-600 text-sm mt-1 font-mono">
                      {selectedIndex + 1} / {filteredItems.length}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
            
            {scale > 1 && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none text-neutral-400 text-sm font-mono z-[10001]">
                Zoom: {Math.round(scale * 100)}% (Scroll to adjust, Drag to pan)
              </div>
            )} */}
          {/* </motion.div>
        )}
      </AnimatePresence> */}
    </motion.div>
  );
}
