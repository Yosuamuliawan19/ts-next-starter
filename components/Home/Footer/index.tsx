import styles from './index.module.css';
import { ContentLayout } from '@components';
import { EXTERNAL_LINKS } from '@constants/';
import Link from 'next/link';

export default function ExperienceSection() {
  return (
    <>
      <div className={'py-32 ' + styles.footer}>
        <ContentLayout>
          <div className="font-display bold text-2xl mb-2 ">💬 Lets chat!</div>
          <div
            className={`max-w-md font-display bold text-lg  mb-4  ${styles.subtitle}`}
          >
            Every good thing starts with a conversation. Send an email my way
            and we can talk about tech, design and pop-culture
          </div>
          <Link href={EXTERNAL_LINKS.MAILTO}>
            <button className="bg-green-100 text-green-500 hover:opacity-80 font-display bold flex items-center text-sm w-max py-3 px-8 mt-2 rounded-full">
              Get in touch
            </button>
          </Link>
          <div className={`font-display text-xs mt-4`}>
            © Yosua Muliawan, made with lots of ❤️ and ☕ from SG
            <Link href={'/projects/this-site'}> | about this site</Link>
          </div>
        </ContentLayout>
      </div>
    </>
  );
}
