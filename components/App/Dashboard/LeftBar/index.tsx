import ComponentTree from '@components/App/ComponentTree';
import BackgroundPanel from '@components/App/Panels/BackgroundPanel';
import BottomBar from '@components/App/Panels/BottomBar';

import { TEXT_TEMPLATE_OPTIONS } from '@constants/templates/text';
import { IconSearch } from '@douyinfe/semi-icons';
import { Input, Space, TabPane, Tabs } from '@douyinfe/semi-ui';
import { showSuccessMsg } from '@helpers/feedback';
import React from 'react';
import { AiFillCopy } from 'react-icons/ai';
import { usePage } from 'state/Page';
import { useUI } from 'state/UI';
import { FaShapes } from 'react-icons/fa';
export default function Content() {
  const {
    openPreferencesModal,
    openUpgradeModal,
    isPreviewMode,
    sideBarVisible,
    openPreviewMode,
    openSideBar,
    closeSidebar,
  } = useUI();
  const { addElement, url } = usePage((state) => ({
    addElement: state.addElement,
    url: state.url,
  }));

  const internalTracking = usePage((state) => ({
    maxZIndex: state.maxZIndex,
    minZIndex: state.minZIndex,
    pageHeight: state.pageHeight,
    xAlignments: state.xAlignments,
    yAlignments: state.yAlignments,
  }));
  const [pageUrl, setPageUrl] = React.useState(url);

  React.useEffect(() => {
    setPageUrl(url);
  }, [url]);
  if (isPreviewMode) return null;
  if (!sideBarVisible) return null;

  return (
    <>
      <Tabs type="button">
        <TabPane
          tab={
            <Space>
              <AiFillCopy /> Page
            </Space>
          }
          itemKey="1"
          className="overflow-scroll max-h-screen"
        >
          <Input
            placeholder={'Name of page'}
            type="text"
            suffix={<IconSearch />}
            value={pageUrl}
            onChange={(val) => setPageUrl(val)}
            showClear
          />
          <div className="border-2 p-4 border-gray-200 rounded-lg text-sm">
            <div>maxZIndex: {internalTracking.maxZIndex}</div>
            <div>minZIndex:{internalTracking.minZIndex}</div>
            <div>pageHeight:{internalTracking.pageHeight}</div>
            {/* <div>xAlignments  :{internalTracking.xAlignments}</div> */}
          </div>
          {/* <div className="w-80 border-2 border-gray-100 rounded-lg mb-4 p-2"></div> */}
          <BackgroundPanel />
          {/* <div className="w-80 border-2 border-gray-100 rounded-lg "> */}
          <ComponentTree />
          {/* </div> */}
        </TabPane>
        <TabPane
          tab={
            <Space>
              <FaShapes /> Elements
            </Space>
          }
          itemKey="2"
          className="overflow-scroll max-h-screen"
        >
          <div className="p-2">
            <div className="w-80 border-2 border-gray-100 rounded-lg  mb-4">
              {TEXT_TEMPLATE_OPTIONS.map((data) => {
                return (
                  <div
                    className="px-2 py-1  text-sm rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      showSuccessMsg('Element added');
                      addElement(data.value);
                    }}
                  >
                    {data.key}
                  </div>
                );
              })}
            </div>
            <div className="w-80 border-2 border-gray-100 rounded-lg p-2">
              <div>Youtube</div>
              <Input
                placeholder={'Paste youtube link here'}
                type="text"
                suffix={<IconSearch />}
                // value={username}
                // onChange={(val) => setUsername(val)}
                showClear
              />
            </div>
            <div className="w-80 border-2 border-gray-100 rounded-lg p-2">
              <Input
                placeholder={'Search giphy'}
                type="text"
                suffix={<IconSearch />}
                // value={username}
                // onChange={(val) => setUsername(val)}
                showClear
              />
            </div>
          </div>
        </TabPane>
      </Tabs>
      <BottomBar />
    </>
  );
}
