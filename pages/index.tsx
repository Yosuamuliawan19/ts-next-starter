import { BaseLayout, Navbar } from '@components';
import ExposureSection from '@components/Home/ExposureSection';
import Footer from '@components/Home/Footer';
import { HeroSection } from '@components/Home/HeroSection';
import Sidebar from '@components/Home/Sidebar';
import TabView from '@components/Home/TabView';
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
        <ExposureSection />
        <div className="mt-4  "></div>
        <TabView />
        <Footer />
      </BaseLayout>
    </>
  );
}
