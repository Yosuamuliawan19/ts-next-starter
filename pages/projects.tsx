import { BaseLayout, ContentLayout, Navbar } from '@components';
import Footer from '@components/Home/Footer';
import ProjectsSection from '@components/Home/ProjectsSection';
import Sidebar from '@components/Home/Sidebar';
import Head from 'next/head';
import React from 'react';
export default function Home() {
  return (
    <>
      <Head>
        <title>Projects | Yosua Muliawan</title>
      </Head>

      <Navbar />
      <Sidebar />
      <BaseLayout>
        <ContentLayout>
          <ProjectsSection />
        </ContentLayout>
        <Footer />
      </BaseLayout>
    </>
  );
}
