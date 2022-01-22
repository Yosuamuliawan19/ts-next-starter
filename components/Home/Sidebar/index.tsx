import { EXTERNAL_LINKS } from '@constants/';
import Link from 'next/link';
import {
  AiFillMediumSquare,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineArrowUp,
} from 'react-icons/ai';
import styles from './index.module.css';
export default function Sidebar() {
  return (
    <>
      <div
        className={
          styles.sidebar +
          ' fixed left-0 bottom-0 lg:top-0 flex lg:flex-col justify-center w-screen lg:w-auto lg:h-screen  px-2 bg-white'
        }
      >
        {/*<div>*/}
        {/*  <AiFillInstagram className="text-2xl md:mb-8" />*/}
        {/*</div>*/}
        <Link href={EXTERNAL_LINKS.MEDIUM}>
          <div className={'p-2 md:mb-6 rounded-lg ' + styles.icon}>
            <AiFillMediumSquare className="text-2xl " />
          </div>
        </Link>
        <Link href={EXTERNAL_LINKS.TWITTER}>
          <div className={'p-2 md:mb-6 rounded-lg ' + styles.icon}>
            <AiOutlineTwitter className="text-2xl " />
          </div>
        </Link>
        <Link href={EXTERNAL_LINKS.LINKEDIN}>
          <div className={'p-2 md:mb-6 rounded-lg ' + styles.icon}>
            <AiFillLinkedin className="text-2xl " />
          </div>
        </Link>
        <Link href={EXTERNAL_LINKS.GITHUB}>
          <div className={'p-2 md:mb-6 rounded-lg ' + styles.icon}>
            <AiFillGithub className="text-2xl " />
          </div>
        </Link>
      </div>
      <div className="fixed bottom-8 right-8  ">
        <a href="#top">
          <div
            className="bold   font-display   my-2 hover:opacity-80 shadow-md w-min rounded-full p-4 text-lg"
            style={{
              backgroundColor: '#e4f1e8',
              color: '#14a01d',
            }}
          >
            <AiOutlineArrowUp />
          </div>
        </a>
      </div>
    </>
  );
}
