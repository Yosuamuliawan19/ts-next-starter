import { ContentLayout } from '@components';
import styles from './index.module.css';
export default function ExposureSection() {
  return (
    <ContentLayout>
      <div className={'font-display p-4 rounded-xl flex ' + styles.container}>
        <div className="p-4">
          <div className="mt-2 bold" style={{ color: '#42b549' }}>
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
          <div className="mt-2 bold" style={{ color: '#42b549' }}>
            Through my undergraduate dissertation and my current studies at NUS,
            i am also very interested in the world of machine learning/ data
            science
          </div>
          <div className="mt-2">
            In my spare time, i enjoy catching up on the latest research in
            AI/ML as well as playing around with ML models
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
