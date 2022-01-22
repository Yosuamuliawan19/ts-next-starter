import { useProjects } from '@api';
import { ContentLayout } from '@components';
import { useState } from 'react';
import BlogSection from '../BlogSection';
import ExperienceSection from '../ExperienceSection';
import ProjectsSection from '../ProjectsSection';

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

function AchievementSection() {
  const { data, error } = useProjects();
  const projects = [
    {
      title: 'Runner Up - Best Graduate - School of Computer Science',
      desc: 'Binus University - Second highest GPA in cohort 3.93 / 4.00',
    },
    {
      title:
        'Organizing committee (property division) of TEDxBinusUniversity: Loud Voices',
      desc: 'Year - 2018',
    },
    {
      title: 'Head of Event and Design',
      desc: ' Freshman Enrichment Program 2018 (undergraduate induction)',
    },
    {
      title: '21st Student Led Conference, - Best Teamwork Award',
      desc: ' Hwa Chong International School, Singapore (2015)',
    },

    {
      title: 'United Nations Day Film Festival - Piaget Academy',
      desc: '(2015) - 1st Place winner, (2014) - 2nd Place runner up, (2013) - Semifinalist',
    },

    {
      title: 'ICAS  Distinction in Mathematics and Science.',
      desc: 'Years 2014 and 2015',
    },
  ];
  const contests = [
    'ICPC Regional Singapore 2018, National University of Singapore (NUS) - Candidate finalist',
    'Compsphere 2018 Programming Rush, President University - 8th Place',
    'ICPC Regional Jakarta 2018, Bina Nusantara University',
    'ICPC CompFestX Multi-Provincial 2018, University of Indonesia (UI)',
    'ICPC Maranatha Provincial 2018, Maranatha Christian University',
    'ICPC Indonesia Vocomfest Provincial 2018, Universitas Gajah Mada (UGM)',
    'National Programming Contest Schematics 2018, ITS',
  ];
  return (
    <div className="grid grid-cols-1 gap-4  my-8">
      {projects?.map((data) => {
        return (
          <div className="mb-2">
            <div className="font-display">{data.title}</div>{' '}
            <a className="pl-8 font-display bold text-gray-400">{data.desc}</a>
          </div>
        );
      })}
      <div className="font-display">
        Represented Binus University's competitive programming team in:
      </div>
      <a className="font-display bold text-gray-400">Competitive Programming</a>
      {contests?.map((data) => {
        return (
          <div className="mb-1">
            <div className="pl-8 font-display">- {data}</div>{' '}
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
    label: <>Experience</>,
    key: 'work',
    content: <ExperienceSection />,
  },
  {
    label: 'Achievements',
    key: 'Achievements',
    content: <AchievementSection />,
  },

  // {
  //   label: 'Certifications',
  //   key: 'Certifications',
  //   content: <BlogSection />,
  // },

  // {
  //   label: 'Github',
  //   key: 'Github',
  //   content: <GitSection />,
  // },
  // {
  //   label: 'Art',
  //   key: 'Art',
  // },
];
export default function TabCollections() {
  const [currentTab, setCurrentTab] = useState(tabsList[0]);
  return (
    <>
      <ContentLayout>
        <div className="flex sticky top-0 ">
          {tabsList.map((data) => {
            return (
              <button
                onClick={(_) => setCurrentTab(data)}
                className={
                  'px-4 py-2 rounded-lg text-md mr-4 font-display bold '
                }
                style={
                  data.key === currentTab.key
                    ? { backgroundColor: '#fef3c7', color: '#b45309' }
                    : {
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        color: 'rgba(0,0,0,0.7)',
                      }
                }
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
