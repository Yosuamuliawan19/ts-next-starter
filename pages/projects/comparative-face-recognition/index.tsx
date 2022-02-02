import { BaseLayout, ContentLayout, Navbar } from '@components';
import Footer from '@components/Home/Footer';
import Sidebar from '@components/Home/Sidebar';
import Head from 'next/head';
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { motion } from 'framer-motion';
import { IoIosDocument } from 'react-icons/io';

const content = `

## A Comparative Study Of Generalized Feature Extraction Techniques For Face Recognition

Submitted as part of Final Project to Computer Vision Class at University of Nottingham

`;

export default function Home({ source }) {
  return (
    <>
      <Head>
        <title>
          Feature Extraction Techniques For Face Recognition | Yosua Muliawan
        </title>
      </Head>
      <Navbar />
      <Sidebar />
      <BaseLayout>
        <ContentLayout>
          <div className=" min-h-screen font-display">
            <div className="flex md:flex-row flex-col mb-8">
              <img
                src="https://res.cloudinary.com/yosuam19/image/upload/v1643801305/portfolio/comparative-face-recognition_wrwhlp.png"
                className="w-full md:w-64 h-68 mr-8 mt-4 rounded-lg bg-gray-200 object-cover border-2 border-gray-100"
              ></img>
              <div>
                <div className="mdContent">
                  <MDXRemote {...source} />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, opacity: 0.85 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-blue-100 text-blue-500 hover:opacity-80 font-display bold flex items-center text-sm w-max py-3 px-8 mt-2 rounded-lg"
                  onClick={() => {
                    window.open(
                      'https://drive.google.com/file/d/1mRYdY4Lixei77X8hzPUc3EQ_sF7t8DbI/view',
                      '_blank'
                    );
                  }}
                >
                  <IoIosDocument className=" fill-blue-100 mr-2" />
                  Read paper
                </motion.button>
              </div>
            </div>
          </div>
        </ContentLayout>
        <Footer />
      </BaseLayout>
    </>
  );
}
export async function getStaticProps() {
  return { props: { source: await serialize(content) } };
}
