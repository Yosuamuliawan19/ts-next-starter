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
            styles.navbar + ' py-4 flex bg-white w-full justify-between'
          }
        >
          <Link href="/">
            <div className="bold font-display hover:underline  hover:cursor-pointer">
              Yosua Muliawan
            </div>
          </Link>
          <div className="flex">
            <Link href="/projects">
              <div className="ml-6 font-display hover:underline hover:cursor-pointer">
                Projects
              </div>
            </Link>
            <Link href="/blog">
              <div className="ml-6 font-display hover:underline  hover:cursor-pointer">
                Blog
              </div>
            </Link>

            <div className="ml-6 font-displa ">⌘ + K Jump to </div>
          </div>
        </div>
      </ContentLayout>
    </div>
  );
}
