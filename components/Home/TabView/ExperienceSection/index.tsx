import Image from 'next/image';
export default function ExperienceSection() {
  const ExperienceItems = [
    {
      title: 'Software Engineer - Shopee',
      time: '2021 - Present',
      img: 'https://res.cloudinary.com/yosuam19/image/upload/v1618632957/shopee2_2_bkynm1.png',
      desc: 'I am currently a software engineer on the platform team (Shopee Platform Product) at Shopee Singapore.',
      tags: ['Web Development', 'Typescript', 'React', 'Nodejs'],
    },

    {
      title: 'Software Engineer Intern - Tokopedia',
      time: '2021 - Present',
      img: 'https://res.cloudinary.com/yosuam19/image/upload/v1612358590/portfolio/toped_mbmwsu.png',
      desc: 'For 9 months, I interned at Tokopedia, an e-commerce platform in Indonesia. I was involved in developing the payment module, as part of the optimization team.',
      tags: ['Fullstack', 'Golang', 'React'],
    },
    {
      title: 'Competitive Programming Team',
      time: '2021 - Present',
      img: 'https://res.cloudinary.com/yosuam19/image/upload/v1612358330/acm_sjwcs4.png',
      desc: 'Some time ago, I was part of the competitive programming team at University. I enjoy solving problems on UVa, Codeforces, and VJudge. (and ocassionally still do, though more recently on leetcode)',
      tags: ['Competitive programming', 'C++', 'Algorithms', 'Data Structures'],
    },
  ];
  const EducationItems = [
    {
      title: 'MComp - NUS (National University of Singapore)',
      time: '2021 - Present',
      img: 'https://res.cloudinary.com/yosuam19/image/upload/v1612358811/portfolio/nus_comp_ornzov.png',
      desc: 'I am enrolled as a graduate student (MComp AI) at the National University of Singapore. Topics of interest includes computer vision, uncertainty modelling in AI and data-driven decision making',
      tags: ['ML/AI'],
    },
    {
      title: 'Bachelor of Computer Science - University of Nottingham',
      time: '2016 - 2020',
      img: 'https://res.cloudinary.com/yosuam19/image/upload/v1612358667/portfolio/uon_uvpcex.jpg',
      desc: 'I conducted machine learning research at the University of Nottingham as part of my dissertation, in requirements of completing my dual degree from joint program with Binus University. You can find the link to the paper in the projects section below.',
      tags: ['ML/AI'],
    },
    {
      title: 'Bachelor of Computer Science - Binus University International',
      time: '2016 - 2020',
      img: 'https://res.cloudinary.com/yosuam19/image/upload/v1631459309/portfolio/1519896016950_pfx5oy.png',
      desc: 'Earned best graduate title. Graduated summa cum laude',
      tags: ['ML/AI'],
    },
  ];
  return (
    <>
      <>
        <div className=" md:p-0 my-8 ">
          <div className="rounded-lg bg-gray-100 p-8 ">
            <div className="font-display mb-4 bold"> Experiences</div>
            {ExperienceItems.map((data, idx) => {
              return (
                <div
                  key={idx}
                  className="transition   flex justify-between  hover:bg-gray-100 duration-75 rounded-lg p-4 hover:cursor-pointer"
                >
                  <div style={{ minWidth: 60 }}>
                    <Image
                      src={data.img}
                      width={50}
                      height={50}
                      objectFit={'contain'}
                    />
                  </div>
                  <div className="font-body pl-4 w-full pb-2">
                    <div className="flex justify-between w-full pb-2">
                      <div className=" font-display pb-2">
                        <div className="pb-2 bold"> {data.title} </div>
                        <div>📍 Singapore</div>
                        <div className="font-display   ">{data.desc}</div>
                      </div>
                      <div className="font-display  text-gray-400 min-w-24 ">
                        {data.time}
                      </div>
                    </div>
                    <div className="flex mt-1">
                      {data?.tags.map((tag) => {
                        return (
                          <div
                            className="px-4 py-1 rounded-xl text-sm mr-2"
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
          <div className="rounded-lg bg-gray-100 p-8 mt-4">
            <div className="font-display mb-4 bold">Education</div>
            {EducationItems.map((data, idx) => {
              return (
                <div
                  key={idx}
                  className="transition   flex justify-between  hover:bg-gray-100 duration-75 rounded-lg p-4 hover:cursor-pointer"
                >
                  <div style={{ minWidth: 60 }}>
                    <Image
                      src={data.img}
                      width={50}
                      height={50}
                      objectFit={'contain'}
                    />
                  </div>
                  <div className="font-body pl-4 w-full pb-2">
                    <div className="flex justify-between w-full pb-2">
                      <div className=" font-display  pb-2">
                        <div className="pb-2 bold"> {data.title} </div>
                        <div className="font-display   ">{data.desc}</div>
                      </div>
                      <div className="font-display  text-gray-400">
                        {data.time}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <Link href={EXTERNAL_LINKS.LINKEDIN}>
            <a className="hover:underline flex items-center">
              Learn more on linkedin <BiLinkExternal />
            </a>
          </Link>
          <div>Download CV</div> */}
        </div>
      </>
    </>
  );
}
