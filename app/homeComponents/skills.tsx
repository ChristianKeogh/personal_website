"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Skills() {
  const iconPaths = [
    "/images/icons/typescript.png",
    "/images/icons/angular_gradient.png",
    "/images/icons/React-icon.png",
    "/images/icons/Figma-logo.svg",
    "/images/icons/Adobe_Photoshop_CC_icon.svg.png",
    "/images/icons/Python.png"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex justify-center"
    >
      <div className="grid grid-cols-4 gap-8">
        {iconPaths.map((src, i) => (
          <div
            key={i}
            className="w-24 h-24 relative filter grayscale hover:grayscale-0 transition duration-300 ease-in-out cursor-pointer"
          >
            <Image
              src={src}
              alt={`Skill icon ${i + 1}`}
              fill
              sizes="96px"
              priority
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
