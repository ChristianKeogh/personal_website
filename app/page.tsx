"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Page() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-row items-center"
      >
        <Image
          src="/images/home/IMG_4172.JPG"
          alt="Mineself"
          width={300}
          height={500}
          className="mr-8"
          priority
        />{" "}
        <div className=" text-justify flex-col space-y-10">
          <p>
            I'm a Frontend Developer from Dublin. I use this website to explore
            web dev and other things.
          </p>
          <p className="text-neutral-400">
            This will be in a state of WIP for the time being.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
