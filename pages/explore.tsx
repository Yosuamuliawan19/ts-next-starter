import Navbar from '@components/Common/Navbar';
import ContentLayout from '@components/Layout/ContentLayout';
import BaseLayout from '@components/Layout/ContentLayout';
import Footer from '@components/Common/Footer';
import Sidebar from '@components/Common/Sidebar';
import { motion } from 'framer-motion';
import Head from 'next/head';
import React from 'react';
import { Space } from '@douyinfe/semi-ui';
import { AiOutlineCheck } from 'react-icons/ai';
import { useAuth } from 'state/Auth';

export default function Pricing() {
  const { openAuthModal } = useAuth();

  return (
    <>
      <Head>
        <title>Home | Yosua Muliawan</title>
      </Head>
      <Navbar />
      <Sidebar />
      <BaseLayout>
        {/* <HeroSection /> */}
        <ContentLayout>
          <div className="mb-8">
            <Space
              align="start"
              spacing="loose"
              className="flex flex-col md:flex-row"
            >
              <img
                className="w-80"
                src="https://res.cloudinary.com/yosuam19/image/upload/v1643992207/portfolio/pricing_hk0wod.png"
              />
              <Space
                align="start"
                spacing="loose"
                className="flex flex-col md:flex-row mt-0 md:mt-16 w-full"
              >
                <div className="border-2 border-gray-100 rounded-lg p-4 w-full">
                  <div className="text-2xl">Free</div>
                  <div className="text-xl bold">$0 free forever</div>

                  <div className="border-t-2 border-gray-100 my-4"></div>

                  <div className="flex items-center ">
                    <AiOutlineCheck className="mr-2" />
                    Up to 15 pages free
                  </div>
                  <div className="border-t-2 border-gray-100 my-4"></div>
                  <motion.button
                    onClick={openAuthModal}
                    whileHover={{ scale: 1.1, opacity: 0.85 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-black text-white text-sm bold px-8 py-2 rounded-full  font-display mr-2  my-2 hover:opacity-80"
                  >
                    Get started
                  </motion.button>
                </div>
                <div className="border-2 border-gray-100  rounded-lg  p-4 w-full">
                  <div className="text-2xl">Pro</div>
                  <div className="text-xl bold">$5 /mo</div>

                  <div className="border-t-2 border-gray-100 my-4"></div>
                  <div className="flex items-center ">
                    <AiOutlineCheck className="mr-2" />
                    Up to 50 pages
                  </div>
                  <div className="border-t-2 border-gray-100 my-4"></div>

                  <motion.button
                    onClick={openAuthModal}
                    whileHover={{ scale: 1.1, opacity: 0.85 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-black text-white text-sm bold px-8 py-2 rounded-full  font-display mr-2  my-2 hover:opacity-80"
                  >
                    Select
                  </motion.button>
                </div>
                <div className="border-2 border-gray-100  rounded-lg  p-4 w-full">
                  <div className="text-2xl">Enterprise</div>

                  <div className="border-t-2 border-gray-100 my-4"></div>

                  <div className="flex items-center ">
                    <AiOutlineCheck className="mr-2" />
                    More than 50 pages
                  </div>
                  <div className="border-t-2 border-gray-100 my-4"></div>

                  <motion.button
                    onClick={openAuthModal}
                    whileHover={{ scale: 1.1, opacity: 0.85 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-black text-white text-sm bold px-8 py-2 rounded-full  font-display mr-2  my-2 hover:opacity-80"
                  >
                    Contact us
                  </motion.button>
                </div>
              </Space>
            </Space>
          </div>
        </ContentLayout>
        <Footer />
      </BaseLayout>
    </>
  );
}
