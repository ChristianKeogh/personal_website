"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const fadeIn = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

type Section = {
  key: string;
  children: ReactNode;
};

export default function HomeScroll({ sections }: { sections: Section[] }) {
  const [isWide, setIsWide] = useState(false);
  const [active, setActive] = useState(sections[0]?.key ?? "About");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth > 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="relative">
      <div className="fixed top-1/2 left-4 -translate-y-1/2 z-10 space-y-4">
        {sections.map((section) => (
          <a
            key={section.key}
            href={`#${section.key}`}
            className="group flex items-center space-x-2"
          >
            <div
              className={`w-1 h-1 rounded-full transition-transform ${
                active === section.key ? "bg-white scale-125" : "bg-neutral-500"
              }`}
            />
            <span
              className={`text-xs transition-opacity duration-300 ${
                active === section.key
                  ? "text-white opacity-100"
                  : "text-neutral-400 opacity-50"
              }`}
            >
              {isWide ? section.key : null}
            </span>
          </a>
        ))}
      </div>

      <section>
        {sections.map((section, index) => (
          <div
            key={section.key}
            id={section.key}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className="scroll-mt-20"
          >
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              className="flex items-center justify-center min-h-[70vh]"
            >
              {section.children}
            </motion.div>
          </div>
        ))}
      </section>
    </div>
  );
}
