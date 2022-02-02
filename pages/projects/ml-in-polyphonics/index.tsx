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

First author - submitted to [2020 Joint Conference on AI Music Creativity](https://easychair.org/cfp/csmc-mume-2020)

This paper is produced based on the work that I have done with [Dr Jeremie Clos](http://www.cs.nott.ac.uk/~pszjc1/) during my undergraduate dissertation.

### Background
We were trying to predict the predominant music in a mixture of polyphonic music. Techniques employed in this research are:
- Background Seperation
- Feature Extraction using MFCC, and various other audio features
- Hyperparameter selection and comparison of different machine learning models

### Findings
- The MFCC features gives the best perfomance, accross the models. This is consistent in the literature.
- Features from the spectral domain is nessecary to produce best performing models, in addition to cepstral features.
- The random forest architecture achieves best out of the three classical ML models (SVM, Random Forest, and Neural Network).

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
            <div className="flex md:flex-row flex-col mb-8">
              <img
                src="https://res.cloudinary.com/yosuam19/image/upload/v1643800762/portfolio/ml-in-poly_typn7j.png"
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
                      'https://github.com/Yosuamuliawan19/csmc_mume_polyphonic_instrument_classification/blob/master/MUME_2020___Submission.pdf',
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
