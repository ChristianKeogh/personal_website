"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeIn = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

export default function Page() {
  const sections = [
    { text: "1 1 1 1 1 1 1 1 1 1", key: 1 },
    { text: "2 2 2 2 2 2 2 2 2 2 2 2 2", key: 2 },
    { text: "3 3 3 3 3 3 3 3 3 3 3", key: 3 },
    { text: "4 4 4 4 4 4 4 4", key: 4 }
  ];

  return (
    <section>
      {sections.map((section) => (
        <motion.div
          key={section.key}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
          className="flex flex-row items-center pb-60"
        >
          <Image
            src="/images/home/IMG_4172.JPG"
            alt="Mineself"
            width={300}
            height={500}
            className="mr-8"
            priority
          />
          <div className="text-justify flex-col space-y-10">
            <p>{section.text}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
