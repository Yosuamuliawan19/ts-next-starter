import { getCompany } from '@api/companies';
import {
  Divider,
  Spacer,
  Spinner,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
/*
 * Internal components
 */
import { BaseLayout } from '@components';
import AppMobileNavbar from '@components/AppMobileNavbar';
import AppNavbar from '@components/AppNavbar';
import AuthContext from '@context/Auth';
import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
// import * as Accordion from '@radix-ui/react-accordion';
import {
  getJobs,
  getJobsByCompanyID,
  getJobsByID,
  getJobsWithFilters,
} from 'api/getJobs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { AiOutlineLink, AiOutlineCloseCircle } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
/*
 * Icons
 */
// import useSWRInfinite from 'swr/infinite';

import { FcSearch } from 'react-icons/fc';
import { RiArrowDropLeftLine, RiFilter3Fill } from 'react-icons/ri';
import JobDescription from './JobDescription';
import SaveButton from './SaveButton';
import ApplyButton from './ApplyButton';
import { capitalize, checkExpired } from '@helpers/';
import { EDUCATION_LEVEL_OBJECT } from '@constants/educationLevel';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Flex,
} from '@chakra-ui/react';
import { truncate } from '@helpers';
// const getKey = (pageIndex, previousPageData) => {
//   if (previousPageData && !previousPageData.length) return null; // reached the end
//   return `/users?page=${pageIndex}&limit=10`; // SWR key
// };

export default function Home() {
  const isMobile = useCheckMobileScreen();
  /*
   * Component Internal State
   */
  const toast = useToast();

  const router = useRouter();
  const { job_id, company_id, query } = router.query;
  const { accessToken } = useContext(AuthContext);

  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState(null);

  const [currentJob, setCurrentJob] = useState({});

  const [showSuccess, setShowSuccess] = useState(false);
  const [showMobileNavHeader, setShowMobileNavHeader] = useState(true);

  const [searchQuery, setSearchQuery] = useState(query);
  const [searchPayload, setSearchPayload] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [filterShow, setFilterShow] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(
  //   getKey, fetcher?, options?
  // )

  const [filterLocation, setFilterLocation] = useState({
    'In-person': false,
    Remote: false,
  });
  const [filterType, setFilterType] = useState({
    Unpaid: false,
    Paid: false,
    'Full-time': false,
    'Part-time': false,
  });
  const [filterYear, setFilterYear] = useState({
    Freshmen: false,
    Sophomore: false,
    Junior: false,
    Senior: false,
    Masters: false,
    Phd: false,
  });
  const renderPagination = () => {
    return (
      <Flex mb={8}>
        {currentPage !== totalPages && !isLoading && (
          <Button
            onClick={(_) => setCurrentPage(currentPage + 1)}
            width={'100%'}
            mx={4}
          >
            Load more
          </Button>
        )}
      </Flex>
    );
  };

  const fetchFromQuery = async () => {
    setSearchQuery(query);
    setIsLoading(true);
    const res = await getJobs(accessToken.token, query || null, currentPage);
    setTotalPages(res?.data?.totalPages);
    if (res?.data?.page === 1) {
      setJobs(res?.data?.results);
    } else {
      if (res?.data?.results) {
        setJobs([...jobs, ...res?.data?.results]);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFromQuery();
  }, [query, currentPage]);

  const fetchCurrentJob = async () => {
    if (job_id) {
      setIsLoading(true);
      const res = await getJobsByID(accessToken.token, job_id);
      setCurrentJob(res);
      setIsLoading(false);
    }
  };

  const fetchCurrentCompany = async () => {
    if (company_id) {
      const res = await getCompany(company_id);
      setCompany(res?.data);
    }
  };

  useEffect(() => {
    (async () => {
      if (!company_id) {
        const res = await getJobs(accessToken.token, searchQuery);
        setJobs(res?.data?.results);
      }
      if (company_id) setIsLoading(true);
      fetchCurrentJob();
      if (company_id) {
        const res = await getJobsByCompanyID(accessToken.token, company_id);
        setJobs(res);
      }
      fetchCurrentCompany();
      if (company_id) setIsLoading(false);
    })();
  }, [job_id, company_id]);

  const handleQueryChange = async (event) => {
    event.preventDefault();
    
    if (event.target[0].value) {
      setSearchQuery(event.target[0].value);
      router.push(`/jobs?query=${event.target[0].value}`);
    } else {
      router.push(`/jobs?query`);
    }
  };

  const handleFilters = async (category, filter) => {
    if (category === 'location') {
      const newFilterLocation = filterLocation;
      newFilterLocation[filter] = !newFilterLocation[filter];
      setFilterLocation(newFilterLocation);
    } else if (category === 'type') {
      const newFilterType = filterType;
      newFilterType[filter] = !newFilterType[filter];
      setFilterType(newFilterType);
    } else if (category === 'year') {
      const newFilterYear = filterYear;
      newFilterYear[filter] = !newFilterYear[filter];
      setFilterYear(newFilterYear);
    }

    const payload = {
      location: filterLocation,
      type: filterType,
      year: filterYear,
    };

    if (searchQuery) {
      payload['query'] = searchQuery;
    }
    setSearchPayload(payload);
    setIsLoading(true);
    const res = await getJobsWithFilters(accessToken.token, payload);
    setJobs(res);
    setIsLoading(false);
  };
  const onSaveJobs = async () => {
    fetchCurrentJob();
    handleFilters();
  };

  const renderSidebar = () => {
    return (
      <div
        className={` h-screen w-auto overflow-y-scroll ${
          !company_id && 'pt-16'
        }`}
        style={{ width: 360 }}
      >
        {company_id && job_id && renderJobList()}
        {company_id && !job_id && renderJobList()}
        {!company_id && job_id && renderJobList()}
        {!company_id && !job_id && !isMobile && renderFilter(true)}
      </div>
    );
  };

  const renderJobList = () => {
    return (
      <div className={`${isMobile && !company_id ? 'mt-16' : 'mt-4'} mb-24`}>
        {!company_id && !isMobile && (
          <Link href={`/jobs/`}>
            <div className="cursor-pointer flex items-center text-sm m-4 bold hover:underline hover:cursor-pointer">
              <RiArrowDropLeftLine />
              Edit Filters
            </div>
          </Link>
        )}
        {isLoading && currentPage !== 1 && !job_id && !company_id && (
          <div className="flex justify-center mt-20">
            <Spinner />
          </div>
        )}
        {isMobile && jobs && jobs.length === 0 && !isLoading && (
          <div className={'w-full mt-24 flex justify-center'}>
            Sorry, we can't find a job that matches that criteria
          </div>
        )}
        {company_id && job_id && (
          <Link href={`/jobs?company_id=${company_id}`}>
            <div className="cursor-pointer flex items-center text-sm m-4 bold hover:underline hover:cursor-pointer">
              <RiArrowDropLeftLine />
              See Company Description
            </div>
          </Link>
        )}
        {jobs &&
          jobs.length > 0 &&
          jobs.map((data, idx) => {
            if (checkExpired(data.status)) {
              return '';
            }
            return (
              <Link
                href={
                  company_id
                    ? `/jobs/${data.id}?company_id=${company_id}`
                    : `/jobs/${data.id}`
                }
                key={idx}
                prefetch
              >
                <div className="cursor-pointer  text-pop-up-top rounded-xl m-4 hover:shadow-lg  transform duration-100 p-4 hover:cursor-pointer bg-white dark:text-white  text-sm   dark:bg-gray-700">
                  <div
                    onClick={(e) => onSaveJobs(e, data.id)}
                    className={'text-lg absolute right-2 top-2'}
                  >
                    {!checkExpired(data.status) && (
                      <SaveButton
                        saved={data.saved}
                        onSuccess={onSaveJobs}
                        id={data.id}
                      />
                    )}
                  </div>
                  <div className="flex items-center">
                    <img className="w-12 h-12 mr-4" src={data.logo} />
                    <div className="bold">{data.title}</div>
                  </div>
                  <div className="mt-4">
                    <div>🏢 {data.company}</div>
                    <div>📍 {data.headquarters}</div>
                  </div>
                  <div className="flex items-center mt-2 flex-wrap">
                    <div className="rounded-2xl bg-green-100 border-2 text-green-500 border-green-500 w-fit px-2 mr-2 mb-1">
                      {data.location}
                    </div>
                    {data.type.length > 0 &&
                      data.type.map((type) => (
                        <div className="rounded-2xl bg-purple-100 border-2 text-purple-500  border-purple-500 w-fit px-2 mr-2 mb-1">
                          {capitalize(type)}
                        </div>
                      ))}
                  </div>
                </div>
              </Link>
            );
          })}
        {!company_id && renderPagination()}
      </div>
    );
  };
  const renderJobListComplex = () => {
    let expireIdx = jobs?.length + 10;
    jobs?.map((data, idx) => {
      if (checkExpired(data.status)) {
        expireIdx = Math.min(expireIdx, idx);
      }
    });

    return (
      <div>
        {isLoading && currentPage !== 1 && <Spinner />}

        {jobs?.map((data, idx) => {
          return (
            <>
              {expireIdx === idx ? (
                <VStack>
                  <Text color="grey" mt={4}>
                    Expired Listings
                  </Text>
                  <Divider colorScheme="red" />
                </VStack>
              ) : null}
              <div className="cursor-pointer  text-pop-up-top rounded-xl m-4 hover:shadow-lg  transform duration-100  p-4 cursor-pointer bg-white dark:text-white  text-sm   dark:bg-gray-700">
                <Link href={`/jobs/${data.id}`} key={idx} prefetch>
                  <a>
                    <div className="  flex start border-b-2 border-b-gray-200 pb-4 mb-4 justify-between  ">
                      <div className="flex items-center">
                        <img className="w-12 h-12 mr-4" src={data.logo} />
                        <div className={'flex-col'}>
                          <div className="bold">{data.title}</div>
                          <div className=" flex">
                            <div className="mr-4">🏢 {data.company}</div>
                            <div>📍{data.headquarters}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start ">
                        <div className="rounded-2xl bg-green-100 border-2 text-green-500 border-green-500 w-fit px-2 mr-2">
                          {data.location}
                        </div>
                        {data.type.length > 0 &&
                          data.type.map((type) => (
                            <div className="rounded-2xl bg-purple-100 border-2 text-purple-500  border-purple-500 w-fit px-2 mr-2">
                              {capitalize(type)}
                            </div>
                          ))}
                        <SaveButton
                          saved={data.saved}
                          onSuccess={onSaveJobs}
                          id={data.id}
                        />
                      </div>
                    </div>
                    <div>
                      <div className={'bold'}>Description</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncate(data?.description),
                        }}
                      ></div>
                    </div>
                  </a>
                </Link>
              </div>
            </>
          );
        })}
        {renderPagination()}
      </div>
    );
  };
  const renderFilter = (showFilter) => {
    let slideOverClassName =
      '  bg-white   transform duration-500 dark:bg-gray-700 dark:text-white opacity-1  rounded-lg ml-4';
    if (isMobile) {
      slideOverClassName += 'z-max';
    }
    return (
      <div className={!showFilter ? 'hidden' : ''}>
        <div className="flex items-center text-sm ml-4 mt-4 mb-2 bold">
          Filters
        </div>
        <div className={slideOverClassName}>
          <div className="w-full text-sm py-4 px-2">
            <Accordion allowMultiple={true} defaultIndex={[0, 1, 2]}>
              <AccordionItem border={'none'}>
                {/*<h2>*/}
                <AccordionButton>
                  <div className={'flex justify-between w-full text-sm'}>
                    Location
                    <AccordionIcon />
                  </div>
                </AccordionButton>
                {/*</h2>*/}
                <AccordionPanel pb={4}>
                  <div className="flex items-center flex-wrap">
                    <input
                      type="checkbox"
                      id="vehicle3"
                      name="vehicle3"
                      value="Boat"
                      className="mr-2"
                      onClick={() => handleFilters('location', 'In-person')}
                    />
                    <div>In-person</div>
                    <input
                      type="checkbox"
                      id="vehicle3"
                      name="vehicle3"
                      value="Boat"
                      className="ml-4 mr-2"
                      onClick={() => handleFilters('location', 'Remote')}
                    />
                    <div>Remote</div>
                  </div>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border={'none'}>
                <AccordionButton>
                  <div className={'flex justify-between w-full  text-sm'}>
                    Internship Type
                    <AccordionIcon />
                  </div>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <div className="flex items-center w-full flex-wrap">
                    {['Full-time', 'Part-time', 'Paid', 'Unpaid'].map(
                      (data) => {
                        return (
                          <div className="flex  items-center mr-4">
                            <input
                              type="checkbox"
                              className="mr-2"
                              value={data}
                              onClick={() => handleFilters('type', data)}
                            />
                            <div>{data}</div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border={'none'}>
                <AccordionButton>
                  <div className={'flex justify-between w-full  text-sm'}>
                    School Year
                    <AccordionIcon />
                  </div>
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <div className="flex items-center flex-wrap">
                    {Object.keys(EDUCATION_LEVEL_OBJECT).map((key) => {
                      return (
                        <div className="flex items-center mr-4">
                          <input
                            type="checkbox"
                            className="mr-2"
                            value={key}
                            onClick={() =>
                              handleFilters('year', EDUCATION_LEVEL_OBJECT[key])
                            }
                          />
                          <div>{capitalize(key)}</div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    );
  };

  const ActionBottomSheet = () => {
    const [loading, setLoading] = useState(false);

    let containerClassName =
      'z-max_4 p-2 bg-white fixed bottom-8 left-1/2 rounded-2xl border-gray-300 font-display flex shadow-2xl dark:bg-gray-700';
    if (isMobile) {
      containerClassName =
        'flex w-full px-4 py-4 fixed bottom-0  bg-white  z-max_1 justify-end items-center  dark:bg-gray-800  dark:text-white shadow-lg';
    }

    return (
      <div className={containerClassName}>
        {!checkExpired(currentJob?.status) && (
          <ApplyButton
            disabled={checkExpired(currentJob?.status)}
            job_id={job_id}
            callback={(_) => setShowSuccess(true)}
          />
        )}
      </div>
    );
  };
  const renderMobileHeader = () => {
    let headerClassName =
      '  w-full px-4 py-2 fixed top-0 bg-white  z-max_1 transform duration-500 items-center  dark:bg-gray-800  dark:text-white text-sm font-display';
    if (!showMobileNavHeader) {
      headerClassName = headerClassName + '  -translate-y-20';
    }
    const renderSearchBar = () => {
      return (
        <form
          className={
            'rounded-xl border-2 dark:bg-gray-600 border-gray-200 dark:border-none w-full px-4 py-2  flex items-center '
          }
          onSubmit={handleQueryChange}
        >
          <input
            className={'w-full  dark:text-white dark:bg-gray-600'}
            placeholder={`Search jobs`}
          />
          <button>
            <FcSearch className={''} />
          </button>
        </form>
      );
    };
    if (job_id) {
      return (
        <div className={headerClassName}>
          <div className="flex items-center py-2">
            <BiArrowBack
              onClick={(_) => router.back()}
              className="text-2xl mr-4"
            />
            <div>Back</div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            'flex  z-max_1 w-full fixed top-0 left-0 bg-white items-center p-2'
          }
        >
          {renderSearchBar()}
          <button
            className={'text-lg ml-4'}
            onClick={() => setFilterShow(!filterShow)}
          >
            <RiFilter3Fill />
          </button>
        </div>
      );
    }
  };
  const renderCompanyHeader = () => {
    if (job_id && isMobile) return null;
    return (
      <div className="flex rounded-xl p-4 bg-white dark:bg-gray-600 dark:text-white text-sm relative">
        <img className="w-12 h-12 mr-4" src={company?.logo} />
        <div className="flex justify-between w-full items-start">
          <div className="flex flex-col">
            <div className={'bold text-lg'}>{company?.name} </div>
            <div>📍 {company?.headquarters}</div>
          </div>
          <div className="flex flex-col items-end">
            <a
              href={company?.website}
              target={'_blank'}
              className="flex items-center"
            >
              <AiOutlineLink className="mr-2" /> Website
            </a>
            {!isMobile ? (
              <div>
                {company?.industry} - {company?.size}
              </div>
            ) : (
              <div>{company?.industry}</div>
            )}
          </div>
          <div
            className={'text-md absolute top-1 right-1 cursor-pointer'}
            onClick={(_) => router.push(`/jobs`)}
          >
            <AiOutlineCloseCircle />
          </div>
        </div>
      </div>
    );
  };

  const renderCompanyDescription = () => {
    return (
      <div className="90 m-auto text-sm md:mt-8 bg-white  md:rounded-xl  fade-in-fwd dark:bg-gray-700 dark:text-white z-max_4">
        <div className="p-4 md:p-8">
          <div className="font-bold mb-4">About the Company</div>
          <div>{company?.description}</div>
        </div>
      </div>
    );
  };
  const renderSuccess = () => {
    return (
      <div
        className={
          'text-pop-up-top fixed top-0 left-0 h-screen w-screen flex flex-col z-max bg-white items-center font-display justify-center'
        }
      >
        <Confetti recycle={false} />
        <div className={'text-2xl  mb-2'}>Congratulations!</div>
        <div className={' mb-2'}>
          You have successfully applied to the job for:
        </div>
        <div className={'mb-12'}>
          {currentJob?.title} at {currentJob?.company}
        </div>
        <Link href={'/profile'}>
          <div
            className={
              'rounded-md px-4 bg-blue-500 text-white py-2 mb-4  cursor-pointer'
            }
          >
            Go to dashboard
          </div>
        </Link>
        <Link href={'/jobs'}>
          <div className={'flex flex-col items-center cursor-pointer'}>
            <div className={'text-md text-gray-700'}>Continue browsing</div>
          </div>
        </Link>
      </div>
    );
  };
  return (
    <>
      {showSuccess && renderSuccess()}
      {!company_id && isMobile && renderMobileHeader()}
      {company_id && job_id && isMobile && renderMobileHeader()}
      {!isMobile && <AppNavbar />}
      {isMobile && !job_id && <AppMobileNavbar />}
      {isMobile && renderFilter(filterShow)}
      {isMobile && (
        <BaseLayout
          className={`font-display md:bg-gray-100 dark:bg-gray-800 ${
            filterShow ? 'hidden' : ''
          }`}
        >
          <div className="max-w-screen-xl mx-auto">
            <div className=" md:pt-16">
              {company_id && renderCompanyHeader()}
              <div className="flex">
                {!isMobile && renderSidebar()}
                <div className="w-full z-max_4 md:h-screen md:overflow-y-auto ">
                  {!isLoading && !job_id && renderJobList()}
                  {!isLoading && job_id && (
                    <JobDescription
                      currentJob={currentJob}
                      onSaveJobs={onSaveJobs}
                      onApplyJob={(_) => setShowSuccess(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </BaseLayout>
      )}

      {!isMobile && (
        <>
          <BaseLayout className="font-display md:bg-gray-100 dark:bg-gray-800 md:h-screen">
            <div className="max-w-screen-xl mx-auto md:h-screen">
              <div className={company_id ? 'pt-20' : ''}>
                {company_id && renderCompanyHeader()}
                <div className="flex">
                  {renderSidebar()}
                  <div
                    className={`w-full md:h-screen md:overflow-y-auto ${
                      !company_id && 'pt-16'
                    }`}
                  >
                    {isLoading && (
                      <div className="flex m-24 justify-center">
                        <Spinner size="lg" className="w-full" />
                      </div>
                    )}
                    {!isLoading &&
                      !job_id &&
                      company_id &&
                      renderCompanyDescription()}
                    {jobs && jobs?.length === 0 && !job_id && !isLoading && (
                      <div className={'w-full my-8 flex justify-center'}>
                        Sorry, we can't find a job that matches that criteria
                      </div>
                    )}
                    {!isLoading &&
                      !company_id &&
                      !job_id &&
                      renderJobListComplex()}
                    {!isLoading && job_id && (
                      <JobDescription
                        currentJob={currentJob}
                        onSaveJobs={onSaveJobs}
                        onApplyJob={(_) => setShowSuccess(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </BaseLayout>
        </>
      )}

      {job_id && isMobile && <ActionBottomSheet />}
    </>
  );
}
