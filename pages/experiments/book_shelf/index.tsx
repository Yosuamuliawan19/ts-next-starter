import { BaseLayout, ContentLayout, Navbar } from '@components';
import Footer from '@components/Home/Footer';
import ProjectsSection from '@components/Home/TabView/ProjectsSection';
import Sidebar from '@components/Home/Sidebar';
import Head from 'next/head';
import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <Head>
        <title>QR Menu | Yosua Muliawan</title>
      </Head>

      <Navbar />
      <Sidebar />
      <BaseLayout>
        <ContentLayout>
          <h1>Editable Bookshelf</h1>
          <motion.div className=" p-4 rounded-lg bg-gray-100 mb-4 flex justify-between">
            <div>
              <a className="font-display bold mb-4">
                💻 Steps to publish your own menu
              </a>
              <div>1. Edit the menu in the editor below</div>
              <div>
                2. Click on the save button, this will automaticall update the
                menu in real time
              </div>
              <div>3. Share the link / Print the QR code</div>
            </div>

            <img
              className="object-cover h-36 w-36"
              src="https://res.cloudinary.com/yosuam19/image/upload/v1642924148/photo-1543002588-bfa74002ed7e_ixlib_rb-1.2.1_ixid_MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8_auto_format_fit_crop_w_687_q_80-20220123-154825_l1mjx5.png"
            />
          </motion.div>
          <div className="flex flex-col md:flex-row">
            <motion.div className="p-4 rounded-lg bg-gray-100  mb-4 w-1/2 ">
              <a className="font-display bold mb-4">💻 Edit</a>
              <div>1. Edit the menu in the editor below</div>
              <div>
                2. Click on the save button, this will automaticall update the
                menu in real time
              </div>
              <div>3. Share the link / Print the QR code</div>

              <div className="font-display">
                Represented Binus University's competitive programming team in:
              </div>
            </motion.div>

            <div className="px-2 hidden md:block"></div>
            <motion.div className="p-4  rounded-lg bg-gray-100  mb-4  w-1/2">
              <a className="font-display bold mb-4">💻 Preview</a>
              <div>1. Edit the menu in the editor below</div>
              <div>
                2. Click on the save button, this will automaticall update the
                menu in real time
              </div>
              <div>3. Share the link / Print the QR code</div>

              <div className="font-display">
                Represented Binus University's competitive programming team in:
              </div>
            </motion.div>
          </div>
          <motion.div className="grid grid-cols-1 p-4 rounded-lg bg-gray-100 mb-4">
            <a className="font-display bold mb-4">
              💻 Steps to publish your own menu
            </a>
            <div>1. Edit the menu in the editor below</div>
            <div>
              2. Click on the save button, this will automaticall update the
              menu in real time
            </div>
            <div>3. Share the link / Print the QR code</div>
          </motion.div>
          <h1>Example bookshelf</h1>
          <ProjectsSection />
        </ContentLayout>
        <Footer />
      </BaseLayout>
    </>
  );
}
