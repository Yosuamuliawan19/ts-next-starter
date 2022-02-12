import { usePageList } from '@api/';
import DarkToggle from '@components/Common/DarkToggle';
import PageSelect from '@components/Form/PageSelect';
import { Dropdown, Space } from '@douyinfe/semi-ui';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import {
  AiFillEdit,
  AiOutlineUnorderedList,
  AiOutlineExpandAlt,
  AiFillSave,
} from 'react-icons/ai';
import { HiLightningBolt } from 'react-icons/hi';
import { useAuth } from 'state/Auth';
import { usePage } from 'state/Page';
import { useUI } from 'state/UI';

export default function DashboardNav() {
  const { user } = useAuth();
  const {
    openPreferencesModal,
    openUpgradeModal,
    isPreviewMode,
    openPreviewMode,
    closePreviewMode,
    sideBarVisible,
    setVisibleSidebar,
  } = useUI();

  const savePage = usePage((state) => state.savePage);

  const { data } = usePageList();
  const pageList = data?.pages;

  const router = useRouter();

  const onSave = async () => {
    await savePage();
  };
  if (isPreviewMode) {
    return (
      <div
        onClick={() => closePreviewMode()}
        className="fixed top-2 left-2 bg-gray-100 z-max px-4 py-2 rounded-xl cursor-pointer"
      >
        <Space className="text-sm">
          <AiOutlineExpandAlt /> Continue editing
        </Space>
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-between">
        <Space>
          <div onClick={() => setVisibleSidebar(!sideBarVisible)}>
            <Space className="bg-gray-100 rounded-md px-2 py-1 bold">
              <AiOutlineUnorderedList />
            </Space>
          </div>

          <div onClick={onSave}>
            <Space className="rounded-md px-2 py-1 bg-gray-100 text-gray-500 text-sm flex cursor-pointer hover:scale-105">
              <AiFillSave /> Save
            </Space>
          </div>
          <div onClick={() => openPreviewMode()}>
            <AiOutlineExpandAlt />
          </div>
        </Space>
        <Space>
          <PageSelect onChange={(value) => router.push('/dashboard/' + value)}>
            <Space className="bg-gray-100 rounded-md px-2 py-1 text-sm">
              <AiOutlineUnorderedList />
              <div className="hidden md:block"> List</div>
            </Space>
          </PageSelect>

          <button onClick={() => router.push('/dashboard')}>
            <Space className="bg-gray-100 rounded-md px-2 py-1 text-sm">
              <AiFillEdit /> <div className="hidden md:block">Create</div>
            </Space>
          </button>
        </Space>
        <Space>
          <div onClick={() => openUpgradeModal()}>
            <Space className="rounded-full px-4 py-1 bg-yellow-100 text-yellow-500 text-sm flex cursor-pointer hover:scale-105">
              <HiLightningBolt /> <div className="hidden md:block">Upgrade</div>
            </Space>
          </div>
          <DarkToggle />
          <Dropdown
            position="bottomRight"
            clickToHide={true}
            trigger={'click'}
            menu={[
              { node: 'title', name: `${user?.email}` },
              { node: 'item', name: 'Dashboard' },
              { node: 'item', name: 'Explore' },
              { node: 'divider' },
              {
                node: 'item',
                name: 'Preferences',
                onClick: () => openPreferencesModal(),
              },
              { node: 'item', name: 'Sign Out', onClick: () => signOut() },
            ]}
          >
            <div className="rounded-full px-4 py-1 " style={{ color: 'white' }}>
              <div>
                <img src={user?.image} className="rounded-full h-8 w-8" />
              </div>
            </div>
          </Dropdown>
        </Space>
      </div>
    </>
  );
}
