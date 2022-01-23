import { BaseLayout, ContentLayout, Navbar } from '@components';
import Footer from '@components/Home/Footer';
import Sidebar from '@components/Home/Sidebar';
import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

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
            <h2>Fun things</h2>
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
            </Link>
          </div>
        </ContentLayout>
        <Footer />
      </BaseLayout>
    </>
  );
}
