import { usePageList } from '@api/';
import PageSelect from '@components/Form/PageSelect';
import {
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  TEXT_ALIGNMENT_OPTIONS,
} from '@constants';
import { Select, Space } from '@douyinfe/semi-ui';
import { cloneObject } from '@helpers/';
import { showSuccessMsg } from '@helpers/feedback';
import classNames from 'classnames';
import { useSpring } from 'framer-motion';
import interact from 'interactjs';
import React from 'react';
import { CgPathBack, CgPathFront } from 'react-icons/cg';
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { ImBin2 } from 'react-icons/im';
import { MdContentCopy } from 'react-icons/md';
import { usePage } from 'state/Page';
import { useUI } from 'state/UI';
import { ITextElement } from 'types';
const tinycolor = require('tinycolor2');
import styles from './index.module.css';
const renderOptionItem = (renderProps) => {
  const {
    disabled,
    selected,
    label,
    value,
    focused,
    className,
    style,
    onMouseEnter,
    onClick,
    empty,
    emptyContent,
    ...rest
  } = renderProps;

  const optionCls = classNames({
    [styles.customOptionRender]: true,
    [styles.customOptionRenderFocused]: focused,
    [styles.customOptionRenderDisabled]: disabled,
    [styles.customOptionRenderSelected]: selected,
  });

  return (
    <div
      style={style}
      className={optionCls}
      onClick={() => onClick()}
      onMouseEnter={(e) => onMouseEnter()}
    >
      <div className="option-right" style={{ fontFamily: value }}>
        {label}
      </div>
    </div>
  );
};

const renderSelectedItem = (option) => (
  <div key={option.value} style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ fontFamily: option.value }}>{option.label}</span>
  </div>
);
function TextAlignmentButton({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  if (!value) return null;
  const TEXT_ALIGN_OPTION_ICON = [
    {
      key: TEXT_ALIGNMENT_OPTIONS[0],
      icon: <FaAlignLeft />,
      next: TEXT_ALIGNMENT_OPTIONS[1],
    },
    {
      key: TEXT_ALIGNMENT_OPTIONS[1],
      icon: <FaAlignCenter />,
      next: TEXT_ALIGNMENT_OPTIONS[2],
    },
    {
      key: TEXT_ALIGNMENT_OPTIONS[2],
      icon: <FaAlignRight />,
      next: TEXT_ALIGNMENT_OPTIONS[0],
    },
  ];
  return (
    <div className="flex items-center">
      {TEXT_ALIGN_OPTION_ICON.map((data) => {
        if (value === data.key) {
          return <div onClick={() => onChange(data.next)}>{data.icon}</div>;
        }
      })}
    </div>
  );
}

function Toolbar() {
  const currentElement = usePage(
    (state) => state.getSelectedElement
  )() as ITextElement;
  const { isScrolling, isDragging } = useUI((state) => ({
    isScrolling: state.isScrolling,
    isDragging: state.isDragging,
  }));
  const {
    editSelectedElement,
    deleteSelectedElement,
    addElement,
    maxZIndex,
    minZIndex,
    selectedElement,
    duplicateElement,
  } = usePage((state) => ({
    editSelectedElement: state.editSelectedElement,
    deleteSelectedElement: state.deleteSelectedElement,
    addElement: state.addElement,
    duplicateElement: state.duplicateElement,
    maxZIndex: state.maxZIndex,
    minZIndex: state.minZIndex,
    selectedElement: state.getSelectedElement(),
  }));

  const x = useSpring(10, { stiffness: 300, damping: 30 });
  const y = useSpring(100, { stiffness: 300, damping: 30 });

  React.useEffect(() => {
    if (!currentElement) return;
    x.set(currentElement.pos.x);
    y.set(currentElement.pos.y - 60);
  }, [currentElement?.pos.x, currentElement?.pos.y]);

  const { data } = usePageList();
  const pageList = data?.pages?.map((data) => ({
    node: 'item',
    name: data?.url,
  }));
  const { selected, setSelected } = usePage((state) => ({
    setSelected: state.setSelectedElement,
    selected: state.selectedElement,
  }));
  if (!currentElement || isScrolling || isDragging) return null;
  const showColorPanel = currentElement.color || currentElement.backgroundColor;
  const elementHeight = currentElement.size.height + 12;
  const elementWidth = currentElement.size.width + 12;
  return (
    <div
      style={{
        // x,
        // y,
        position: 'absolute',
        transform: `translate(${currentElement.pos.x}px, ${
          currentElement.pos.y - 60
        }px)`,
      }}
      className="z-max pointer-events-none"
      onClick={(e) => e.stopPropagation()}
    >
      <Space className="pointer-events-auto">
        {showColorPanel && (
          <Space className="w-min border-2 border-gray-100 rounded-lg mb-4 p-2 flex bg-white h-max">
            <ColorPicker
              value={currentElement.color}
              onChange={(value) => {
                editSelectedElement({ color: value });
              }}
            />
            <ColorPicker
              value={currentElement.backgroundColor}
              onChange={(value) => {
                editSelectedElement({ backgroundColor: value });
              }}
            />
          </Space>
        )}
        <Space className="w-min border-2 border-gray-100 rounded-lg mb-4 p-2 flex bg-white">
          <CgPathFront
            onClick={() => {
              editSelectedElement({
                pos: {
                  ...selectedElement.pos,
                  z: maxZIndex + 1,
                },
              });
            }}
          />
          <CgPathBack
            onClick={() => {
              editSelectedElement({
                pos: {
                  ...selectedElement.pos,
                  z: minZIndex - 1,
                },
              });
            }}
          />
          {currentElement.fontSize && (
            <Select
              optionList={FONT_SIZE_OPTIONS}
              value={currentElement.fontSize}
              onChange={(value) => {
                editSelectedElement({ fontSize: value });
              }}
            />
          )}
          {currentElement.fontFamily && (
            <Select
              renderSelectedItem={renderSelectedItem}
              className={styles.customOptions}
              renderOptionItem={renderOptionItem}
              optionList={FONT_FAMILY_OPTIONS}
              value={currentElement.fontFamily}
              onChange={(value) => {
                editSelectedElement({ fontFamily: value });
              }}
            />
          )}

          <TextAlignmentButton
            value={currentElement.textAlign}
            onChange={(value) => {
              editSelectedElement({ textAlign: value });
            }}
          />
          <MdContentCopy
            onClick={() => {
              duplicateElement();
              showSuccessMsg('Duplicated Element');
            }}
          />
          <ImBin2 onClick={() => deleteSelectedElement()} />
        </Space>
      </Space>
      <div className="" style={{ height: elementHeight }}></div>
      <div className="pointer-events-auto">
        <PageSelect
          position="bottomLeft"
          onChange={(value) => {
            editSelectedElement({ link: value });
          }}
        >
          <div>
            <Space className=" w-fit-content border-2 border-gray-100 rounded-full mb-4 px-2 flex bg-white text-xs ">
              <FiLink /> {currentElement.link || 'Add link'}
            </Space>
          </div>
        </PageSelect>
      </div>
    </div>
  );
}
function ColorPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const isLight = tinycolor(value).isLight();
  return (
    <div
      className="rounded-full h-4 w-4"
      style={{
        backgroundColor: value,
        border: isLight ? '1px solid black' : '1px solid white',
      }}
    ></div>
  );
}

export default function BackgroundPanel() {
  const currentElement = usePage(
    (state) => state.getSelectedElement
  )() as ITextElement;
  const { isScrolling, isDragging } = useUI((state) => ({
    isScrolling: state.isScrolling,
    isDragging: state.isDragging,
  }));
  const {
    editSelectedElement,
    deleteSelectedElement,
    addElement,
    selectedElementRef,
    xAlignments,
    yAlignments,
  } = usePage((state) => ({
    editSelectedElement: state.editSelectedElement,
    deleteSelectedElement: state.deleteSelectedElement,
    addElement: state.addElement,
    selectedElementRef: state.selectedElementRef,
    xAlignments: Array.from(state.xAlignments.keys()),
    yAlignments: Array.from(state.yAlignments.keys()),
  }));

  const x = useSpring(10, { stiffness: 300, damping: 30 });
  const y = useSpring(100, { stiffness: 300, damping: 30 });

  React.useEffect(() => {
    if (!currentElement) return;
    x.set(currentElement.pos.x);
    y.set(currentElement.pos.y - 100);
  }, [currentElement?.pos.x, currentElement?.pos.y]);

  const { data } = usePageList();
  const pageList = data?.pages?.map((data) => ({
    node: 'item',
    name: data?.url,
  }));
  const { selected, setSelected } = usePage((state) => ({
    setSelected: state.setSelectedElement,
    selected: state.selectedElement,
  }));

  const setIsDragging = useUI((state) => state.setIsDragging);

  const position = cloneObject(currentElement?.pos);
  const rotate = currentElement?.rotate;

  const currentElementProperties = React.useRef(currentElement);

  const ref = React.useRef();
  const refRotate = React.useRef();
  React.useEffect(() => {
    if (!ref.current) return;
    interact(ref?.current)
      .draggable({
        modifiers: [
          interact.modifiers.snap({
            targets: xAlignments.map((data) => ({ x: data, y: 100 })),
            range: 50,
          }),
        ],
        listeners: {
          start() {
            setIsDragging(true);
          },
          move(event) {
            position.x += event.dx;
            position.y += event.dy;
            event.target.style.transform = `translate(${position.x - 6}px, ${
              position.y - 6
            }px) rotate(${rotate}deg) `;
            if (selectedElementRef) {
              selectedElementRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${rotate}deg) `;
            }
          },
          end() {
            editSelectedElement({ pos: position });
            setIsDragging(false);
          },
        },
      })
      .resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
          start() {
            setIsDragging(true);
          },
          move(event) {
            const { width, height } = event.rect;
            position.x += event.deltaRect.left;
            position.y += event.deltaRect.top;
            const transform = {
              width: `${width}px`,
              height: `${height}px`,
              transform: `translate(${position.x}px, ${position.y}px)  rotate(${rotate}deg) `,
            };
            Object.assign(event.target.style, transform);
            if (selectedElementRef) {
              Object.assign(selectedElementRef.current.style, transform);
            }
          },
          end(event) {
            const { width, height } = event.rect;
            editSelectedElement({ size: { width, height } });
            setIsDragging(false);
          },
        },
      });
  }, [
    ref,
    refRotate,
    currentElement,
    currentElementProperties,
    position,
    selectedElementRef,
    xAlignments,
    yAlignments,
  ]);

  React.useEffect(() => {
    if (!refRotate.current) return;
    interact(refRotate?.current).draggable({
      listeners: {
        start(event) {
          const element = event.target;
          const rect = element.getBoundingClientRect();

          // store the center as the element has css `transform-origin: center center`
          element.dataset.centerX = rect.left + rect.width / 2;
          element.dataset.centerY = rect.top + rect.height / 2;
          // get the angle of the element when the drag starts
          element.dataset.angle = getDragAngle(event);
        },
        move(event) {
          const element = event.target;
          const center = {
            x: parseFloat(element.dataset.centerX) || 0,
            y: parseFloat(element.dataset.centerY) || 0,
          };

          const angle = getDragAngle(event);

          // update transform style on dragmove
          element.style.transform = 'rotate(' + angle + 'deg' + ')';
          const transform = `translate(${position.x}px, ${position.y}px) rotate(${angle}deg) `;
          event.target.style.transform = transform;
          if (selectedElementRef) {
            selectedElementRef.current.style.transform = transform;
          }
          if (ref.current) {
            ref.current.style.transform = transform;
          }
        },
        end(event) {
          const element = event.target;

          // save the angle on dragend
          const angle = getDragAngle(event);
          element.dataset.angle = angle;
          editSelectedElement({ rotate: angle });
        },
      },
    });
  }, [
    ref,
    refRotate,
    currentElement,
    currentElementProperties,
    position,
    selectedElementRef,
  ]);

  return (
    <>
      <div
        key={'hey'}
        ref={ref}
        className="border-2 border-white z-max rounded-xl border-dashed "
        style={{
          height: currentElement?.size.height + 12,
          width: currentElement?.size.width + 12,
          transform:
            `translate(${currentElement?.pos.x - 6}px, ${
              currentElement?.pos.y - 6
            }px)` + `rotate(${currentElement?.rotate}deg)`,
          position: 'absolute',
        }}
      ></div>
      <Toolbar />

      {/* <div
          ref={refRotate}
          className="border-2 border-red z-max_1 rounded-xl "
          style={{
            height: currentElement?.size.height + 24,
            width: currentElement?.size.width + 24,
            transform:
              `translate(${currentElement?.pos.x - 6}px, ${
                currentElement?.pos.y - 6
              }px)` + `rotate(${currentElement?.rotate}deg)`,
            position: 'absolute',
          }}
        ></div> */}
    </>
  );
}

function getDragAngle(event) {
  const element = event.target;
  const startAngle = parseFloat(element.dataset.angle) || 0;
  const center = {
    x: parseFloat(element.dataset.centerX) || 0,
    y: parseFloat(element.dataset.centerY) || 0,
  };
  const angle = Math.atan2(center.y - event.clientY, center.x - event.clientX);

  return (angle - startAngle) * (180 / Math.PI);
}
