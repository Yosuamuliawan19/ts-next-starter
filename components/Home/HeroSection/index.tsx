import ContentLayout from '@components/ContentLayout';
import { EXTERNAL_LINKS } from '@constants/';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <ContentLayout>
      <div className="relative overflow-hidden">
        <div className=" text-3xl font-display mt-32">Hi, I'm Yosua</div>
        <div className="font-display text-md my-2 mt-4">
          💻 Software Engineer - Shopee (SG)
        </div>
        <div className="font-display  my-2">
          🎓 Graduate Student - National University of Singapore (NUS)
        </div>
        <Link href={EXTERNAL_LINKS.MAILTO}>
          <button
            className="text-sm bold px-8 py-2 rounded-full  font-display mr-2  my-2 hover:opacity-80"
            style={{
              backgroundColor: '#e4f1e8',
              color: '#14a01d',
            }}
          >
            Get in touch
          </button>
        </Link>
        <Link href={EXTERNAL_LINKS.DOWNLOAD_CV}>
          <button
            className="bold px-8 py-2 rounded-full text-sm font-display mr-2  my-2 hover:opacity-80"
            style={{
              backgroundColor: '#e4f1e8',
              color: '#14a01d',
            }}
          >
            Download CV
          </button>
        </Link>
        <div className="absolute right-0 top-0 ">
          <Image src={require('../../../assets/lines.svg')} />
        </div>
        <div className="mt-32"></div>
      </div>
    </ContentLayout>
  );
}
