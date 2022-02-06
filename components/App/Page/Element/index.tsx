import { ELEMENT_TYPES } from '@constants/';
import React from 'react';
import { usePage } from 'state/Page';
import ButtonElement from './ButtonElement';
import ImageElement from './ImageElement';

interface Props {
  elementKey: string;
}
export function Element(props: Props) {
  const elementKey = props.elementKey;

  const currentElement = usePage(
    React.useCallback(
      (state) => {
        return state.elements[state.keyToIdxMap.get(elementKey)];
      },
      [elementKey]
    )
  );
  if (!currentElement || currentElement.type === ELEMENT_TYPES.NONE)
    return null;
  if (currentElement.type === ELEMENT_TYPES.BUTTON) {
    return (
      <ButtonElement key={elementKey} element={currentElement} {...props} />
    );
  }
  if (currentElement.type === ELEMENT_TYPES.IMAGE) {
    return (
      <ImageElement key={elementKey} element={currentElement} {...props} />
    );
  }
  return <div>{currentElement.value}</div>;
}

export default function WrappedElement(props) {
  const { selected, setSelected } = usePage((state) => ({
    setSelected: state.setSelectedElement,
    selected: state.selectedElement,
  }));
  return (
    <>
      <Element
        {...props}
        onClick={() => setSelected(new Set([props.elementKey]))}
        className={
          selected.has(props.elementKey)
            ? ' border-red border-2 scale-105 transition-all duration-100'
            : null
        }
      />
    </>
  );
}
