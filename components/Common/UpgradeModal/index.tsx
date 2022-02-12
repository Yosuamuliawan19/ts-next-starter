import ResponsiveModal from '@components/Common/ResponsiveModal';
import React from 'react';
import { Space } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import { useUI } from 'state/UI';
import { HiLightningBolt } from 'react-icons/hi';
import { STRIPE_PAYMENT_LINK } from '@constants/payment';
const REASONS = [
  {
    title: 'Up to 15 pages',
    description: 'Create up to 15 pages, increasing default limit by x3',
    icon: <HiLightningBolt />,
    color: 'green-500',
  },
  {
    title: 'Extended blocks amount',
    description: 'Up to 15o blocks per page',
    icon: <HiLightningBolt />,
    color: 'yellow-500',
  },
  {
    title: 'Up to 500MB of image storage',
    description: 'Extended amount of storage to host you content',
    icon: <HiLightningBolt />,
    color: 'yellow-500',
  },
  {
    title: 'Support indie creator',
    description:
      'You will be supporting this project cost, allowing us to bring more awesome features',
    icon: <HiLightningBolt />,
    color: 'yellow-500',
  },
];
export default function AuthModal() {
  const { upgradeModalVisible, setVisibleUpgradeModal } = useUI();
  const [awaitingPayment, setAwaitingPayment] = React.useState(false);

  return (
    <ResponsiveModal
      title={'Upgrade'}
      visible={upgradeModalVisible}
      setVisible={setVisibleUpgradeModal}
    >
      <div className="mb-8 text-black">
        {!awaitingPayment ? (
          <div>
            <Space className="flex justify-center items-center mb-4">
              <div className="bold text-xl">$4.99/month</div>
              <motion.button
                onClick={() => {
                  setAwaitingPayment(true);
                  window.open(STRIPE_PAYMENT_LINK, '_blank');
                }}
                whileHover={{ scale: 1.1, opacity: 0.85 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black text-white text-sm bold px-8 py-2 rounded-full  font-display hover:opacity-80"
              >
                <Space>
                  <HiLightningBolt className="w-4 h-4" />
                  Upgrade
                </Space>
              </motion.button>
            </Space>
            <div className="grid grid-cols-2 gap-4">
              {REASONS.map((data) => {
                return (
                  <div
                    className={`w-full rounded-xl border-2 p-4  border-${data.color}`}
                  >
                    <Space vertical align="start">
                      <div
                        className={`rounded-full h-16 w-16 bg-yellow-200 color-white flex justify-center items-center text-2xl text-white`}
                      >
                        {data.icon}
                      </div>
                      <div className={`bold text-md `}>{data.title}</div>
                      <div className={`text-md `}>{data.description}</div>
                    </Space>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </ResponsiveModal>
  );
}
