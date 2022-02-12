import React from 'react';

interface Props {
  element: IButtonElement;
  editMode: boolean;
  id: string;
  idx: any;
  onClick: string;
  className: string;
}
const TextElement = React.forwardRef((props: Props, ref) => {
  const { element, editMode, id, idx, onClick, className } = props;

  return (
    <div
      ref={ref}
      id={id}
      onClick={onClick}
      className={className}
      key={id}
      style={{
        fontSize: element.fontSize + 'px',
        fontFamily: element.fontFamily,
        textAlign: element.textAlign,
        backgroundColor: element.backgroundColor,
        color: element.color,
        zIndex: element.pos.z,
        position: 'absolute',

        width: element.size?.width,
        height: element.size?.height,
        transform:
          `translate(${element.pos.x}px, ${element.pos.y}px)` +
          `rotate(${element.rotate}deg)`,
        wordBreak: 'break-all',
      }}
    >
      <>{element.value}</>
    </div>
  );
});
export default TextElement;

const classes = {
  text: ' bg-opacity-0 w-full transform duration-100 transition-all cursor-pointer  text-black  ',
};
