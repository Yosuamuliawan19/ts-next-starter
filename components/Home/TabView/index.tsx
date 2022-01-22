import { ContentLayout } from '@components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AchievementSection from './AchievementsSection';
import BlogSection from './BlogSection';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import styles from './index.module.css';

const tabsList = [
  {
    label: <div className="w-max">🛠 Projects</div>,
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
    label: 'Extraculliculars',
    key: 'Extraculliculars',
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
    <div className="relative">
      <ContentLayout>
        <div
          className={
            'flex sticky top-14 bg-white overflow-x-scroll pt-4 z-max ' +
            styles.navbar
          }
        >
          {tabsList.map((data) => {
            return (
              <motion.button
                whileHover={{ scale: 1.05, opacity: 0.85 }}
                whileTap={{ scale: 0.9 }}
                onClick={(_) => setCurrentTab(data)}
                className={
                  'px-4 py-2 rounded-lg text-md mr-4 font-display bold w-max '
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
              </motion.button>
            );
          })}
        </div>
        {currentTab.content && currentTab.content}
      </ContentLayout>
    </div>
  );
}
