import ResponsiveModal from '@components/Common/ResponsiveModal';
import React from 'react';
import { useAuth } from 'state/Auth';
import { Input, Space } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';

export default function AuthModal() {
  const { authModalVisible, setVisibleAuthModal } = useAuth();
  const [isRegister, setIsRegister] = React.useState(false);

  return (
    <ResponsiveModal
      title={isRegister ? 'Register' : 'Sign in'}
      visible={authModalVisible}
      setVisible={setVisibleAuthModal}
    >
      <AuthContent isRegister={isRegister} setIsRegister={setIsRegister} />
    </ResponsiveModal>
  );
}

export function AuthContent({ isRegister, setIsRegister }) {
  const { signInGoogle, signInEmail, signUpEmail } = useAuth();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
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
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-row items-center mb-6 justify-end">
            <div
              onClick={() => setIsRegister(!isRegister)}
              className="hover:underline cursor-pointer mr-4"
            >
              {isRegister ? 'Login' : 'Sign Up'} instead
            </div>
            <motion.button
              onClick={() =>
                isRegister
                  ? signUpEmail(username, password)
                  : signInEmail(username, password)
              }
              type="submit"
              whileHover={{ scale: 1.1, opacity: 0.85 }}
              whileTap={{ scale: 0.9 }}
              className="bg-black text-white text-sm bold px-8 py-2 rounded-full  font-display  hover:opacity-80"
            >
              {isRegister ? 'Register' : 'Sign in'}
            </motion.button>
          </div>
          <motion.button
            onClick={() => signInGoogle()}
            whileHover={{ scale: 1.1, opacity: 0.85 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black text-white text-sm bold px-8 py-2 rounded-full  font-display hover:opacity-80 w-full"
          >
            <Space>
              <img
                className="w-4 h-4"
                src="https://res.cloudinary.com/yosuam19/image/upload/v1644068068/portfolio/2991148_cyby6c.png"
              />
              Sign in with Google
            </Space>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
