import ComponentTree from '@components/App/ComponentTree';
import Page from '@components/App/Page';
import BottomBar from '@components/App/Panels/BottomBar';
import PreferencesModal from '@components/Common/PreferencesModal';

import { TEXT_TEMPLATE_OPTIONS } from '@constants/templates/text';
import { IconSearch } from '@douyinfe/semi-icons';
import { Input } from '@douyinfe/semi-ui';
import React from 'react';
import { usePage } from 'state/Page';
import FloatingPanel from '../Panels/FloatingPanel';
import DashboardNav from './DashboardNav';

function Content() {
  const { addElement } = usePage((state) => ({
    addElement: state.addElement,
  }));
  return (
    <div className="flex px-2 py-2">
      <BottomBar />
      <div className="p-2">
        <div className="w-80 border-2 border-gray-100 rounded-lg mb-4 p-2">
          a b c
        </div>

        <FloatingPanel />
        <div className="w-80 border-2 border-gray-100 rounded-lg p-2 mb-4">
          {TEXT_TEMPLATE_OPTIONS.map((data) => {
            return (
              <div
                className="px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => addElement(data.value)}
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

        <div className="w-80 border-2 border-gray-100 rounded-lg ">
          <ComponentTree />
        </div>
      </div>
      <div className="w-full">
        <Page />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <>
      <PreferencesModal />
      <DashboardNav />
      <Content />
    </>
  );
}
