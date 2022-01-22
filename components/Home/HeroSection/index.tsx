import ContentLayout from '@components/ContentLayout';
import { EXTERNAL_LINKS } from '@constants/';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
export function HeroSection() {
  return (
    <ContentLayout>
      <div className="relative overflow-hidden">
        <div className=" text-3xl font-display mt-32">Hi, I'm Yosua</div>
        <div className="font-display text-md my-2 mt-4 flex">
          <div className="pr-2">💻</div> Software Engineer - Shopee (SG)
        </div>
        <div className="font-display  my-2 flex">
          <div className="pr-2">🎓</div> Graduate Student - National University
          of Singapore (NUS)
        </div>
        <div className="font-display  my-2 flex">
          <div className="pr-2 flex align-center">📍</div>
          Singapore
        </div>

        <Link href={EXTERNAL_LINKS.MAILTO}>
          <motion.button
            whileHover={{ scale: 1.1, opacity: 0.85 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-100 text-green-500 text-sm bold px-8 py-2 rounded-full  font-display mr-2  my-2 hover:opacity-80"
          >
            Get in touch
          </motion.button>
        </Link>
        <Link href={EXTERNAL_LINKS.DOWNLOAD_CV}>
          <button className="bg-green-100 text-green-500 bold px-8 py-2 rounded-full text-sm font-display mr-2  my-2 hover:opacity-80">
            Download CV
          </button>
        </Link>
        <div className="absolute right-0 top-0 hidden md:block">
          <Image src={require('../../../assets/lines.svg')} />
        </div>
        <div className="mt-32"></div>
      </div>
    </ContentLayout>
  );
}
