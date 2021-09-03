import { Banner, ContentLayout } from '@components';
import AuthContext from '@context/Auth';
import { Popover } from '@headlessui/react';
import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
import { useScrollPosition } from '@hooks/useScrollPosition';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { FcAbout, FcAnswers, FcDatabase } from 'react-icons/fc';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './styles.module.css';
import { DEFAULT_PROFILE_PICTURE } from '@constants';

export default function Home({ variant }) {
  const router = useRouter();
  const [navShow, setNavShow] = useState(false);
  const [bannerShow, setBannerShow] = useState(true);
  const isMobile = useCheckMobileScreen();

  const { userDetails } = useContext(AuthContext);
  const [showMobileNavHeader, setShowMobileNavHeader] = useState(true);

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < -200 && currPos.y < prevPos.y) {
      if (showMobileNavHeader) setShowMobileNavHeader(false);
    } else {
      if (!showMobileNavHeader) setShowMobileNavHeader(true);
    }
  });
  console.log('setShowMobileNavHeader', showMobileNavHeader);
  const logo =
    variant === 'white'
      ? 'https://res.cloudinary.com/yosuam19/image/upload/v1627572724/kerja/kerja-logo_one-line_color-white_nkft23.svg'
      : 'https://res.cloudinary.com/yosuam19/image/upload/v1627572724/kerja/kerja-logo_one-line_color-black_b1z7va.svg';
  const renderJobsPanel = () => {
    return (
      <Popover.Panel className="z-max  shadow-md  w-40 top-10 absolute z-10 bg-white dark:bg-gray-900 p-2 shadow-md rounded-xl font-body swing-in-top-fwd  ">
        <div className="grid ">
          <a href="/about" className={classes.linkChild}>
            <FcAbout className="mr-4" /> About
          </a>
          <a href="/privacy" className={classes.linkChild}>
            <FcAnswers className="mr-4" />
            Privacy Policy
          </a>
          <a href="/changelog" className={classes.linkChild}>
            <FcDatabase className="mr-4" />
            Change log
          </a>
        </div>
      </Popover.Panel>
    );
  };

  const renderProfile = (firstName: string) => {
    return (
      <Popover className="mx-2">
        <Popover.Button className="w-full w-auto flex">
          <a
            className={classes.link}
            href={userDetails?.role === 'employer' ? '/employers' : '/profile'}
          >
            <img
              className=" mr-2 rounded-3xl"
              src={userDetails?.profilePicture || DEFAULT_PROFILE_PICTURE}
              alt="logo"
              style={{ width: 32, height: 32, objectFit: 'cover' }}
            />

            {userDetails?.name?.firstName}
          </a>
        </Popover.Button>
      </Popover>
    );
  };

  const renderDesktopNav = () => {
    return (
      <ContentLayout style={{ width: 1280, maxWidth: '100vw' }}>
        <div
          className={'flex w-full items-center justify-between mt-4 mb-8 z-max'}
        >
          {/*left part of navbar*/}
          <div className="flex items-center">
            <img
              onClick={(_) => router.push('/')}
              src={logo}
              alt="logo"
              width={140}
              height={40}
            />

            <div
              className={styles.divider + ' dark:border-white  hidden md:block'}
            ></div>
          </div>
          {/*right part of navbar*/}
          <div className="flex items-center">
            <Popover className="mx-2 ">
              <Popover.Button className="w-full w-auto ">
                <Link href="/jobs" prefetch>
                  <a className={classes.link}>
                    {' '}
                    <BiLinkExternal className="mr-4" />
                    Jobs
                  </a>
                </Link>
              </Popover.Button>
            </Popover>
            <Popover className="mx-2 ">
              <Popover.Button className="w-full w-auto ">
                <a className={classes.link} href="/companies">
                  <BiLinkExternal className="mr-4" />
                  Companies
                </a>
              </Popover.Button>
            </Popover>
            <Popover className="mx-2">
              <Popover.Button className="w-full w-auto ">
                <a href="/events" className={classes.link}>
                  Events
                </a>
              </Popover.Button>
            </Popover>
            {userDetails ? (
              renderProfile(userDetails?.name.firstName)
            ) : (
              <div className="flex">
                <Popover className="mx-2">
                  <Popover.Button className="w-full w-auto ">
                    <a href="/sign-up" className={classes.link}>
                      Sign up
                    </a>
                  </Popover.Button>
                </Popover>
                <Popover className="mx-2">
                  <Popover.Button className="w-full w-auto ">
                    <a href="/sign-in" className={classes.link}>
                      Sign in
                    </a>
                  </Popover.Button>
                </Popover>
              </div>
            )}
            {/* <DarkModeToggle className="ml-4" /> */}
          </div>
        </div>
      </ContentLayout>
    );
  };
  const renderMobileNav = () => {
    let slideOverClassName =
      'fixed h-screen bg-white  right-0 top-0 transform duration-300 dark:bg-gray-90 z-max opacity-1 dark:bg-gray-900 ease-in-outs';
    if (!navShow) {
      slideOverClassName = slideOverClassName + ' translate-x-96 opacity-0 ';
    }

    let headerClassName =
      'flex justify-between w-full px-4 py-2 fixed top-0 justify-center   z-max-1 transform duration-500 ' +
      (variant !== 'white' && ' bg-white shadow-md');
    if (!showMobileNavHeader) {
      headerClassName = headerClassName + '  -translate-y-20';
    }
    return (
      <>
        {/*Showing on close*/}
        <ContentLayout>
          <div className={headerClassName}>
            <div className="flex items-center ">
              <img
                onClick={(_) => router.push('/')}
                src="https://res.cloudinary.com/yosuam19/image/upload/v1624493931/Screenshot_2021-06-24_at_8.18.13_AM_eeuxku.png"
                alt="logo"
                width={50}
                height={50}
              />
              {/* <div className={styles.logoName + ' ml-4 dark:text-white'}>
                <div>ACME Inc</div>
              </div> */}
            </div>
            <div className="justify-between">
              <GiHamburgerMenu
                className="text-black dark:text-white text-xl m-4"
                onClick={(_) => setNavShow(!navShow)}
              />
            </div>
          </div>
        </ContentLayout>
        {/*the slide over part*/}
        <div className={slideOverClassName}>
          <div className=" w-screen justify-right flex flex-row ">
            <GiHamburgerMenu
              className=" md:hidden text-black text-xl mr-4 ml-4 my-4 dark:text-white "
              onClick={(_) => setNavShow(!navShow)}
            />
          </div>

          <div className="flex flex-col items-end pr-8 text-2xl font-display">
            <Popover className="mx-2 ">
              <Popover.Button className="w-full w-auto ">
                {/*<Link prefetch href="/jobs" className={classes.link}>*/}
                {/*  Jobs*/}
                {/*</Link>*/}
              </Popover.Button>
            </Popover>
            <Popover className="mx-2 my-8 ">
              <Popover.Button className="w-full w-auto font-bold fade-in-top">
                <a href="/jobs">Jobs</a>
              </Popover.Button>
            </Popover>
            <Popover className="mx-2 my-8 ">
              <Popover.Button className="w-full w-auto font-bold  fade-in-top">
                <a href="/companies">Companies</a>
              </Popover.Button>
            </Popover>
            <Popover className="mx-2 my-8">
              <Popover.Button className="w-full w-auto font-bold  fade-in-top">
                <a href="/app/create" href="/events">
                  Events
                </a>
              </Popover.Button>
            </Popover>
            <Popover className="mx-2 my-8">
              <Popover.Button className="w-full w-auto font-bold  fade-in-top">
                <a href="/sign-up">Sign up</a>
              </Popover.Button>
            </Popover>
            <Popover className="mx-2 my-8">
              <Popover.Button className="w-full w-auto font-bold  fade-in-top">
                <a href="/sign-in">Sign in</a>
              </Popover.Button>
            </Popover>
            <div className="border-t-gray-200 border-2 w-80 my-4 mb-8 "></div>
          </div>
        </div>
      </>
    );
  };
  const renderBanner = () => {
    return (
      <Banner>
        Version 0.0.1 is out! Checkout the changelog{' '}
        <a href="/changelog" className="ml-2">
          {' '}
          here
        </a>
        <div onClick={setBannerShow(false)}>x</div>
      </Banner>
    );
  };

  if (variant === 'white' && !isMobile) {
    return (
      <div className="text-white absolute flex justify-center w-full ">
        {bannerShow && renderBanner()}
        {isMobile && renderMobileNav()}
        {!isMobile && renderDesktopNav()}
      </div>
    );
  }
  return (
    <div>
      {bannerShow && renderBanner()}
      {isMobile && renderMobileNav()}
      {!isMobile && renderDesktopNav()}
    </div>
  );
}
const classes = {
  nav: {
    container:
      'justify-between dark:bg-gray-800 h-screen dark:shadow-glass  md:shadow-none   w-full  md:w-auto bg-white p-2 md:p-0 block top-0 right-0 flex-col fixed md:relative md:items-center  md:flex md:flex-row md:h-auto transform duration-500 ',
    containerHide: ' translate-x-full md:translate-x-0 shadow-none',
    containerGlassmorphism: ' md:border-none  ',
  },
  linkChild:
    'p-2 w-full md:w-auto   items-center flex text-md md:p-2 rounded-md hover:bg-link-hover duration-300 ease-in-out dark:text-white  cursor-pointer font-display dark:hover:bg-gray-700',

  link: 'px-6 py-4 w-full md:w-auto   items-center flex text-md md:p-2 rounded-md hover:bg-link-hover duration-300 ease-in-out dark:text-white  cursor-pointer font-display dark:hover:bg-gray-700',
};
