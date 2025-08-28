"use client";

import { motion } from "framer-motion";
import Homepage1 from "../../assets/homepage_icons/homepage_stack1.png";
import Homepage2 from "../../assets/homepage_icons/homepage_stack2.png";
import Homepage3 from "../../assets/homepage_icons/homepage_stack3.png";
import Homepage4 from "../../assets/homepage_icons/homepage_stack4.png";

const images = [
  // Left side (stacked & overlapping)
  { src: Homepage1, className: "top-10 left-10 w-64 z-20" },
  { src: Homepage2, className: "top-40 left-20 w-72 z-10" },

  // Right side (stacked & overlapping)
  { src: Homepage3, className: "top-20 right-20 w-72 z-20" },
  { src: Homepage4, className: "bottom-10 right-10 w-64 z-10" },
];

const floatAnimation = {
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function FloatingImages() {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      {images.map((img, i) => (
        <motion.div
          key={i}
          variants={floatAnimation as any}
          initial="initial"
          animate="animate"
          className={`absolute ${img.className}`}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={img.src}
            alt={`image-${i}`}
            width={400}
            height={400}
            style={{ maxWidth: "100%", height: "auto" }}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      ))}
    </div>
  );
}
