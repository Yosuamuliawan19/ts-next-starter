import { ELEMENT_TYPES } from '@constants/';
import React from 'react';
import { usePage } from 'state/Page';
import { useUI } from 'state/UI';
import ButtonElement from './ButtonElement';
import ImageElement from './ImageElement';
import TextElement from './TextElement';

interface Props {
  elementKey: string;
}

const ELEMENT_MAP = {
  [ELEMENT_TYPES.BUTTON]: ButtonElement,
  [ELEMENT_TYPES.IMAGE]: ImageElement,
  [ELEMENT_TYPES.TEXT]: TextElement,
};
export const Element = React.forwardRef((props: Props, ref) => {
  const elementKey = props.elementKey;
  const { currentElement } = usePage((state) => ({
    currentElement: state.getElement(elementKey),
  }));
  const type = currentElement?.type;
  if (ELEMENT_MAP[type]) {
    const ElementComponent = ELEMENT_MAP[type];
    return (
      <ElementComponent
        key={elementKey}
        element={currentElement}
        ref={ref}
        {...props}
      />
    );
  }
  return null;
});

export default function WrappedElement({ elementKey }: Props) {
  const { selected, setSelected, setSelectedElementRef } = usePage((state) => ({
    setSelected: state.setSelectedElement,
    selected: state.selectedElement,
    setSelectedElementRef: state.setSelectedElementRef,
  }));

  const editSelectedElement = usePage((state) => state.editSelectedElement);
  const setIsDragging = useUI((state) => state.setIsDragging);
  const { currentElement } = usePage((state) => ({
    currentElement: state.getElement(elementKey),
  }));
  const ref = React.useRef();

  React.useEffect(() => {
    if (!ref?.current) return;
    ref.current.style.transform = `translate(${currentElement.pos.x}px, ${currentElement.pos.y}px) rotate(${currentElement.rotate}deg)`;
    if (selected.has(elementKey)) {
      setSelectedElementRef(ref);
    }
  }, [ref, selected]);
  return (
    <>
      <Element
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setSelected([elementKey]);
        }}
        elementKey={elementKey}
        className={'origin-center hover:border-2 cursor-pointer border-white'}
        // className={
        //   selected.has(props.elementKey) ? ' border-red border-2 ' : null
        // }
      />
    </>
  );
}
