import React from 'react';
import ContentLayout from '@components/ContentLayout';
import styles from './index.module.css';
import Link from 'next/link';
import nightwind from 'nightwind/helper';
import DarkModeToggle from 'react-dark-mode-toggle';
function useForceUpdate() {
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}
export default function ExperienceSection() {
  const forceUpdate = useForceUpdate();
  const checkDarkMode = () => {
    // call your hook here

    if (typeof window === 'undefined') return true;
    return window?.localStorage.getItem('nightwind-mode') === 'dark';
  };
  return (
    <div className="sticky top-0 shadow-sm z-max">
      <ContentLayout>
        <div
          className={
            styles.navbar +
            ' py-4 flex bg-white w-full justify-between items-center'
          }
        >
          <Link href="/">
            <div className="bold font-display hover:underline  hover:cursor-pointer">
              Yosua Muliawan
            </div>
          </Link>
          <div className="flex items-center">
            <Link href="/projects">
              <div className="ml-6 font-display hover:underline hover:cursor-pointer hidden md:block">
                Projects
              </div>
            </Link>
            <Link href="/blog">
              <div className="mx-6 font-display hover:underline  hover:cursor-pointer hidden md:block">
                Blog
              </div>
            </Link>
            <DarkModeToggle
              onChange={(value) => {
                forceUpdate();
                nightwind.enable(value);
              }}
              checked={checkDarkMode()}
              size={48}
            />
            {/* <div className=" ml-6 font-display hidden md:flex flex-row w-max items-center">
              <div className="bg-gray-100 shadow-md rounded-md flex justify-center items-center w-6 h-6 text-sm">
                ⌘
              </div>
              {' + '}
              <div className="bg-gray-100 shadow-md rounded-md flex justify-center items-center w-6 h-6 text-sm">
                K
              </div>
              Jump to{' '}
            </div> */}
          </div>
        </div>
      </ContentLayout>
    </div>
  );
}
