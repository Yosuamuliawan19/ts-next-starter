import { motion } from 'framer-motion';
import React from 'react';

export function ExamplesSection() {
  return (
    <>
      <div className="text-2xl mb-4">Examples</div>
      <div className="flex mb-6 overflow-x-scroll w-min-content">
        {['a', 'b', 'c', 'd', 'e'].map((data) => {
          return (
            <motion.div
              style={{ minWidth: '160px' }}
              whileHover={{ scale: 1.1, opacity: 0.85 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-lg bg-gray-100 h-60  mr-8"
            ></motion.div>
          );
        })}
      </div>
    </>
  );
}
