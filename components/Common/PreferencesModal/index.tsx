import ResponsiveModal from '@components/Common/ResponsiveModal';
import { Space, Switch } from '@douyinfe/semi-ui';
import React from 'react';
import { HiLightningBolt } from 'react-icons/hi';
import { useAuth } from 'state/Auth';
import { useUI } from 'state/UI';
import { MEMBERSHIP_STATUS } from 'types';
import { Descriptions } from '@douyinfe/semi-ui';
import { AiFillDelete } from 'react-icons/ai';

export default function AuthModal() {
  const {
    preferencesModalVisible,
    setVisiblePreferencesModal,
    openUpgradeModal,
  } = useUI();
  const { user } = useAuth();
  if (!user)
    return (
      <ResponsiveModal
        title={'Preferences'}
        visible={preferencesModalVisible}
        setVisible={setVisiblePreferencesModal}
      >
        Please login
      </ResponsiveModal>
    );
  const data = [
    { key: 'Email', value: user.email },
    { key: 'Email verification', value: user.isEmailVerified ? 'Yes' : 'No' },
    {
      key: 'Membership status',
      value: (
        <Space>
          <div> Current plan: {user.membership_status}</div>
          {user.membership_status === MEMBERSHIP_STATUS.FREE && (
            <div
              onClick={() => {
                setVisiblePreferencesModal(false);
                openUpgradeModal();
              }}
            >
              <Space className="rounded-full py-1 px-4 bg-yellow-100 text-yellow-500 text-sm flex cursor-pointer hover:scale-105">
                <HiLightningBolt /> Upgrade
              </Space>
            </div>
          )}
        </Space>
      ),
    },
    { key: 'Page Usage', value: '0/15 pages used' },
    { key: 'Blocks Usage', value: '0/7500 blocks used' },
    {
      key: 'Toolbar location',
      value: (
        <Space>
          <div>Left</div>
          <Switch defaultChecked={true}></Switch>
          <div>Bottom</div>
        </Space>
      ),
    },
  ];
  return (
    <ResponsiveModal
      title={'Preferences'}
      visible={preferencesModalVisible}
      setVisible={setVisiblePreferencesModal}
    >
      <div className="mb-8">
        <Descriptions data={data} />
        <Space
          vertical
          className="bg-red-100 rounded-xl p-4 w-full mt-4 "
          align="left"
        >
          <div className="bold text-black">Danger zone</div>
          <Space className="rounded-full px-4 py-1 bg-red-500 text-red-100 text-sm flex cursor-pointer hover:scale-105 w-fit-content">
            <AiFillDelete /> Delete account
          </Space>
        </Space>
      </div>
    </ResponsiveModal>
  );
}
