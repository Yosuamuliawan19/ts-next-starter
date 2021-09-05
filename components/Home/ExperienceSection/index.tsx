import { ContentLayout } from '@components';
import Image from 'next/image';
export default function ExperienceSection() {
  const ExperienceItems = [
    {
      time: 'From March 2021 to Present,',
      img: 'https://res.cloudinary.com/yosuam19/image/upload/v1618632957/shopee2_2_bkynm1.png',
      desc: 'I am currently a software engineer on the platform team (Shopee Platform Product) at Shopee Singapore.',
      tags: ['Typescript', 'React'],
    },
    {
      time: 'From March 2021 to Present,',
      img: 'https://res.cloudinary.com/yosuam19/image/upload/v1612358811/portfolio/nus_comp_ornzov.png',
      desc: 'I am enrolled as a graduate student (MComp AI) at the National University of Singapore. Topics of interest includes computer vision, uncertainty modelling in AI and data-driven decision making',
      tags: ['ML/AI'],
    },
    {
      time: 'From March 2021 to Present,',
      img: 'https://res.cloudinary.com/yosuam19/image/upload/v1612358667/portfolio/uon_uvpcex.jpg',
      desc: 'I conducted machine learning research at the University of Nottingham as part of my dissertation. You can find the link to the paper in the projects section below.',
      tags: ['ML/AI'],
    },
    {
      time: 'From March 2021 to Present,',
      img: 'https://res.cloudinary.com/yosuam19/image/upload/v1612358590/portfolio/toped_mbmwsu.png',
      desc: 'For 9 months, I interned at Tokopedia, an e-commerce platform in Indonesia. I was involved in developing the payment module, as part of the optimization team.',
      tags: ['Golang', 'React'],
    },
    {
      time: 'From March 2021 to Present,',
      img: 'https://res.cloudinary.com/yosuam19/image/upload/v1612358330/acm_sjwcs4.png',
      desc: 'Some time ago, I was part of the competitive programming team at University. I enjoy solving problem on UVa, Codeforces, and VJudge. (and ocassionally still do)',
      tags: ['C++', 'Algorithms', 'Data Structures'],
    },
  ];
  return (
    <>
      <ContentLayout>
        <div className="p-4 md:p-0">
          {ExperienceItems.map((data) => {
            return (
              <div className="flex py-4 hover:bg-gray-50 transition duration-200 rounded-2xl">
                <div style={{ minWidth: 60 }}>
                  <Image
                    src={data.img}
                    width={50}
                    height={50}
                    objectFit={'contain'}
                  />
                </div>
                <div className="font-body pl-4">
                  <span className="bold font-display">{data.time}</span>{' '}
                  {data.desc}
                  <div className="flex mt-1">
                    {data?.tags.map((tag) => {
                      return (
                        <div
                          className="px-4 py-1 rounded-full text-sm mr-2"
                          style={{
                            backgroundColor: '#e4f1e8',
                            color: '#14a01d',
                          }}
                        >
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ContentLayout>
    </>
  );
}
