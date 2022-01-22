import { BaseLayout, ContentLayout, Navbar } from '@components';
import Footer from '@components/Home/Footer';
import Sidebar from '@components/Home/Sidebar';
import Head from 'next/head';
import React from 'react';
export default function Home() {
  return (
    <>
      <Head>
        <title>404 | Yosua Muliawan</title>
      </Head>

      <Navbar />
      <Sidebar />
      <BaseLayout>
        <ContentLayout>
          <div className=" flex flex-row justify-center items-center font-display  py-16">
            <img
              src="https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif"
              alt="404"
              className="mr-16 rounded-md h-64"
            />
            <div>
              <div
                className="bold "
                style={{
                  fontSize: 48,
                  color: '#14a01d',
                }}
              >
                404
              </div>
              <div>The page you are looking for doesn't exist</div>
            </div>
          </div>
        </ContentLayout>
        <Footer />
      </BaseLayout>
    </>
  );
}
