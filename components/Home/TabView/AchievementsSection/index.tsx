function CoursesSecttion() {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Topic
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Course
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Awarding organization
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Role
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                  alt=""
                />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  Jane Cooper
                </div>
                <div className="text-sm text-gray-500">
                  jane.cooper@example.com
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              Regional Paradigm Technician
            </div>
            <div className="text-sm text-gray-500">Optimization</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            Admin
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
              Edit
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
export default function AchievementSection() {
  const projects = [
    {
      title: 'Best Graduate - School of Computer Science',
      desc: 'Second highest GPA in cohort 3.93 / 4.00',
      year: '2020',
    },
    {
      title: 'Head of Event and Design',
      desc: ' Freshman Enrichment Program 2018 (undergraduate induction)',
      year: '2020',
    },
    {
      title:
        'Organizing committee (property division) of TEDxBinusUniversity: Loud Voices',
      desc: 'TedX Organization',
      year: '2018',
    },

    {
      title: '21st Student Led Conference, - Best Teamwork Award',
      desc: ' Hwa Chong International School, Singapore (2015)',
      year: '2015',
    },

    {
      title: 'United Nations Day Film Festival - Piaget Academy',
      desc: '(2015) - 1st Place winner, (2014) - 2nd Place runner up, (2013) - Semifinalist',
      year: '2015',
    },

    {
      title: 'ICAS  Distinction in Mathematics and Science.',
      desc: 'Years 2014 and 2015',
      year: '2015',
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

  const profiles = [
    {
      title: 'Leetcode',
      link: 'https://leetcode.com/jane_cooper',
    },
    {
      title: 'Codeforces',
      link: 'https://leetcode.com/jane_cooper',
    },
    {
      title: 'Uhunt / Uva',
      link: 'https://leetcode.com/jane_cooper',
    },
    {
      title: 'VJudge',
      link: 'https://leetcode.com/jane_cooper',
    },
  ];
  return (
    <>
      <div className="flex lg:flex-row flex-col">
        <div className="grid grid-cols-1  my-8 p-8 rounded-lg bg-gray-100">
          <a className="font-display bold mb-4">💻 Competitive Programming</a>

          <div className="font-display">
            Represented Binus University's competitive programming team in:
          </div>

          {contests?.map((data) => {
            return (
              <div className="transition  flex justify-between  hover:bg-gray-100 duration-75 rounded-lg p-4 hover:cursor-pointer">
                <div className=" font-display"> - {data}</div>
              </div>
            );
          })}
          <div className="flex items-center font-display mb-2 flex-wrap">
            <div>Profiles: </div>
            {profiles?.map((data) => {
              return (
                <a href={data.link}>
                  <div
                    style={{
                      backgroundColor: '#e4f1e8',
                      color: '#14a01d',
                    }}
                    className="rounded-full bold py-2 px-4   font-display   hover:opacity-80 ml-2  text-sm"
                  >
                    {data.title}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <div className="px-4"></div>
        <div className="grid grid-cols-1 my-8   p-8 rounded-lg bg-gray-100">
          <a className="font-display bold mb-4">🏆 Other achievements</a>
          {projects?.map((data) => {
            return (
              <div className="transition  flex justify-between  hover:bg-gray-100 duration-75 rounded-lg p-4 hover:cursor-pointer">
                <div>
                  <div className="font-display">{data.title}</div>{' '}
                  <a className=" font-display bold text-gray-400">
                    {data.desc}
                  </a>
                </div>
                <div className="pl-8 font-display bold text-gray-400">
                  {data.year}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <a className="font-display bold ">Certifications</a> */}

      {/* <CoursesSecttion /> */}
    </>
  );
}
