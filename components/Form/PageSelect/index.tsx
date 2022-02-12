import { usePageList } from '@api/';
import { Dropdown } from '@douyinfe/semi-ui';
import React from 'react';

interface Props {
  children: JSX.Element;
  position?: string;
  onChange: (page: string) => void;
}
export default function PageSelect({
  children,
  onChange,
  position = 'bottomRight',
}: Props) {
  const { data } = usePageList();
  const pageList = data?.pages;
  return (
    <Dropdown
      className="fit-content overflow-scroll"
      style={{ maxHeight: '80vh' }}
      position={position}
      clickToHide={true}
      trigger={'hover'}
      render={
        <Dropdown.Menu>
          {pageList?.map((data) => {
            return (
              <Dropdown.Item
                onClick={() => {
                  onChange && onChange(data.url);
                }}
                icon={
                  <div
                    className="h-4 w-4 rounded-sm border-gray-100"
                    style={{
                      background: data.background,
                      borderWidth: 0.5,
                    }}
                  ></div>
                }
              >
                /{data.url}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      }
    >
      <div>{children}</div>
    </Dropdown>
  );
}
