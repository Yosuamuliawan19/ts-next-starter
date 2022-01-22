import { useProjects } from '@api';

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

export default GitSection;
