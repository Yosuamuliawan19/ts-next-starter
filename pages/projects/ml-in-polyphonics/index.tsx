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

## Investigating Machine Learning Approaches for Predominant Musical Instrument Recognition in Polyphonic Music

First author - submitted to 2020 Joint Conference on AI Music Creativity



`;

export default function Home({ source }) {
  return (
    <>
      <Head>
        <title>ML in Polyphonic Music | Yosua Muliawan</title>
      </Head>
      <Navbar />
      <Sidebar />
      <BaseLayout>
        <ContentLayout>
          <div className=" min-h-screen font-display">
            <MDXRemote {...source} />
            <motion.button
              whileHover={{ scale: 1.1, opacity: 0.85 }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-100 text-blue-500 hover:opacity-80 font-display bold flex items-center text-sm w-max py-3 px-8 mt-2 rounded-lg"
              onClick={() => {
                window.open(
                  'https://github.com/Yosuamuliawan19/csmc_mume_polyphonic_instrument_classification/blob/master/MUME_2020___Submission.pdf',
                  '_blank'
                );
              }}
            >
              <IoIosDocument className=" fill-blue-100 mr-2" />
              Read paper
            </motion.button>
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
