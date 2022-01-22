import styles from './index.module.css';
import { ContentLayout } from '@components';
export default function ExperienceSection() {
  return (
    <>
      <div className={'py-32 ' + styles.footer}>
        <ContentLayout>
          <div className="font-display bold text-2xl mb-2 ">💬 Lets chat!</div>
          <div
            className={`max-w-md font-display bold text-lg  mb-4  ${styles.subtitle}`}
          >
            Every good thing starts with a conversation. Send an email my way
            and we can talk about tech, design and pop-culture
          </div>
          <button
            className={`font-display mb-4 rounded-full bg-white text-green-600 bold px-4 py-2 text-sm  ${styles.button}`}
          >
            Get in touch
          </button>
          <div className={`font-display text-xs`}>
            © Yosua Muliawan, made with lots of ❤️ and ☕ from SG
          </div>
        </ContentLayout>
      </div>
    </>
  );
}
