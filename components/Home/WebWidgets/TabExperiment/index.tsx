import React from 'react';
import { useState } from 'react';
import { motion, AnimateSharedLayout } from 'framer-motion';
// import './styles.css';

/**
 * This is an example of animating between different components in Framer Motion 2.
 *
 * By wrapping a tree with AnimateSharedLayout, children can be given a layoutId.
 *
 * When a component with a layoutId is removed and a new one with the same layoutId
 * is added elsewhere, the new component will animate from the old one.
 *
 * The outline being animated here is four different components, animated like one.
 */

interface Props {
  value: any;
  onChange: any;
  options: any[];
}

export default function AnimatedTab() {
  const [selected, setSelected] = useState(colors[0]);

  return (
    <AnimateSharedLayout>
      <div className="flex rounded-full  border-2 border-gray-100 p-1 z-0 relative overflox-scroll  ">
        {colors.map((color) => (
          <Item
            key={color}
            color={color}
            isSelected={selected === color}
            onClick={() => setSelected(color)}
          />
        ))}
      </div>
    </AnimateSharedLayout>
  );
}

function Item({ color, isSelected, onClick }) {
  return (
    <div
      className="item  rounded-full cursor-pointer hover:bg-gray-50 text-md  "
      onClick={onClick}
    >
      {isSelected && (
        <motion.div
          layoutId="outline"
          className="outline z-1 bg-gray-200 text-gray-200 absolute rounded-full px-4 py-1 "
          initial={false}
          // animate={{ borderColor: color }}
          transition={spring}
        >
          {color}
        </motion.div>
      )}
      <motion.div
        whileTap={{ scale: 0.9 }}
        key="text"
        className={`z-max relative px-4 py-1  rounded-full ${
          isSelected ? 'text-black' : 'text-gray-500'
        }`}
      >
        {color}
      </motion.div>
    </div>
  );
}

const colors = ['Projects', 'Experiences', 'Blog', 'Extraculliculars'];

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};
