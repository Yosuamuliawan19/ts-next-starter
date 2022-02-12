import Page from '@components/App/Page';
import PreferencesModal from '@components/Common/PreferencesModal';
import UpgradeModal from '@components/Common/UpgradeModal';

import React from 'react';
import BottomBar from '../Panels/BottomBar';
import DashboardNav from './DashboardNav';
import LeftBar from './LeftBar';

export default function Dashboard() {
  return (
    <>
      <PreferencesModal />
      <UpgradeModal />
      <DashboardNav />
      <div className="flex">
        <div className="relative z-2">
          <LeftBar />
        </div>
        <div className="w-full relative z-0">
          <Page />
        </div>
        <div className="relative z-1">
          <BottomBar />
        </div>
      </div>
    </>
  );
}
