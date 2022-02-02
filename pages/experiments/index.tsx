import { BaseLayout, ContentLayout, Navbar } from '@components';
import Footer from '@components/Home/Footer';
import Sidebar from '@components/Home/Sidebar';
import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import SwipeCard from '@components/Home/WebWidgets/SwipeCard';
import Spotify from '@components/Home/WebWidgets/Spotify';
import { motion } from 'framer-motion';

const experiments = [
  {
    title: 'QR Menu',
    link: '/experiments/qr_menu',
  },
  {
    title: 'Bookshelf',
    link: '/experiments/bookshelf',
  },
];
export default function Home() {
  return (
    <>
      <Head>
        <title>Experiments | Yosua Muliawan</title>
      </Head>

      <Navbar />
      <Sidebar />
      <BaseLayout>
        <ContentLayout>
          <div className=" min-h-screen font-display">
            <div className="font-display pt-4">
              Experiments are mini-projects of fun/useful ideas that I think
              would be cool to do.
            </div>
            <div className="grid gap-4 col-span-2">
              <Spotify />
              <SwipeCard />
            </div>

            <h2>Fun things</h2>
            <div className="flex">
              {experiments.map((data) => {
                return (
                  <Link href={data.link}>
                    <motion.div
                      whileHover={{
                        scale: 0.9,
                        shadow: '0px 11px 40px -15px rgb(0 0 0 / 50%)',
                      }}
                    >
                      <div className="font-display hover:underline hover:cursor-pointer  mr-4 w-32 h-32 rounded-xl bg-gray-200">
                        QR Menu
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* <Link href="/experiments/qr_menu">
              <div className="ml-6 font-display hover:underline hover:cursor-pointer  md:block">
                QR Menu
              </div>
            </Link>

            <Link href="/experiments/book_shelf">
              <div className="ml-6 font-display hover:underline hover:cursor-pointer   md:block">
                Bookshelf
              </div>
            </Link>

            <h2>Dev tools</h2>
            <Link href="/experiments/qr_menu">
              <div className="ml-6 font-display hover:underline hover:cursor-pointer  md:block">
                QR Menu
              </div>
            </Link>
            <Link href="/experiments/book_shelf">
              <div className="ml-6 font-display hover:underline hover:cursor-pointer   md:block">
                Bookshelf
              </div>
            </Link>

            <h2>AI/ML related</h2>
            <Link href="/experiments/qr_menu">
              <div className="ml-6 font-display hover:underline hover:cursor-pointer  md:block">
                QR Menu
              </div>
            </Link>
            <Link href="/experiments/book_shelf">
              <div className="ml-6 font-display hover:underline hover:cursor-pointer   md:block">
                Bookshelf
              </div>
            </Link> */}
          </div>
        </ContentLayout>
        <Footer />
      </BaseLayout>
    </>
  );
}
