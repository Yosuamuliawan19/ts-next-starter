import { useProjects } from '@api';
import Link from 'next/link';
import { AiOutlineAlert } from 'react-icons/ai';
import styles from './index.module.css';
function ProjectItem(props) {
  const { data } = props;
  return (
    <div className={'flex my-2 flex-col md:flex-row'}>
      <div
        style={{ minWidth: 420, height: 220, position: 'relative' }}
        className={styles.projectCard + ' rounded-2xl  '}
      >
        <img
          className={
            'cursor-pointer object-cover hover:shadow-xl transition duration-400 rounded-2xl '
          }
          src={data.image_url}
          style={{ width: '420px', height: '220px' }}
          onClick={() => {
            window.open(data.url, '_blank');
          }}
        />

        <div className="rounded-full px-4 py-1 font-display text-xs shadow-md  w-max bold relative -top-8 bg-white left-2">
          {data.year}
        </div>
        <div className="rounded-full px-4 py-1 font-display text-xs shadow-md  w-max bold absolute bottom-2 bg-white right-2">
          Visit
        </div>
      </div>
      <div className="block p-8">
        <div
          className="hidden md:block font-display bold hover:underline hover:cursor-pointer"
          onClick={() => {
            window.open(data.url, '_blank');
          }}
        >
          {data?.title}
        </div>{' '}
        <div
          className="font-display bold text-sm text-gray-400 pb-1"
          style={{ color: '#14a01d' }}
        >
          {data?.subtitle}
        </div>{' '}
        <div className="font-display text-gray-400  text-sm ">
          {data?.description}
        </div>{' '}
        <button
          className="hover:opacity-80 font-display bold flex items-center text-sm w-max py-3 px-8 mt-2 rounded-full"
          style={{ color: 'green', backgroundColor: '#e4f1e8' }}
          onClick={() => {
            window.open(data.url, '_blank');
          }}
        >
          {data.call_to_action} <AiOutlineAlert />
        </button>
      </div>
    </div>
  );
}
function ProjectsSection() {
  const { data, error } = useProjects();
  let projects = data?.projects || [];
  projects = projects.sort((a, b) => {
    return a.priority - b.priority;
  });
  return (
    <div className="grid grid-cols-1 gap-4 mt-4 mb-8">
      <div className="font-display">
        {' '}
        Passion projects, experiments, open source and more
      </div>
      {projects?.map((data, idx) => {
        return <ProjectItem data={data} key={idx} />;
      })}
      <div className="flex items-center justify-center">
        <Link href="/projects">
          <a
            className="font-display bold flex justify-center items-center text-sm w-full py-3 px-8 mt-2 rounded-full"
            style={{ color: 'green', backgroundColor: '#e4f1e8' }}
          >
            View all
          </a>
        </Link>
      </div>
    </div>
  );
}
export default ProjectsSection;
