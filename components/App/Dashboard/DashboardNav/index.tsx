import DarkToggle from '@components/Common/DarkToggle';
import { STRIPE_PAYMENT_LINK } from '@constants/payment';
import { Dropdown, Space } from '@douyinfe/semi-ui';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillEdit, AiOutlineUnorderedList } from 'react-icons/ai';
import { HiLightningBolt } from 'react-icons/hi';
import { useAuth } from 'state/Auth';
import { useUI } from 'state/UI';

export default function Dashboard() {
  const { user } = useAuth();
  const { openPreferencesModal } = useUI();
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between">
        <Space>
          <Space className="bg-gray-100 rounded-md px-2 py-1 bold">
            <AiOutlineUnorderedList />
          </Space>
        </Space>
        <Space>
          <button onClick={() => router.push('/dashboard/list')}>
            <Space className="bg-gray-100 rounded-md px-2 py-1 bold">
              <AiOutlineUnorderedList />
              List
            </Space>
          </button>
          <button onClick={() => router.push('/dashboard')}>
            <Space className="bg-gray-100 rounded-md px-2 py-1">
              <AiFillEdit /> Create
            </Space>
          </button>
        </Space>
        <Space>
          <div onClick={() => router.push(STRIPE_PAYMENT_LINK)}>
            <Space className="rounded-full px-4 py-1 bg-yellow-100 text-yellow-500 text-sm flex cursor-pointer hover:scale-105">
              <HiLightningBolt /> Upgrade
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
