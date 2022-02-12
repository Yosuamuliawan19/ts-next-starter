import ContentLayout from '@components/Layout/ContentLayout';
import { Collapse, Space } from '@douyinfe/semi-ui';
import { motion } from 'framer-motion';
import React from 'react';
import { useAuth } from 'state/Auth';
import { ExamplesSection } from '../ExamplesSection';

export function HeroSection() {
  const { openAuthModal } = useAuth();

  return (
    <ContentLayout>
      <div className="relative overflow-hidden">
        <div className="flex md:flex-row justify-between flex-col-reverse md:mb-0 mb-8  relative z-0">
          <div className="z-1 flex justify-center items-center flex-col w-full  relative z-10  ">
            <div className="text-4xl bold font-display mt-16 md:mt-16">
              Easiest way to make
            </div>
            <div className="text-4xl bold font-display mt-4">
              your internet homepage
            </div>
            <div className="text-2xl font-display mt-4 mb-4 flex">
              Make tiny websites you'll love ❤️
            </div>
            <Space spacing={'medium'}>
              <motion.button
                whileHover={{ scale: 1.1, opacity: 0.85 }}
                whileTap={{ scale: 0.9 }}
                onClick={openAuthModal}
                className="bg-black text-white text-sm bold px-8 py-2 rounded-full  font-display mr-2  my-2 hover:opacity-80"
              >
                Try it out
              </motion.button>
              {/* <motion.button
                whileHover={{ scale: 1.1, opacity: 0.85 }}
                whileTap={{ scale: 0.9 }}
                onClick={openAuthModal}
                className="bg-none text-black hover:bg-gray-100 text-sm bold px-8 py-2 rounded-full  font-display mr-2  my-2 hover:opacity-80"
              >
                Sign in
              </motion.button> */}
            </Space>
          </div>
          <div className="absolute right-0 top-0 block z-1 ">
            <img
              style={{ width: '400px' }}
              src={
                'https://res.cloudinary.com/yosuam19/image/upload/v1644651143/polaroid/Shape-1_aeujyr.png'
              }
            />
          </div>
          <div className=" absolute left-0 top-0 block  z-0  ">
            <img
              style={{ width: '400px' }}
              src={
                'https://res.cloudinary.com/yosuam19/image/upload/v1644651144/polaroid/Shape_t6wzyi.png'
              }
            />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col mt-16">
          <div className="text-2xl mb-4  relative z-1 bold ">Features</div>
          <div className="flex flex-col md:flex-row mb-16  relative z-1">
            {[
              {
                title: 'Delightful to use 🌎',
                text: 'Easy to use, for painting the interwebs  ',
              },

              {
                title: 'Zero config 💯',
                text: 'Create your page, publish. Thats it!',
              },
              {
                title: 'Be creative! 🎨',
                text: 'Not for conventional sites, date to be unique ',
              },
              {
                title: 'Connect links and pages 🔗',
                text: 'Create your own links, and interconnect them to make a site ',
              },
            ].map((data) => {
              return (
                <div className="border-gray-500 border-2 rounded-lg p-4  mr-8 mb-4 bg-white">
                  <motion.div
                    whileHover={{ scale: 1.1, opacity: 0.85 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-lg text-xl w-full md:w-40  mr-8 mb-4 bold mt-4 "
                  >
                    {data.title}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, opacity: 0.85 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-lg text-md w-full md:w-40 mb-4  "
                  >
                    {data.text}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <ExamplesSection />
        {/* <div className="text-2xl mb-4">About</div>

        <div className="text-white bg-blue-600 rounded-xl p-16 w-full h-20">
          <div>Made by and indie developer</div>
        </div> */}
        <div className="text-2xl mb-4">Frequently asked questions</div>
        <div className="text-xl">
          <Collapse>
            <Collapse.Panel
              header="How many pages can I create?"
              ItemKey="1"
              className="text-xl"
            >
              <p>
                For the free version, you can create up to 15 pages. In the
                automate tier, you can create up to 50 pages. Contact us further
                if you wish to create more pages, we would be more than happy to
                help
              </p>
            </Collapse.Panel>
            <Collapse.Panel header="This is panel header 2" itemKey="2">
              <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
            </Collapse.Panel>
            <Collapse.Panel header="This is panel header 3" itemKey="3">
              <p>Hi, bytedance dance dance. This is the docsite of Semi UI. </p>
            </Collapse.Panel>
          </Collapse>
        </div>

        <div className="flex flex-col items-center w-full my-12">
          <div className=" text-4xl font-display mt-4">Easiest way to make</div>
          <div className=" text-4xl font-display mt-4">
            your internet homepage
          </div>
          <div className="text-2xl font-display mt-4 mb-4 flex">
            No-code, easy-to-use, and free
          </div>

          <motion.button
            onClick={openAuthModal}
            whileHover={{ scale: 1.1, opacity: 0.85 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black text-white text-sm bold px-8 py-2 rounded-full  font-display mr-2  my-2 hover:opacity-80 w-fit-content"
          >
            Get started, its free !
          </motion.button>
        </div>
      </div>
    </ContentLayout>
  );
}
