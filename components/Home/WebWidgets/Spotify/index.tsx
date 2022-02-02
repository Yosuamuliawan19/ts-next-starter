import { motion } from 'framer-motion';
import React from 'react';

const colors = ['#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF'];

const SwipeCard = () => {
  return (
    <div className="rounded-xl bg-gray-100 h-40 w-40 relative">
      <motion.div
        whileHover={{
          scale: 1.1,
          shadow: '0px 11px 40px -15px rgb(0 0 0 / 50%)',
        }}
        className="absolute"
        style={{ top: '2%' }}
      >
        <img
          src="https://cdn.britannica.com/18/136518-050-CD0E49C6/The-Beatles-Ringo-Starr-Paul-McCartney-George.jpg"
          className="rounded-full w-10 h-10 cursor-pointer"
        />
      </motion.div>

      <motion.div
        whileHover={{
          scale: 1.1,
          shadow: '0px 11px 40px -15px rgb(0 0 0 / 50%)',
        }}
        className="absolute"
        style={{ top: '40%' }}
      >
        <img
          src="https://cdn.britannica.com/18/136518-050-CD0E49C6/The-Beatles-Ringo-Starr-Paul-McCartney-George.jpg"
          className="rounded-full w-20 h-20 cursor-pointer"
        />
      </motion.div>
    </div>
  );
};
export default SwipeCard;
