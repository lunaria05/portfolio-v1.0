'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      className="fixed top-8 left-8 z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="group cursor-default">
        <h1 className="text-2xl font-bold  bg-linear-to-r from-[#1aa9da] to-[#60d4f7] text-transparent bg-clip-text tracking-wider transition-colors duration-300">
          HIRAL VALA
        </h1>
        <div className="h-1 w-12 bg-linear-to-r from-[#1aa9da] to-[#60d4f7] rounded-full mt-2 group-hover:w-full transition-all duration-500 ease-out" />
        </div>
    </motion.header>
  );
}