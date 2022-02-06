import Navbar from '@components/Common/Navbar';
import ContentLayout from '@components/Layout/ContentLayout';
import BaseLayout from '@components/Layout/ContentLayout';
import Footer from '@components/Common/Footer';
import Sidebar from '@components/Common/Sidebar';
import Head from 'next/head';
import React from 'react';
import { ExamplesSection } from '@components/Home/ExamplesSection';
import { AuthContent } from '@components/Common/AuthModal';

export default function SignIn() {
  const [isRegister, setIsRegister] = React.useState(false);
  return (
    <>
      <Head>
        <title>Home | Yosua Muliawan</title>
      </Head>
      <Navbar />
      <Sidebar />
      <BaseLayout>
        <ContentLayout>
          <div className="mb-8 flex flex-col items-center">
            <div className="md:border-2  md:border-gray-50 rounded-lg md:p-8 w-90 my-16">
              <AuthContent
                isRegister={isRegister}
                setIsRegister={setIsRegister}
              />
            </div>
          </div>
          <div className="mb-8 ">
            <ExamplesSection />
          </div>
        </ContentLayout>
      </BaseLayout>
      <Footer />
    </>
  );
}
