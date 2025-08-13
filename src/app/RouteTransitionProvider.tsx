"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

import type { Variants } from 'framer-motion';

const pageVariants: Variants = {
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1, // <-- This is the transition time in seconds
      ease: [0.8, 1, 0.3, 1] 
    } 
  },
};

interface Props { children: React.ReactNode; }

export default function RouteTransitionProvider({ children }: Props) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        animate="animate"
        exit="exit"
        style={{ minHeight: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
