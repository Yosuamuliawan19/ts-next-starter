import { ContentLayout } from '@components';
import { useProjects } from '@api';
import { useState } from 'react';
function ProjectsSection() {
  const { data, error } = useProjects();
  const projects =
    data?.projects?.sort((a, b) => a.priority < b.priority) || [];
  return (
    <div className="grid grid-cols-1 gap-4 mt-8">
      {projects?.map((data) => {
        return (
          <div className="flex">
            <div style={{ minWidth: 420, height: 220 }}>
              <img
                className="cursor-pointer rounded-2xl object-cover hover:shadow-xl transition duration-400"
                src={data.image_url}
                style={{ width: '420px', height: '220px' }}
                // width={50}
                // height={50}
                // objectFit={'contain'}
              />
              <div className="rounded-full px-4 py-1 font-display text-xs shadow-md w-min relative -top-8 bg-white left-2">
                {' '}
                {data.year}
              </div>
            </div>
            <div className="block p-4">
              <div className="font-display">{data?.title}</div>{' '}
              <div
                className="font-display bold text-sm"
                style={{ color: '#14a01d' }}
              >
                {data?.subtitle}
              </div>{' '}
              <div className="font-display text-gray-400  text-sm ">
                {data?.description}
              </div>{' '}
              <a
                className="font-display bold  text-sm"
                style={{ color: 'green' }}
              >
                {data.call_to_action}
              </a>
            </div>
          </div>
        );
        return (
          <div>
            <div style={{ minWidth: 200 }}>
              <img
                className="cursor-pointer rounded-lg object-contain hover:shadow-xl transition duration-400"
                src={data.image_url}
                style={{ width: '300px' }}
                // width={50}
                // height={50}
                // objectFit={'contain'}
              />
              <div className="rounded-full px-4 py-1 font-display text-xs shadow-md w-min relative -top-8 bg-white left-2">
                {' '}
                {data.year}
              </div>
            </div>
            <div className="font-display">{data.title}</div>{' '}
            <a className="font-display bold" style={{ color: 'green' }}>
              {data.call_to_action}
            </a>
          </div>
        );
      })}
    </div>
  );
}
function GitSection() {
  const { data, error } = useProjects();
  const projects = [
    {
      title: 'Algorithm Bank',
      desc: 'A collection (1500+ solutions) of algorithms from Leetcode, Codeforces, Uhunt, Hackerrank and more',
      url: '',
    },
    {
      title: 'Next TS Starter',
      desc: 'Start doing any project in less than 5 minutes. Just add your own style',
      url: '',
    },
    {
      title: 'Coin change visualizer',
      desc: 'Visualizer for coin change algorithm, implemented in react',
      url: '',
    },
    {
      title: 'Algorithm Bank',
      desc: 'A collection (1500+ solutions) of algorithms from Leetcode, Codeforces, Uhunt, Hackerrank and more',
      url: '',
    },
    {
      title: 'Next TS Starter',
      desc: 'Start doing any project in less than 5 minutes. Just add your own style',
      url: '',
    },
    {
      title: 'Coin change visualizer',
      desc: 'Visualizer for coin change algorithm, implemented in react',
      url: '',
    },
  ];
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4  mt-8">
      {projects?.map((data) => {
        return (
          <div className="mb-8">
            <div className="font-display">{data.title}</div>{' '}
            <a className="font-display bold text-gray-400">{data.desc}</a>
          </div>
        );
      })}
    </div>
  );
}

function BlogSection() {
  const { data, error } = useProjects();
  const projects = [
    {
      title: 'Probabilistic Machine Learning — Part 1: Overview',
      img: 'https://miro.medium.com/max/700/1*m9JE9YIbM57DkBU49SsoLA.jpeg',
      desc: 'A collection (1500+ solutions) of algorithms from Leetcode, Codeforces, Uhunt, Hackerrank and more',
      url: '',
    },
    {
      title: 'Probabilistic Machine Learning — Part 1: Overview',
      img: 'https://miro.medium.com/max/700/1*m9JE9YIbM57DkBU49SsoLA.jpeg',
      desc: 'A collection (1500+ solutions) of algorithms from Leetcode, Codeforces, Uhunt, Hackerrank and more',
      url: '',
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4  mt-8">
      {projects?.map((data) => {
        return (
          <div className="mb-8">
            <div className="font-display">{data.title}</div>{' '}
            <a className="font-display bold text-gray-400">{data.desc}</a>
          </div>
        );
      })}
    </div>
  );
}
const tabsList = [
  {
    label: <>🛠 Projects</>,
    key: 'projects',
    content: <ProjectsSection />,
  },
  {
    label: 'Blog',
    key: 'Blog',
    content: <BlogSection />,
  },
  {
    label: 'Github',
    key: 'Github',
    content: <GitSection />,
  },
  {
    label: 'Art',
    key: 'Art',
  },
];
export default function ExperienceSection() {
  const [currentTab, setCurrentTab] = useState(tabsList[0]);
  return (
    <>
      <ContentLayout>
        <div className="flex">
          {tabsList.map((data) => {
            return (
              <button
                onClick={(_) => setCurrentTab(data)}
                className="px-4 py-2 rounded-lg text-md mr-2 font-display bold"
                style={{ backgroundColor: '#fef3c7', color: '#b45309' }}
              >
                {data.label}
              </button>
            );
          })}
        </div>
        {currentTab.content && currentTab.content}
      </ContentLayout>
    </>
  );
}
