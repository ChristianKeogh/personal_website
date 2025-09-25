"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Skills from "./homeComponents/skills";
import Home from "./homeComponents/home";
import Credentials from "./homeComponents/credentials";
import Contact from "./homeComponents/contact";

const fadeIn = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export default function Page() {
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth > 1000);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sections = [
    { key: "About", component: <Home /> },
    { key: "Skills", component: <Skills /> },
    { key: "Credentials", component: <Credentials /> },
    { key: "Contact", component: <Contact /> }
  ];

  const sectionRefs = useRef<HTMLElement[]>([]);
  const [active, setActive] = useState("About");

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
      {/* ScrollSpy Nav */}
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

      {/* Content Sections */}
      <section>
        {sections.map((section, index) => (
          <div
            key={section.key}
            id={section.key}
            ref={(el) => (sectionRefs.current[index] = el!)}
            className="scroll-mt-20"
          >
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              className="flex items-center justify-center min-h-[70vh]"
            >
              {section.component}
            </motion.div>
          </div>
        ))}
      </section>
    </div>
  );
}
