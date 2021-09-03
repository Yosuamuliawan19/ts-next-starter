import { getLocalDate, capitalize, checkExpired } from '@helpers';
import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
import SaveButton from '../SaveButton';
import ApplyButton from '../ApplyButton';
import { Alert, AlertIcon, Flex, Stack, VStack } from '@chakra-ui/react';
import { STATUS_TYPES } from '@constants';
interface Props {
  onSaveJobs: any;
  currentJob: any;
  onApplyJob: any;
}
export default function JobDetails({
  currentJob,
  onSaveJobs,
  onApplyJob,
}: Props) {
  const isMobile = useCheckMobileScreen();
  if (currentJob.status === STATUS_TYPES.ARCHIVED) {
    return <div>This job has beene archived</div>;
  }
  return (
    <div
      key={currentJob?.id}
      className="text-pop-up-top 90 m-auto mt-16 text-sm md:mt-4 bg-white  md:rounded-xl  fade-in-fwd dark:bg-gray-700 dark:text-white z-max_4"
    >
      <div className="p-4 md:p-8">
        <div className=" hover:cursor-pointer dark:text-white  text-sm  fade-in-fwd  ">
          {isMobile ? (
            <div className="relative">
              <div
                className="absolute right-1.5"
                onClick={(e) => onSaveJobs(e, currentJob.id)}
              >
                <SaveButton
                  saved={currentJob.saved}
                  onSuccess={onSaveJobs}
                  id={currentJob.id}
                />
              </div>
              <div className={'flex items-center'}>
                <img className="w-12 h-12 mr-4" src={currentJob?.logo} />
                <div className={'flex flex-col'}>
                  <div className="bold">{currentJob?.title}</div>
                </div>
              </div>
              <div className={'my-2'}>
                <div className=" flex">
                  <div className="mr-2">🏢 </div>
                  {currentJob?.company}
                </div>{' '}
                <div className=" flex">
                  <div className="mr-2">📍</div>
                  {currentJob?.location}
                </div>
              </div>

              <div className="flex items-start ">
                <div className="rounded-2xl bg-green-100 border-2 text-green-500 border-green-500 w-fit px-2 mr-2">
                  {currentJob?.location}
                </div>
                {currentJob?.type &&
                  currentJob?.type.length > 0 &&
                  currentJob?.type.map((type) => (
                    <div className="rounded-2xl bg-purple-100 border-2 text-purple-500  border-purple-500 w-fit px-2 mr-2">
                      {capitalize(type)}
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <>
              {checkExpired(currentJob?.status) && (
                <div className="mb-4">
                  <Alert status="error" variant="left-accent">
                    <AlertIcon />
                    This listing has expired :(
                  </Alert>
                </div>
              )}
              <div className="flex items-start justify-between">
                <div className={'flex'}>
                  <img className="w-12 h-12 mr-4" src={currentJob?.logo} />
                  <div className={'flex flex-col'}>
                    <div className="bold">{currentJob?.title}</div>
                    <div className="flex">
                      <div className="mr-4">🏢 {currentJob?.company}</div>
                      <div>📍{currentJob?.headquarters}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center ">
                  <div className="rounded-2xl bg-green-100 border-2 text-green-500 border-green-500 w-fit px-2 mr-2">
                    {currentJob?.location}
                  </div>
                  {currentJob?.type &&
                    currentJob?.type.length > 0 &&
                    currentJob?.type.map((type) => (
                      <div className="rounded-2xl bg-purple-100 border-2 text-purple-500  border-purple-500 w-fit px-2 mr-2">
                        {capitalize(type)}
                      </div>
                    ))}
                  <SaveButton
                    saved={currentJob.saved}
                    onSuccess={onSaveJobs}
                    id={currentJob.id}
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <Flex
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          alignItems="space-between"
          mt={4}
        >
          <Stack
            direction={isMobile ? 'row' : 'column'}
            alignItems="flex-start"
            mb={4}
          >
            <div className={isMobile ? 'w-1/2' : ''}>
              <div className="bold flex">Period</div>
              <div className="flex items-center">{currentJob?.period}</div>
            </div>
            <div className={isMobile ? 'w-1/2' : ''}>
              <div className="bold flex">
                <div className="mr-2">📅 </div> Job Posted on
              </div>
              <div className="flex items-center">
                {getLocalDate(currentJob?.expires)}
              </div>
            </div>
          </Stack>
          <Stack
            direction={isMobile ? 'row' : 'column'}
            alignItems="flex-start"
            mb={4}
          >
            <div className={isMobile ? 'w-1/2' : ''}>
              <div className="bold flex">Duration</div>
              <div className="flex items-center">
                {currentJob?.duration} months
              </div>
            </div>
            <div className={isMobile ? 'w-1/2' : ''}>
              <div className="bold flex">Category</div>
              <div className="flex items-center">{currentJob?.category} </div>
            </div>
          </Stack>
          <Stack
            direction={isMobile ? 'row' : 'column'}
            alignItems="flex-start"
            mb={4}
          >
            <div className={isMobile ? 'w-1/2' : ''}>
              <div className="bold flex">Hours per week</div>
              <div className="flex items-center">
                {currentJob?.hoursPerWeek}
              </div>
            </div>
            <div className={isMobile ? 'w-1/2' : ''}>
              <div className="bold flex">Year</div>
              <div className="flex flex-col ">
                {currentJob?.year?.map((data) => {
                  return <div> • {data}</div>;
                })}
              </div>
            </div>
          </Stack>
          {!isMobile && !checkExpired(currentJob?.status) && (
            <ApplyButton
              job_id={currentJob?.id}
              callback={(_) => onApplyJob()}
            />
          )}
        </Flex>
        {/*<div className=" my-4">*/}
        {/*  <div className="bold bg-gray-900 text-white rounded-lg p-2 py-1 w-min mb-2">*/}
        {/*    Qualifications*/}
        {/*  </div>*/}
        {/*  <div>{currentJob?.requirements}</div>*/}
        {/*</div>*/}
        <div className=" my-4">
          <div className="bold bg-gray-900 text-white rounded-lg p-2 py-1 w-min mb-2">
            Description
          </div>
          <div
            className={'htmlArea'}
            dangerouslySetInnerHTML={{ __html: currentJob?.description }}
          ></div>
        </div>
      </div>
    </div>
  );
}
