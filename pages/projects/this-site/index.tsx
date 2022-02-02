import { BaseLayout, ContentLayout, Navbar } from '@components';
import Footer from '@components/Home/Footer';
import Sidebar from '@components/Home/Sidebar';
import Head from 'next/head';
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
const content = `
# About this site

## Frontend: 

- Next.js
- Framer motion
- Typescript

## Backend

- Node.js

## Hosting

Hosted on Vercel and AWS

`;
export default function Home({ source }) {
  return (
    <>
      <Head>
        <title>About this site | Yosua Muliawan</title>
      </Head>
      <Navbar />
      <Sidebar />
      <BaseLayout>
        <ContentLayout>
          <div className=" min-h-screen font-display">
            <MDXRemote {...source} />
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
