import { Space } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import React from 'react';
import { IoIosText } from 'react-icons/io';
export default function BottomBar() {
  return (
    <motion.div
      drag
      className="rounded-2xl fixed bottom-6 bg-white left-1/2 px-4 py-2"
    >
      <Space>
        <div>
          <IoIosText />
        </div>
        <div>
          <IoIosText />
        </div>
        <div>
          <IoIosText />
        </div>
        <div>a</div>
      </Space>
    </motion.div>
  );
}
