import { useProjects } from '@api';
function BlogSection() {
  const { data, error } = useProjects();
  const projects = [
    {
      title: 'Probabilistic Machine Learning — Part 1: Overview',
      img: 'https://miro.medium.com/max/700/1*m9JE9YIbM57DkBU49SsoLA.jpeg',
      desc: 'A collection (1500+ solutions) of algorithms from Leetcode, Codeforces, Uhunt, Hackerrank and more',
      url: 'https://yosuamuliawan.medium.com/probabilistic-machine-learning-part-1-overview-3dc7170d9bde',
      date: '2020-05-01',
    },
    {
      title: 'When building a data centre',
      img: 'https://miro.medium.com/max/700/1*m9JE9YIbM57DkBU49SsoLA.jpeg',
      desc: 'A collection (1500+ solutions) of algorithms from Leetcode, Codeforces, Uhunt, Hackerrank and more',
      url: 'https://yosuamuliawan.medium.com/when-building-a-data-center-62f843e3a8b6',
      date: '2020-05-01',
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4  mt-8">
      {projects?.map((data) => {
        return (
          <a
            href={data.url}
            className="flex justify-between mb-2  duration-75 rounded-lg p-4 hover:cursor-pointer"
          >
            <div>
              <div className="font-display">{data.title}</div>{' '}
              {/* <a className="font-display  text-gray-400">{data.desc}</a> */}
            </div>
            <div className="font-display  text-gray-400">{data.date}</div>
          </a>
        );
      })}
      <div className="font-display pb-4">
        Disclaimer: all writings here are my own and do not represent any of my
        current and past employer.
      </div>
    </div>
  );
}
export default BlogSection;
