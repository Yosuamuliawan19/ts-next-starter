import { ContentLayout } from '@components';
import styles from './index.module.css';
import { motion } from 'framer-motion';

export default function ExposureSection() {
  return (
    <ContentLayout>
      <motion.div
        animate={{ scale: [0.5, 1.1, 1] }}
        transition={{ duration: 0.5 }}
        className={
          'font-display p-4 rounded-xl flex flex-col md:flex-row bg-green-100 ' +
          styles.container
        }
      >
        <div className="p-4">
          <div className="mt-2 bold text-green-500">
            I like creating web apps that are delightful to use, in code that is
            easy to maintain and understand.
          </div>
          <div className="mt-2">
            I also have an eclectic mix of interests, which includes competitive
            programming, software engineering, and machine learning / data
            science.
          </div>
        </div>
        <div className="p-4">
          <div className="mt-2 bold  text-green-500">
            Through my undergraduate dissertation and my current studies at NUS,
            i am also very interested in the world of machine learning/ data
            science
          </div>
          <div className="mt-2">
            In my spare time, i enjoy catching up on the latest research in
            AI/ML as well as playing around with ML models
          </div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
