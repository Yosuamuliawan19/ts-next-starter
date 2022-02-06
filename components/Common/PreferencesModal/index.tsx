import ResponsiveModal from '@components/Common/ResponsiveModal';
import React from 'react';
import { Input, Space } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import { useUI } from 'state/UI';

export default function AuthModal() {
  const { preferencesModalVisible, setVisiblePreferencesModal } = useUI();
  const [isRegister, setIsRegister] = React.useState(false);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ResponsiveModal
      title={'Preferences'}
      visible={preferencesModalVisible}
      setVisible={setVisiblePreferencesModal}
    >
      <div className="mb-8">
        <div className="mb-4 bold ">
          <div className="mb-2">Email</div>
          <Input
            type="email"
            value={username}
            onChange={(val) => setUsername(val)}
            showClear
          />
        </div>
        <div className="mb-4 bold">
          <div className="mb-2">Password</div>
          <Input
            value={password}
            onChange={(val) => setPassword(val)}
            showClear
            mode="password"
          />
        </div>
        <div className="justify-end flex">
          <Space spacing={'loose'}>
            {isRegister ? (
              <div
                onClick={() => setIsRegister(false)}
                className="hover:underline cursor-pointer"
              >
                Login
              </div>
            ) : (
              <div
                onClick={() => setIsRegister(true)}
                className="hover:underline cursor-pointer"
              >
                Sign up instead
              </div>
            )}

            <motion.button
              // onClick={() => signIn()}
              whileHover={{ scale: 1.1, opacity: 0.85 }}
              whileTap={{ scale: 0.9 }}
              className="bg-black text-white text-sm bold px-8 py-2 rounded-full  font-display  hover:opacity-80"
            >
              Sign in
            </motion.button>
            <motion.button
              // onClick={() => signIn()}
              whileHover={{ scale: 1.1, opacity: 0.85 }}
              whileTap={{ scale: 0.9 }}
              className="bg-black text-white text-sm bold px-8 py-2 rounded-full  font-display hover:opacity-80"
            >
              <Space>
                <img
                  className="w-4 h-4"
                  src="https://res.cloudinary.com/yosuam19/image/upload/v1644068068/portfolio/2991148_cyby6c.png"
                />
                Sign in with Google
              </Space>
            </motion.button>
          </Space>
        </div>
      </div>
    </ResponsiveModal>
  );
}
