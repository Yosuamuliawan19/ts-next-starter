import React from 'react';
import ContentLayout from '@components/Layout/ContentLayout';
import styles from './index.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Dropdown, Space } from '@douyinfe/semi-ui';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAuth, USER_STATUS } from 'state/Auth';
import DarkToggle from '../DarkToggle';
import { useRouter } from 'next/router';

export default function ExperienceSection() {
  const { user, userStatus, isLogined, openAuthModal } = useAuth();
  const router = useRouter();
  return (
    <div className="sticky top-0 shadow-sm z-max">
      <ContentLayout>
        <div
          className={
            styles.navbar +
            ' py-4 flex bg-white w-full justify-between items-center'
          }
        >
          <Link href="/">
            <div className="bold font-display hover:underline  hover:cursor-pointer">
              Page Platypus
            </div>
          </Link>
          <div className="flex items-center">
            <Link href="/explore">
              <div className="ml-6 font-display hover:underline hover:cursor-pointer hidden md:block">
                Examples
              </div>
            </Link>
            <Link href="/pricing">
              <div className="ml-6 font-display hover:underline hover:cursor-pointer hidden md:block">
                Pricing
              </div>
            </Link>
            {/* <Link href="/blog">
              <div className="mx-6 font-display hover:underline  hover:cursor-pointer hidden md:block">
                Blog
              </div>
            </Link> */}
          </div>
          <div className="flex md:hidden">
            <Dropdown
              position="bottomRight"
              clickToHide={true}
              trigger={'click'}
              menu={[
                {
                  node: 'item',
                  name: 'Examples',
                  onClick: () => router.push('/explore'),
                },
                {
                  node: 'item',
                  name: 'Pricing',
                  onClick: () => router.push('/pricing'),
                },
                {
                  node: 'item',
                  name: 'Blog',
                  onClick: () => router.push('/blog'),
                },

                { node: 'divider' },
                { node: 'item', name: 'Login', onClick: () => openAuthModal() },
                {
                  node: 'item',
                  name: 'Sign up',
                  onClick: () => openAuthModal(),
                },
              ]}
            >
              <div
                className="bg-black rounded-full px-4 py-2"
                style={{ color: 'white' }}
              >
                <GiHamburgerMenu />
              </div>
            </Dropdown>
          </div>
          <Space spacing={'medium'} align="center" className="hidden md:block">
            <DarkToggle />

            {userStatus !== USER_STATUS.AUTHENTICATED ? (
              <>
                <motion.button
                  onClick={openAuthModal}
                  whileHover={{ scale: 1.1, opacity: 0.85 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-black text-white text-sm bold px-8 py-2 rounded-full  font-display mr-2  my-2 hover:opacity-80"
                >
                  Sign up
                </motion.button>
                <motion.button
                  onClick={openAuthModal}
                  whileHover={{ scale: 1.1, opacity: 0.85 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-none text-black hover:bg-gray-50 text-sm bold px-8 py-2 rounded-full  font-display mr-2  my-2 hover:opacity-80"
                >
                  Sign in
                </motion.button>
              </>
            ) : (
              <div>
                <div>{user?.name}</div>
                <img src="" />
              </div>
            )}
          </Space>
        </div>
      </ContentLayout>
    </div>
  );
}
