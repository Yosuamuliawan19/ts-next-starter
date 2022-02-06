import Footer from '@components/Common/Footer';
import Navbar from '@components/Common/Navbar';
import Sidebar from '@components/Common/Sidebar';
import BlogSection from '@components/Home/TabView/BlogSection';
import ContentLayout from '@components/Layout/ContentLayout';
import BaseLayout from '@components/Layout/ContentLayout';
import Head from 'next/head';
import React from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Blog | Yosua Muliawan</title>
      </Head>

      <Navbar />
      <Sidebar />
      <BaseLayout>
        <ContentLayout>
          <BlogSection />
        </ContentLayout>
        <Footer />
      </BaseLayout>
    </>
  );
}
