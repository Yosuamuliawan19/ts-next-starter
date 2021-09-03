import { getCompanies } from '@api/companies';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { BaseLayout } from '@components';
import AppMobileNavbar from '@components/AppMobileNavbar';
import AppNavbar from '@components/AppNavbar';
import { INDUSTRIES_LIST } from '@constants/industry';
import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
import * as Accordion from '@radix-ui/react-accordion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillFilter } from 'react-icons/ai';
import { BsFillGridFill } from 'react-icons/bs';
import { FiChevronDown } from 'react-icons/fi';
import { HiOutlineViewList } from 'react-icons/hi';
import { getJobs } from '@api/getJobs';
export default function Home() {
  const isMobile = useCheckMobileScreen();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showMobileNavHeader, setShowMobileNavHeader] = useState(true);
  const router = useRouter();
  const { company_id } = router.query;
  const [industries, setIndustries] = useState([]);
  const [companySearchTerm, setCompanySearchTerm] = useState('');

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCompanies = async () => {
    setLoading(true);
    let payload = { page: currentPage };
    if (industries.length > 0) {
      payload = {
        industry: industries,
      };
    }
    console.log('payload', payload);
    const res = await getCompanies(payload);
    setTotalPages(res?.data?.totalPages);
    if (res?.data?.page === 1) {
      setCompanies(res?.data?.results);
    } else {
      setCompanies([...companies, ...res?.data?.results]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, [industries, currentPage]);

  const [viewMode, setViewMode] = useState('grid');
  const toggleViewMode = () => {
    if (viewMode === 'list') {
      setViewMode('grid');
    } else {
      setViewMode('list');
    }
  };
  const renderFilter = () => {
    return (
      <div className="w-full ">
        <Accordion.Root
          type="multiple"
          defaultValue={['location', 'type', 'year']}
        >
          <Accordion.Item value="location">
            <Accordion.Header>
              <div className="flex w-full justify-between">
                Industry
                <Accordion.Trigger>
                  <FiChevronDown />
                </Accordion.Trigger>
              </div>
            </Accordion.Header>
            <Accordion.Content>
              <div className="flex items-center flex-wrap">
                {INDUSTRIES_LIST.map((data) => {
                  return (
                    <div className="mr-2 items-center flex">
                      <input
                        type="checkbox"
                        id={data}
                        name={data}
                        value={data}
                        checked={industries.includes(data)}
                        className="mr-2"
                        onClick={() => {
                          let newIndustries = [...industries];
                          if (newIndustries.includes(data)) {
                            newIndustries = newIndustries.filter(function (
                              item
                            ) {
                              return item !== data;
                            });
                          } else {
                            newIndustries = [...newIndustries, data];
                          }
                          console.log(newIndustries);
                          setIndustries(newIndustries);
                        }}
                      />
                      <div>{data}</div>
                    </div>
                  );
                })}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
    );
  };
  const renderSidebar = () => {
    return (
      <div
        className=" h-screen w-auto overflow-y-scroll  md:pt-16 "
        style={{ width: 360 }}
      >
        <div className="flex justify-center items-center flex-col rounded-xl m-4 p-4 hover:cursor-pointer bg-white   text-sm ">
          {/* <Input
            value={companySearchTerm}
            onChange={(e) => setCompanySearchTerm(e.target.value)}
            placeholder="Search companies"
            size="md"
          /> */}

          {renderFilter()}
        </div>
      </div>
    );
  };
  const renderViewModeToggle = () => {
    return (
      <div className="flex items-center justify-between py-2  text-xl">
        <div className="flex">
          <HiOutlineViewList
            onClick={toggleViewMode}
            className={
              'mx-2 cursor-pointer ' +
              (viewMode === 'grid' && 'fill-current text-gray-400')
            }
          />{' '}
          <BsFillGridFill
            onClick={toggleViewMode}
            className={
              'mx-2 cursor-pointer ' +
              (viewMode === 'list' && 'fill-current text-gray-400')
            }
          />
        </div>
      </div>
    );
  };
  const CompanyList = () => {
    return (
      <div className="mt-16 md:mt-0 pb-32">
        {!isMobile && renderViewModeToggle()}

        {!loading && companies.length === 0 && (
          <div className="mr-16">No company found :(</div>
        )}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-3 gap-4">
            {companies.map((data, idx) => {
              return (
                <Link
                  href={`/jobs?company_id=${data.id}`}
                  key={data.id}
                  prefetch
                >
                  <a>
                    <div className="text-pop-up-top flex justify-center items-center flex-col rounded-xl m-4 hover:shadow-lg p-4 hover:cursor-pointer bg-white   text-sm fade-in-fwd  ">
                      <img className="w-12 h-12 mb-4" src={data.logo} />
                      <div className="bold">{data.name}</div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        )}

        {viewMode === 'list' && (
          <div>
            {companies.map((data, idx) => {
              return (
                <Link
                  href={`/jobs?company_id=${data.id}`}
                  key={data.id}
                  prefetch
                >
                  <a>
                    <div className=" text-pop-up-top rounded-xl m-4 hover:shadow-lg p-4 hover:cursor-pointer bg-white   text-sm fade-in-fwd  ">
                      <div className="flex items-center">
                        <img className="w-12 h-12 mr-4" src={data.logo} />
                        <div>
                          <div className="bold">{data.name}</div>
                          <div>📍 {data.headquarters}</div>
                        </div>
                      </div>
                      <div className="flex items-center border-t-2 border-t-gray-200 mt-2 pt-2">
                        {data.description}
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        )}
        {loading && (
          <div className="w-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    );
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderMobileHeader = () => {
    let headerClassName =
      '  w-full fixed top-0 bg-white  z-max_4 transform duration-500 items-center  text-sm font-display ';
    if (!showMobileNavHeader) {
      headerClassName = headerClassName + '  -translate-y-20';
    }

    return (
      <div className={headerClassName}>
        <div className="flex items-center p-4 pb-2 justify-between ">
          <div className="bold text-2xl ">Companies</div>
          <div className="flex items-center">
            {renderViewModeToggle()}
            <div onClick={onOpen} className=" text-xl">
              <AiFillFilter />
            </div>
          </div>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Filter companies</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Lorem count={2} /> */}
              {renderFilter()}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Apply filter
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  };
  return (
    <div>
      {isMobile && renderMobileHeader()}
      <BaseLayout className="font-display md:bg-gray-100 dark:bg-gray-800">
        {company_id && <div></div>}
        <div className="max-w-screen-xl mx-auto">
          <div className="flex">
            {!isMobile && renderSidebar()}
            <div className="w-full  md:h-screen md:overflow-y-auto md:pt-16">
              <CompanyList />
              {currentPage !== totalPages && !loading && (
                <Button
                  onClick={(_) => setCurrentPage(currentPage + 1)}
                  width={'100%'}
                  mx={4}
                >
                  Load more
                </Button>
              )}
            </div>
          </div>
        </div>
      </BaseLayout>
      {!isMobile && <AppNavbar />}
      {isMobile && <AppMobileNavbar />}
    </div>
  );
}
