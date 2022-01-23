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
          <div className="flex flex-row justify-between">
            <h1>Create a QR menu for free</h1>
            <motion.div
              whileHover={{ scale: 1.1, opacity: 0.85 }}
              whileTap={{ scale: 0.9 }}
              className="bg-green-100 text-green-500  font-display bold  items-center text-sm   rounded-full p-2 h-8"
            >
              100 menus created so far
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
          <h1>Example menus</h1>
          <ProjectsSection />
        </ContentLayout>
        <Footer />
      </BaseLayout>
    </>
  );
}
