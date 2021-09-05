import { BaseLayout, ContentLayout } from '@components';
import Head from 'next/head';
import ExperienceSection from '@components/Home/ExperienceSection';
import ProjectsSection from '@components/Home/ProjectsSection';
import Sidebar from '@components/Home/Sidebar';
import WebWidgets from '@components/Home/WebWidgets';
export default function Home() {
  return (
    <>
      <Head>
        <title>Next TS Starter 🔥</title>
      </Head>
      <BaseLayout>
        <ContentLayout>
          <div className=" text-6xl font-display">Yosua Muliawan</div>
          <div className="font-display text-md my-2 mt-4">
            💻 Software Engineer - Shopee (SG)
          </div>
          <div className="font-display  my-2">
            🎓 Graduate Student - National University of Singapore (NUS)
          </div>
          <button
            className="bold px-8 py-2 rounded-full text-md font-display mr-2"
            style={{
              backgroundColor: '#e4f1e8',
              color: '#14a01d',
            }}
          >
            Get in touch
          </button>
          <button
            className="bold px-8 py-2 rounded-full text-md font-display mr-2"
            style={{
              backgroundColor: '#e4f1e8',
              color: '#14a01d',
            }}
          >
            Download CV
          </button>
          <div className="text-display">
            I like creating web apps that are delightful to use, in code that is
            easy to maintain and understand I also have an eclectic mix of
            interests, which includes competitive programming, software
            engineering, and machine learning / data science. Through my
            undergraduate dissertation and my current studies at NUS, i am also
            very interested in the world of machine learning/ data science In my
            spare time, i enjoy catching up on the latest research in AI/ML as
            well as playing around with ML models
          </div>
        </ContentLayout>
        <ExperienceSection />
        <ProjectsSection />
        <WebWidgets />

        <Sidebar />
        <ContentLayout>Every country i've lived in: 🇮🇩 🇬🇧 🇸🇬</ContentLayout>
      </BaseLayout>
    </>
  );
}
