import React from 'react';
import { IButtonElement } from '@elements/types';
import { usePage } from 'state/Page';
import { useUI } from 'state/UI';
// import { getIconComponent } from '@elements/ElementComponent/Toolbar/ButtonManagement/IconPicker';
interface Props {
  element: IButtonElement;
  editMode: boolean;
  id: string;
  idx: any;
  className?: string;
  onClick: () => void;
}

const ButtonElement = React.forwardRef((props: Props, ref) => {
  const { element, editMode, id, idx, className, onClick } = props;
  const editSelectedElement = usePage((state) => state.editSelectedElement);
  const setIsDragging = useUI((state) => state.setIsDragging);

  const position = { x: element.pos.x, y: element.pos.y };

  return (
    <div
      ref={ref}
      id={id}
      key={id}
      style={{
        backgroundColor: element.backgroundColor,
        color: element.color,
        textAlign: element.textAlign,
        // zIndex: element.pos.z,
        position: 'absolute',
        width: element.size?.width,
        height: element.size?.height,
        // transform:
        //   `translate(${element.pos.x}px, ${element.pos.y}px)` +
        //   `rotate(${element.rotate}deg)`,
      }}
      onClick={onClick}
      className={`${classes.button} ${className}`}
      // onDoubleClick={(_) => {
      //   setEditableContent(true);
      // }}
    >
      <div style={{ width: 16, height: 16, objectFit: 'contain' }}>
        {' '}
        {/* {getIconComponent(element.logo)?.logo} */}
      </div>
      <div
        style={{
          width: '100%',
          fontSize: element.fontSize + 'px',
          fontFamily: element.fontFamily,
        }}
      >
        {element.value}
      </div>

      {/* {!editableContent ? (
        <div
          style={{
            width: '100%',
            fontSize: element.fontSize + 'px',
            fontFamily: element.fontFamily,
          }}
        >
          {element.value}
        </div>
      ) : (
        <textarea
          autoFocus
          id={id}
          key={id}
          style={{
            fontSize: element.fontSize + 'px',
            fontFamily: element.fontFamily,
            textAlign: element.textAlign,
            color: element.color,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0)',
          }}
          className={classes.text}
          value={internalValue}
          onFocus={(e) => {
            console.log('Focused on input');
          }}
          onBlur={(e) => {
            console.log('blur on input');
            setValue(internalValue);
            setEditableContent(false);
          }}
          onChange={(e) => setInternalValue(e.target.value)}
        />
      )} */}
    </div>
  );
});
export default ButtonElement;
const classes = {
  button:
    'hover:shadow-xl  flex items-center handle  noselect max-w-phoneBtnMax  shadow-xl  rounded-md  p-4 cursor-pointer  text-white handle  w-full h-full',
  text: ' flex items-center ',
};
