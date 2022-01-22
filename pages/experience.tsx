import { BaseLayout, ContentLayout, Navbar } from '@components';
import Footer from '@components/Home/Footer';
import Sidebar from '@components/Home/Sidebar';
import ExperienceSection from '@components/Home/TabView/ExperienceSection';
import Head from 'next/head';
import React from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Experience | Yosua Muliawan</title>
      </Head>

      <Navbar />
      <Sidebar />
      <BaseLayout>
        <ContentLayout>
          <ExperienceSection />
        </ContentLayout>
        <Footer />
      </BaseLayout>
    </>
  );
}
