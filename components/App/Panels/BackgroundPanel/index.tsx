import { GRADIENT_OPTIONS, IMAGE_OPTIONS } from '@constants';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import { usePage } from 'state/Page';
import { HexColorPicker } from 'react-colorful';
import React from 'react';
import styles from './index.module.css';

function isHexValid(hex: string) {
  return /^#[0-9A-F]{6}$/i.test(hex);
}
export default function BackgroundPanel() {
  const { background, setBackground } = usePage();
  const [color, setColor] = React.useState('#aabbcc');

  const onChangeColorPicker = (color: string) => {
    if (isHexValid(color)) {
      setBackground(color);
    }
  };
  React.useEffect(() => {
    if (isHexValid(color)) {
      setColor(color);
    }
  }, [background]);

  return (
    <div className="w-80 border-2 border-gray-100 rounded-lg mb-4 ">
      <Tabs type="line">
        <TabPane tab="Color" itemKey="1" className="px-2 h-60">
          <div className={styles.colorPicker}>
            <HexColorPicker
              color={color}
              onChange={onChangeColorPicker}
              className={styles.colorPicker}
            />
          </div>
        </TabPane>
        <TabPane tab="Gradient" itemKey="2" className="px-2 ">
          <div className="flex flex-wrap overflow-y-scroll h-60">
            {GRADIENT_OPTIONS.map((data) => {
              return (
                <div
                  onClick={() => setBackground(data)}
                  style={{ background: data }}
                  className={
                    'w-1/3 h-20 cursor-pointer' +
                    (background === data
                      ? 'border-white border-2 rounded-md'
                      : 'bg-gray-200')
                  }
                ></div>
              );
            })}
          </div>
        </TabPane>
        <TabPane tab="Image" itemKey="3" className="px-2 ">
          <div className="flex flex-wrap  overflow-y-scroll h-60">
            {IMAGE_OPTIONS.map((data) => {
              return (
                <div
                  onClick={() => setBackground(data)}
                  style={{ background: data, backgroundSize: 'cover' }}
                  className={
                    'w-1/3 h-20 cursor-pointer' +
                    (background === data
                      ? 'border-white border-2 rounded-md'
                      : 'bg-gray-200')
                  }
                ></div>
              );
            })}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
