import Footer from '@components/Common/Footer';
import Navbar from '@components/Common/Navbar';
import { HeroSection } from '@components/Home/HeroSection';
import Sidebar from '@components/Common/Sidebar';
import BaseLayout from '@components/Layout/ContentLayout';
import Head from 'next/head';
import React from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Yosua Muliawan</title>
      </Head>
      <Navbar />
      <Sidebar />
      <BaseLayout>
        <HeroSection />
      </BaseLayout>
      <Footer />
    </>
  );
}
