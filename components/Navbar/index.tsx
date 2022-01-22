import React from 'react';
import ContentLayout from '@components/ContentLayout';
import styles from './index.module.css';
import Link from 'next/link';
export default function ExperienceSection() {
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
              <div className="ml-6 font-display hover:underline  hover:cursor-pointer hidden md:block">
                Blog
              </div>
            </Link>
            <div className="ml-6 font-display hidden md:flex flex-row w-max items-center">
              <div className="bg-gray-100 shadow-md rounded-md flex justify-center items-center w-6 h-6 text-sm">
                ⌘
              </div>
              {' + '}
              <div className="bg-gray-100 shadow-md rounded-md flex justify-center items-center w-6 h-6 text-sm">
                K
              </div>
              Jump to{' '}
            </div>
          </div>
        </div>
      </ContentLayout>
    </div>
  );
}
