import { BaseLayout, ContentLayout, Navbar } from '@components';
import Footer from '@components/Home/Footer';
import Sidebar from '@components/Home/Sidebar';
import AchievementSection from '@components/Home/TabView/AchievementsSection';
import Head from 'next/head';
import React from 'react';
export default function Home() {
  return (
    <>
      <Head>
        <title>Extracurriculars | Yosua Muliawan</title>
      </Head>

      <Navbar />
      <Sidebar />
      <BaseLayout>
        <ContentLayout>
          <AchievementSection />
        </ContentLayout>
        <Footer />
      </BaseLayout>
    </>
  );
}
