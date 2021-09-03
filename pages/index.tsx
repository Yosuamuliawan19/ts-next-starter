import { BaseLayout, ContentLayout, Footer, Navbar } from '@components';

import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { Carousel } from 'react-responsive-carousel';
import { useEffect } from 'react';
import { ROUTES } from '@constants/routes';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

function Card(props) {
  return (
    <div
      className={
        'rounded-xl m-4 shadow-lg  transform duration-100  p-4 hover:cursor-pointer bg-white dark:text-white  text-sm  flex flex-col items-center  dark:bg-gray-700 ' +
        props?.className
      }
    >
      {props?.children}
    </div>
  );
}
export const centerMode = () => {
  const events = [
    'https://res.cloudinary.com/yosuam19/image/upload/v1629521385/kerja/image_16_novebg.png',
    'https://res.cloudinary.com/yosuam19/image/upload/v1629521385/kerja/image_18_oly4dm.png',
    'https://res.cloudinary.com/yosuam19/image/upload/v1629521384/kerja/image_15_kbus4c.png',
  ];
  return null;
  return (
    <ContentLayout
      flex=" flex-col md:flex-row  "
      className=" font-display  my-4"
    >
      <Carousel
        // infiniteLoop
        centerMode
        showThumbs={false}
        // centerSlidePercentage={number('centerSlidePercentage', 80, {}, mainGroupId)}
        centerSlidePercentage={20}
        // {...getConfigurableProps()}
        showStatus={false}
        dynamicHeight={true}
      >
        {events.map((data) => {
          return (
            // <div>
            <img
              // className={'w-full object-fit-contain mx-4'}
              style={{ height: 450, objectFit: 'contain', width: 'auto' }}
              src={data}
            />
            // </div>
          );
        })}
      </Carousel>
    </ContentLayout>
  );
};
export default function Home() {
  const isMobile = useCheckMobileScreen();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState();

  const handleJobSearch = async (event: any) => {
    event.preventDefault();
    if (event.target[0]) {
      router.push(`/jobs?query=${searchTerm}`);
    } else {
      router.push(`/jobs?query`);
    }
  };

  return (
    <>
      <Head>
        <title>Next TS Starter 🔥</title>
      </Head>
      <BaseLayout>
        <Navbar variant={'white'} />
        <div
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/yosuam19/image/upload/v1629522518/kerja/city_night-01_2_reamqq.png")',
            backgroundColor: '#cccccc',
            height: '80vh',
          }}
        >
          <div className="dmSans text-white  w-full items-center flex-col flex justify-center text-4xl md:text-5xl mb-8 pt-32 px-8">
            A utopia for Indonesia’s brightest minds.
          </div>
          <div className={'w-full flex justify-center'}>
            <button
              onClick={(_) => router.push(ROUTES.SIGN_UP)}
              className={
                'hover:bg-gray-100 shadow bg-white dmSans bold  px-8 py-2 text-lg rounded-xl  mx-2   '
              }
            >
              <div className={'r-b-gradient-text'}>Join us</div>
            </button>
          </div>
        </div>

        <ContentLayout
          flex=" flex-col md:flex-row  "
          className=" font-display  "
        >
          <div className="w-full md:w-1/2 md:pl-8  md:mt-32 px-8">
            <div className=" text-left w-full items-center flex-col flex justify-center text-3xl md:text-4xl mb-8 mt-16">
              We are a curated job portal to 150+ exciting Indonesian
              companies... 🔥
            </div>
            <form onSubmit={handleJobSearch}>
              <div
                className={
                  'rounded-full border-2 border-gray-200 p-4 w-3/4 shadow-md flex items-center'
                }
              >
                <input
                  className={'w-full'}
                  placeholder={`Try "finance" or "design" or "product"`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <FcSearch className={''} onClick={handleJobSearch} />
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/2 flex items-end justify-center pt-8">
            <img
              style={{ height: 600, objectFit: 'contain' }}
              src={
                'https://res.cloudinary.com/yosuam19/image/upload/v1629527165/kerja/Group_58_k1ttiv.png'
              }
            />
          </div>
        </ContentLayout>

        <div className=" flex flex-col md:flex-row font-display min-h-96 py-20  md:py-24 ">
          <img
            className={'w-full h-fit-content object-fit-contain md:w-1/2'}
            src={
              'https://res.cloudinary.com/yosuam19/image/upload/v1629522518/kerja/city_night-01_2_reamqq.png'
            }
          />
          <div
            style={{ backgroundColor: '#031A3F' }}
            className={'text-white w-full md:w-1/2 p-8 md:p-16'}
          >
            <div
              className={
                'text-3xl r-b-gradient-text w-fit-content dmSans bold mb-8'
              }
            >
              Our vision
            </div>
            <div style={{ maxWidth: isMobile ? 1080 : 560 }}>
              <p className={'text-lg mt-4'}>
                Imagine a place with me. A city in the clouds fillled with
                people whose spirits are full with the promise of perpetual
                progress.
              </p>
              <p className={'text-lg mt-4'}>
                A thiriving community where brilliant ideas flourish like liquid
                gold.
              </p>
              <p className={'text-lg mt-4'}>
                ACME Inc was born out of a desire to help exceptional people
                unlock new ways to grow themselves. Whether it’s helping you
                find jobs, foster meaningful connections, or learn from industry
                experts, we want to be your best friend throughout college.
              </p>
              <p className={'text-lg mt-4'}>
                Join our movement in building a utopia for growth-minded
                Indonesians.
              </p>

              <p className={'text-lg dmSans bold mt-8'}>
                Tim Wijaya & Alvin Salim
              </p>
              <p className={'text-lg'}>Founders</p>
            </div>
          </div>
        </div>
        <ContentLayout
          flex=" flex-col-reverse md:flex-row "
          className=" font-display  "
        >
          <div className="w-full md:w-1/2">
            <img
              src={
                'https://res.cloudinary.com/yosuam19/image/upload/v1629526996/kerja/Hero_Image_xj2s6z.png'
              }
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-8  md:mt-32 px-8">
            <div className=" text-left w-full items-center flex-col flex justify-center text-3xl md:text-4xl">
              {' '}
              ...powered by a bustling community of 2000+ exceptional, driven
              people 🏆
            </div>
            <button
              onClick={(_) => router.push(ROUTES.SIGN_UP)}
              className={
                'r-b-gradient dmSans bold text-white px-8 py-2 text-lg rounded-xl  mx-2  mt-8 '
              }
            >
              Join us
            </button>
          </div>
        </ContentLayout>
        <ContentLayout flex=" flex-col " className=" font-display  py-8  ">
          <div className="w-full items-center flex-col flex justify-center ">
            <div className="text-2xl bold dmSans">Signing Up is Easy</div>
            <div className="md:flex">
              <div className="w-full md:w-1/3 p-14 flex">
                <div
                  style={{ color: '#6236FF' }}
                  className={'bold text-3xl mr-4'}
                >
                  01
                </div>
                <div className={'block'}>
                  <div className="text-xl mb-4 bold dmSans">
                    Submit Your Application
                  </div>
                  <div>Complete our application process within minutes.</div>
                </div>
              </div>

              <div className="w-full md:w-1/3 p-14 flex">
                <div
                  style={{ color: '#F98D53' }}
                  className={'bold text-3xl mr-4'}
                >
                  02
                </div>
                <div className={'block'}>
                  <div className="text-xl mb-4 bold dmSans">
                    Wait for the Final Verdict
                  </div>
                  <div>
                    Our team will review your applications within 5 days.
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 p-14 flex">
                <div
                  style={{ color: '#76CE44' }}
                  className={'bold text-3xl mr-4'}
                >
                  03
                </div>
                <div className={'block'}>
                  <div className="text-xl mb-4 bold dmSans">Start Browsing</div>
                  <div>
                    Whether you’re here to find jobs or talents, welcome to the
                    club!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentLayout>

        <div className={' r-b-gradient  '}>
          <ContentLayout className={' items-center flex flex-col py-16'}>
            <div
              className={
                'text-3xl  w-fit-content dmSans bold md:mb-0 mb-8 md:mr-8 text-white'
              }
            >
              What we offer
            </div>
            <div
              className={
                'flex flex-col  md:flex-row justify-center  items-center'
              }
            >
              <Card>
                <div className="text-xl mb-8 bold dmSans">Students</div>
                <div className={' flex flex-row  mb-8 w-full'}>
                  <div className={' mr-4'}>
                    <img
                      style={{ width: 48, height: 48, objectFit: 'contain' }}
                      src={
                        'https://res.cloudinary.com/yosuam19/image/upload/v1629526401/kerja/icons/Skip_woucoy.png'
                      }
                    />
                  </div>
                  <div className={'flex flex-col'}>
                    <div className="text-xl mb-2 bold dmSans">
                      Skip the line
                    </div>
                    <div>
                      We’ve created an exclusive pipeline to companies you
                      admire, ensuring that your application is always on top of
                      the pile.
                    </div>
                  </div>
                </div>
                <div className={' flex flex-row  mb-8 w-full'}>
                  <div className={' mr-4'}>
                    <img
                      style={{ width: 48, height: 48, objectFit: 'contain' }}
                      src={
                        'https://res.cloudinary.com/yosuam19/image/upload/v1629526401/kerja/icons/Stop_fnq5ty.png'
                      }
                    />
                  </div>
                  <div className={'flex flex-col'}>
                    <div className="text-xl mb-2 bold dmSans">
                      End the Endless Scroll
                    </div>
                    <div>
                      Stop scavenging for jobs & getting ghosted by recruiters
                      on LinkedIn.
                    </div>
                  </div>
                </div>
                <div className={' flex flex-row  mb-8  w-full'}>
                  <div className={' mr-4'}>
                    <img
                      style={{ width: 48, height: 48, objectFit: 'contain' }}
                      src={
                        'https://res.cloudinary.com/yosuam19/image/upload/v1629526401/kerja/icons/Alarm_bk1fjk.png'
                      }
                    />
                  </div>
                  <div className={'flex flex-col'}>
                    <div className="text-xl mb-2 bold dmSans">
                      Click. That’s it.
                    </div>
                    <div>
                      Our 1-click application system is simple and stress-free.
                    </div>
                  </div>
                </div>
                <button
                  onClick={(_) => router.push(ROUTES.SIGN_UP_STUDENTS)}
                  className={
                    'r-b-gradient dmSans bold text-white px-8 py-2 text-lg rounded-xl  mx-2  hover:shadow-xl '
                  }
                >
                  Sign Up as a Student
                </button>
              </Card>
              <Card>
                <div className="text-xl mb-8 bold dmSans ">Employers</div>
                <div className={' flex flex-row mb-4  w-full'}>
                  <div className={' mr-4'}>
                    <img
                      style={{ width: 48, height: 48, objectFit: 'contain' }}
                      src={
                        'https://res.cloudinary.com/yosuam19/image/upload/v1629526401/kerja/icons/Skip-1_czalqi.png'
                      }
                    />
                  </div>
                  <div className={'flex flex-col'}>
                    <div className="text-xl mb-2 bold dmSans">
                      A Pipeline to the Best
                    </div>
                    <div>
                      Enjoy a direct channel to top Indonesian students from the
                      best US, UK, Australian, and local universities.
                    </div>
                  </div>
                </div>
                <div className={' flex flex-row  mb-8 w-full'}>
                  <div className={'mr-4 '}>
                    <img
                      style={{ width: 48, height: 48, objectFit: 'contain' }}
                      src={
                        'https://res.cloudinary.com/yosuam19/image/upload/v1629526401/kerja/icons/Stop-1_da1kra.png'
                      }
                    />
                  </div>
                  <div className={'flex flex-col'}>
                    <div className="text-xl mb-2 bold dmSans">
                      Filter the Noise
                    </div>
                    <div>
                      We pre-screen all of our users to ensure you will only
                      receive high quality leads.
                    </div>
                  </div>
                </div>
                <div className={' flex flex-row  mb-8  w-full'}>
                  <div className={' mr-4'}>
                    <img
                      style={{ width: 48, height: 48, objectFit: 'contain' }}
                      src={
                        'https://res.cloudinary.com/yosuam19/image/upload/v1629526401/kerja/icons/Rocket_wrvvx1.png'
                      }
                    />
                  </div>
                  <div className={'flex flex-col'}>
                    <div className="text-xl mb-2 bold dmSans">
                      Brand Yourselves Better.
                    </div>
                    <div>
                      Host webinars, workshops, and mentoring calls with our
                      community.
                    </div>
                  </div>
                </div>
                <button
                  onClick={(_) => router.push(ROUTES.SIGN_UP_EMPLOYERS)}
                  className={
                    'r-b-gradient dmSans bold text-white px-8 py-2 text-lg rounded-xl  mx-2    hover:shadow-xl'
                  }
                >
                  Sign Up as an Employer
                </button>
              </Card>
            </div>
          </ContentLayout>
        </div>
        {centerMode()}
        <ContentLayout>
          <div
            className={
              'flex flex-col  md:flex-row justify-center  my-16 items-center'
            }
          >
            <div
              className={
                'text-3xl  w-fit-content dmSans bold md:mb-0 mb-8 md:mr-8'
              }
            >
              Fuel your ambition with us.
            </div>
            <div>
              <button
                onClick={(_) => router.push(ROUTES.SIGN_UP)}
                className={
                  'r-b-gradient dmSans bold text-white px-8 py-2 text-lg rounded-xl  mx-2   hover:shadow-xl '
                }
              >
                Sign Up
              </button>
              <button
                onClick={(_) => router.push(ROUTES.SUPPORT_EMAIL)}
                className={
                  'hover:bg-gray-100 shadow bg-white dmSans bold  px-8 py-2 text-lg rounded-xl  mx-2   '
                }
              >
                <div className={'r-b-gradient-text'}>Contact us</div>
              </button>
            </div>
          </div>
        </ContentLayout>

        <Footer />
      </BaseLayout>
    </>
  );
}
const btnRed =
  'bg-red-400 text-white px-4 py-2 rounded-xl flex items-center font-display w-fit-content text-md';
