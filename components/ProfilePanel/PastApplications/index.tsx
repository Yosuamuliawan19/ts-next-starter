import Link from 'next/link';
import React from 'react';
/*
 * Icons
 */

const PastApplications = (props) => {
  const { applications } = props;
  return (
    <div className="mb-24 md:mb-0">
      {applications?.length === 0 && (
        <div>Your applications will appear here</div>
      )}
      {applications?.map((data, idx) => {
        return (
          <Link href={`/jobs/${data.id}`} key={idx} prefetch>
            <div className="text-pop-up-top mb-4 rounded-xl hover:shadow-lg  transform duration-100 p-4 hover:cursor-pointer bg-white dark:text-white  text-sm   dark:bg-gray-700">
              <div className=" block md:flex md:mb-4 items-center  justify-between">
                <div className={'flex '}>
                  {' '}
                  <img className="w-12 h-12 mr-4" src={data.logo} />
                  <div>
                    <div className="bold">{data.title}</div>
                    <div className="flex mt-2">
                      <div>🏢 {data.company}</div>
                      <div>📍 {data.location}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center my-4 md:my-0">
                  <div className="rounded-2xl bg-green-100 border-2 text-green-500 border-green-500 w-fit px-2 mr-2">
                    {data.location}
                  </div>
                  <div className="rounded-2xl bg-purple-100 border-2 text-purple-500  border-purple-500 w-fit px-2">
                    {data.type}
                  </div>
                </div>
              </div>
              <div className={'flex justify-between'}>
                <div className={'text-gray-500'}>
                  Applied{' '}
                  {data.created === 0 ? `today` : `${data.created} days ago`}
                </div>
                <div className={'text-gray-500'}>{data.applicationStatus}</div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default PastApplications;
