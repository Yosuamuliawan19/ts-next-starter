import ResponsiveModal from '@components/Common/ResponsiveModal';
import React from 'react';
import { useAuth } from 'state/Auth';
import { Input, Space } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function AuthModal() {
  const { authModalVisible, setVisibleAuthModal } = useAuth();
  const [isRegister, setIsRegister] = React.useState(false);

  return (
    <ResponsiveModal
      title={isRegister ? '🗝️ Register' : '🗝️ Sign in'}
      visible={authModalVisible}
      setVisible={setVisibleAuthModal}
    >
      <AuthContent isRegister={isRegister} setIsRegister={setIsRegister} />
    </ResponsiveModal>
  );
}

export function AuthContent({ isRegister, setIsRegister }) {
  const { signInGoogle, signInEmail, signUpEmail } = useAuth();
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignInEmail = async () => {
    const success = isRegister
      ? await signUpEmail(username, password)
      : await signInEmail(username, password);
    if (!isRegister && success) router.push('/dashboard');
  };

  return (
    <div className="mb-8">
      {isRegister && (
        <div className="p-8 w-full rounded-xl border-2 border-gray-200 mb-4">
          <div className="text-xl">👋 Hey! Welcome to the club</div>
          <div>You can try up to 15 pages for free</div>
        </div>
      )}
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
      <div>
        <div className="flex flex-row items-center mb-6 justify-end">
          <div
            onClick={() => setIsRegister(!isRegister)}
            className="hover:underline cursor-pointer mr-4"
          >
            {isRegister ? 'Login' : 'Sign Up'} instead
          </div>
          <motion.button
            onClick={onSignInEmail}
            type="submit"
            whileHover={{ scale: 1.1, opacity: 0.85 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black text-white text-sm bold px-8 py-2 rounded-full  font-display  hover:opacity-80"
          >
            {isRegister ? ' Register' : ' Sign in'}
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
  );
}
