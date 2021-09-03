/*
 * Internal components
 */
import Link from 'next/link';
import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { saveJob } from '@api/jobs';
import { useToast } from '@chakra-ui/react';
import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
import { capitalize } from '@helpers';

const SavedJobs = (props) => {
  const { saved, onSaveJob } = props;
  const isMobile = useCheckMobileScreen();

  const toast = useToast();

  const renderSavedIcon = (saved) => {
    if (saved) {
      return (
        <AiFillHeart
          className={'text-lg fill-current  text-red-500 cursor-pointer'}
        />
      );
    }
    return <AiOutlineHeart className={'text-lg  cursor-pointer'} />;
  };

  const onSaveJobs = async (e, id) => {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    try {
      const res = await saveJob(id);
      toast({
        title: 'Successfully saved job',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      onSaveJob();
    } catch (e) {
      toast({
        title: 'Error encountered',
        description: e.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const renderMobileView = (data) => (
    <div className="flex items-center mb-4 justify-between">
      <div className={'flex'}>
        <img className="w-12 h-12 mr-4" src={data.logo} />
        <div>
          <div className="bold">{data.title}</div>
          <div className="flex mt-2">
            <div className="mr-4">🏢 {data.company}</div>
            <div className="mr-4">📍{data.location}</div>
          </div>
          <div className="flex flex-wrap mt-2">
            <div className="rounded-2xl bg-green-100 border-2 text-green-500 border-green-500 w-fit px-2 mr-2 mb-2">
              {data.location}
            </div>
            {data.type.length > 0 &&
              data.type.map((type) => (
                <div className="rounded-2xl bg-purple-100 border-2 text-purple-500  border-purple-500 w-fit px-2 mr-2 mb-2">
                  {capitalize(type)}
                </div>
              ))}
          </div>
          <div
            className="absolute top-2 right-2"
            onClick={(e) => onSaveJobs(e, data.id)}
          >
            {renderSavedIcon(data?.saved)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-24 md:mb-0">
      {saved?.length === 0 && <div>Your saved jobs will appear here</div>}
      {saved?.map((data, idx) => {
        return (
          <Link href={`/jobs/${data.id}`} key={idx} prefetch>
            <div className="text-pop-up-top mb-4 rounded-xl hover:shadow-lg  transform duration-100 p-4 hover:cursor-pointer bg-white dark:text-white  text-sm   dark:bg-gray-700">
              {!isMobile ? (
                <div className="flex items-center mb-4 justify-between">
                  <div className={'flex'}>
                    <img className="w-12 h-12 mr-4" src={data.logo} />
                    <div>
                      <div className="bold">{data.title}</div>
                      <div className="flex mt-2">
                        <div className="mr-4">🏢 {data.company}</div>
                        <div>📍{data.location}</div>
                      </div>
                      <div
                        className="absolute top-2 right-2"
                        onClick={(e) => onSaveJobs(e, data.id)}
                      >
                        {renderSavedIcon(data?.saved)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center ">
                    <div className="rounded-2xl bg-green-100 border-2 text-green-500 border-green-500 w-fit px-2 mr-2">
                      {data.location}
                    </div>
                    {data.type.length > 0 &&
                      data.type.map((type) => (
                        <div className="rounded-2xl bg-purple-100 border-2 text-purple-500  border-purple-500 w-fit px-2 mr-2">
                          {capitalize(type)}
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                renderMobileView(data)
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SavedJobs;
