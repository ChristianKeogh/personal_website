"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Credentials() {
  const links = [
    {
      label: "CV",
      href: "/pdfs/Christian-Keogh-CV.pdf",
      img: "/images/icons/resume-7.png"
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/christian-keogh-94888a28b/",
      img: "/images/icons/linkedin.jpg"
    },
    {
      label: "GitHub",
      href: "https://github.com/ChristianKeogh",
      img: "/images/icons/github.png"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex justify-center"
    >
      <div className="grid grid-cols-3 gap-8">
        {links.map((item, i) => (
          <a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-36 h-60 bg-neutral-1000 rounded-md flex flex-col items-center justify-center text-lg font-semibold hover:bg-neutral-900 transition-colors"
          >
            <Image
              src={item.img}
              alt={`${item.label} icon`}
              width={60}
              height={60}
              className="mt-4"
            />
          </a>
        ))}
      </div>
    </motion.div>
  );
}
