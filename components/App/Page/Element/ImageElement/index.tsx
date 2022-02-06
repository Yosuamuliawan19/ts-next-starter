import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  element: IImageElement;
  editMode: boolean;
  id: string;
  idx: any;
  className: string;
  onClick: () => void;
}
const ImageElement = (props: Props) => {
  const { element, editMode, id, idx, className, onClick } = props;

  return (
    <motion.div
      drag
      dragMomentum={false}
      key={id}
      id={id}
      className={'absolute ' + className}
      style={{
        zIndex: element.pos.z,
        position: 'absolute',

        width: element.size?.width,
        height: element.size?.height,
        transform:
          `translate(${element.pos.x}px, ${element.pos.y}px)` +
          `rotate(${element.rotate}deg)`,
      }}
    >
      <img
        src={element.value}
        className="cursor-pointer  text-white handle  noselect  w-full h-full"
        onClick={onClick}
      />
    </motion.div>
  );
};
export default ImageElement;
