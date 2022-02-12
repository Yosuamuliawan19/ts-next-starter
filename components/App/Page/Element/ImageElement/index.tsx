import React from 'react';
import { IImageElement } from 'types';

interface Props {
  element: IImageElement;
  editMode: boolean;
  id: string;
  idx: any;
  className: string;
  onClick: () => void;
}

const ImageElement = React.forwardRef((props: Props, ref) => {
  const { element, editMode, id, idx, className, onClick } = props;
  return (
    <div
      key={id}
      id={id}
      ref={ref}
      className={'absolute ' + className}
      style={{
        position: 'absolute',
        width: element.size?.width,
        height: element.size?.height,
      }}
    >
      <img
        src={element.value}
        className="cursor-pointer  text-white handle  noselect  w-full h-full"
        onClick={onClick}
      />
    </div>
  );
});
export default ImageElement;
