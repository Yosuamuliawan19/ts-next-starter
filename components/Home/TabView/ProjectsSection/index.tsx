import { useProjects } from '@api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './index.module.css';
import { BiLinkExternal } from 'react-icons/bi';
function ProjectItem(props) {
  const { data } = props;

  if (data.priority === 420) {
    return null;
  }
  const arr = data.subtitle.split('&_tags=');
  const tags = arr.length > 1 ? arr[1].split(',') : [];
  const subtitle = arr.length > 0 ? arr[0] : '';
  return (
    <div className={'flex my-2 flex-col md:flex-row  '}>
      <div
        className={
          styles.projectCard +
          ' rounded-2xl w-full  md:w-96 h-52 relative overflow-hidden bg-green-100'
        }
      >
        <motion.div
          whileHover={{ scale: 0.9, shadow: '10px 10px 10px rgba(0,0,0,0.75)' }}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          // style={{ minWidth: 420, height: 220, position: 'relative' }}
          className={
            styles.projectCard + ' rounded-2xl w-full  md:w-96 h-52 relative '
          }
        >
          <motion.div>
            <img
              className={
                'cursor-pointer object-cover rounded-2xl scale-100 w-full md:w-96 h-52  '
              }
              src={data.image_url}
              // style={{ width: '420px', height: '220px' }}
              onClick={() => {
                window.open(data.url, '_blank');
              }}
            />
          </motion.div>

          <div className="rounded-full px-4 py-1 font-display text-xs shadow-md  w-max bold relative -top-8 bg-white left-2">
            {data.year}
          </div>
          {/* <div className="rounded-full px-4 py-1 font-display text-xs shadow-md  w-max bold absolute bottom-2 bg-white right-2">
            Visit
          </div> */}
        </motion.div>
      </div>
      <div className="block p-4 md:p-8">
        <div
          className=" md:block font-display bold hover:underline hover:cursor-pointer"
          onClick={() => {
            window.open(data.url, '_blank');
          }}
        >
          {data?.title}
        </div>{' '}
        {tags.length === 0 && (
          <div
            className="font-display bold text-sm text-gray-400 pb-1"
            style={{ color: '#14a01d' }}
          >
            {subtitle}
          </div>
        )}
        <div className=" pb-1 flex" style={{ color: '#14a01d' }}>
          {tags.map((data) => {
            return (
              <div className="my-2 rounded-md mr-2 bg-green-100 text-green-500 font-display  flex items-center text-sm  px-2 py-1">
                {data}
              </div>
            );
          })}
        </div>{' '}
        <div className="font-display text-gray-400  text-sm ">
          {data?.description}
        </div>{' '}
        <motion.button
          whileHover={{ scale: 1.1, opacity: 0.85 }}
          whileTap={{ scale: 0.9 }}
          className="bg-green-100 text-green-500 hover:opacity-80 font-display bold flex items-center text-sm w-max py-3 px-8 mt-2 rounded-full"
          onClick={() => {
            window.open(data.url, '_blank');
          }}
        >
          <div className="mr-2">{data.call_to_action}</div>
          <BiLinkExternal />
        </motion.button>
      </div>
    </div>
  );
}
function ProjectsSectionCategorized() {
  const { data, error } = useProjects();
  let projects = data?.projects || [];
  projects = projects.sort((a, b) => {
    return a.priority - b.priority;
  });
  return (
    <div className="grid grid-cols-1 gap-4 mt-4 mb-8 ">
      <div className="flex justify-between">
        <div className="font-display ">
          Passion projects, experiments, open source and more
        </div>
        {/* <input
          className="rounded-full py-1 px-2 border-gray-200 border-2 bg-gray-100 "
          value={'Filter = Typescript'}
        /> */}
      </div>

      {projects?.map((data, idx) => {
        return <ProjectItem data={data} key={idx} />;
      })}
      <div className="flex items-center justify-center">
        <Link href="/projects">
          <a className="bg-green-100 text-green-500 font-display bold flex justify-center items-center text-sm w-full py-3 px-8 mt-2 rounded-full">
            View all
          </a>
        </Link>
      </div>
    </div>
  );
}
export default ProjectsSectionCategorized;
