import {
  FONT_FAMILY_OPTIONS,
  FONT_SIZE_OPTIONS,
  TEXT_ALIGNMENT_OPTIONS,
} from '@constants';
import { Select, Space } from '@douyinfe/semi-ui';
import { showSuccessMsg } from '@helpers/feedback';
import { motion, useSpring } from 'framer-motion';
import React from 'react';
import { CgPathBack, CgPathFront } from 'react-icons/cg';
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { ImBin2 } from 'react-icons/im';
import { MdContentCopy } from 'react-icons/md';
import { usePage } from 'state/Page';
import { ITextElement } from 'types';

function TextAlignmentButton({ value }: { value: string }) {
  const [alignment, setAlignment] = React.useState(value);

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
        if (alignment === data.key) {
          return <div onClick={() => setAlignment(data.next)}>{data.icon}</div>;
        }
      })}
    </div>
  );
}

export default function BackgroundPanel() {
  const currentElement = usePage(
    (state) => state.getSelectedElement
  )() as ITextElement;

  const { editSelectedElement, deleteSelectedElement, addElement } = usePage(
    (state) => ({
      editSelectedElement: state.editSelectedElement,
      deleteSelectedElement: state.deleteSelectedElement,
      addElement: state.addElement,
    })
  );

  const x = useSpring(10, { stiffness: 300, damping: 30 });
  const y = useSpring(100, { stiffness: 300, damping: 30 });

  React.useEffect(() => {
    if (!currentElement) return;
    x.set(currentElement.pos.x);
    y.set(currentElement.pos.y);
  }, [currentElement]);

  if (!currentElement) return null;

  return (
    <motion.div style={{ x, y }}>
      <Space className="w-min border-2 border-gray-100 rounded-lg mb-4 p-2 flex bg-white">
        <CgPathFront />
        <CgPathBack />
        <FiLink />
        <Select
          optionList={FONT_SIZE_OPTIONS}
          value={currentElement.fontSize}
          onChange={(value) => {
            editSelectedElement({ fontSize: value });
          }}
        />
        <Select
          optionList={FONT_FAMILY_OPTIONS}
          value={currentElement.fontFamily}
          onChange={(value) => {
            editSelectedElement({ fontFamily: value });
          }}
        />
        <TextAlignmentButton value={currentElement.textAlign} />
        <MdContentCopy
          onClick={() => {
            showSuccessMsg('Duplicated Element');
            addElement({
              ...currentElement,
              key: Math.random().toString(36).substr(2, 9),
            });
          }}
        />
        <ImBin2 onClick={() => deleteSelectedElement()} />
      </Space>
    </motion.div>
  );
}
