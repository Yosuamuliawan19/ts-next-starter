import { BaseLayout, ContentLayout, Navbar } from '@components';
import BlogSection from '@components/Home/TabView/BlogSection';
import Footer from '@components/Home/Footer';
import Sidebar from '@components/Home/Sidebar';
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
