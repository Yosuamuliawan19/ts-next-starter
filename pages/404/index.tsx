import Navbar from '@components/Common/Navbar';
import ContentLayout from '@components/Layout/ContentLayout';
import BaseLayout from '@components/Layout/ContentLayout';
import Footer from '@components/Common/Footer';
import Sidebar from '@components/Common/Sidebar';
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
                  color: 'black',
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
