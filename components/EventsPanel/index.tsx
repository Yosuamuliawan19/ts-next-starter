import { BaseLayout } from '@components';
import AppMobileNavbar from '@components/AppMobileNavbar';
import AppNavbar from '@components/AppNavbar';
import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
import { useScrollPosition } from '@hooks/useScrollPosition';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { RiArrowDropDownLine, RiFilter3Fill } from 'react-icons/ri';
export default function Home() {
  const isMobile = useCheckMobileScreen();
  const [showMobileNavHeader, setShowMobileNavHeader] = useState(true);
  const [filterShow, setFilterShow] = useState(false);
  const router = useRouter();

  const { company_id } = router.query;

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < -200 && currPos.y < prevPos.y) {
      if (showMobileNavHeader) setShowMobileNavHeader(false);
    } else {
      if (!showMobileNavHeader) setShowMobileNavHeader(true);
    }
  });
  const renderSidebar = () => {
    return (
      <div
        className=" h-screen w-auto overflow-y-scroll  md:pt-16 "
        style={{ width: 360 }}
      >
        {company_id && renderJobList()}
        {!company_id && !isMobile && renderFilter()}
      </div>
    );
  };
  const renderJobList = () => {
    return (
      <div>
        <div className=" cursor-pointer flex items-center justify-between px-4 py-2 pb-2 dark:text-white ">
          <BsFillGrid3X3GapFill />
          <div className="text-sm flex hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer p-2 rounded-2xl ">
            Sort by A-Z <RiArrowDropDownLine />
          </div>
        </div>
        <div>
          {companies.map((data, idx) => {
            return (
              <Link
                href={`/jobs?company_id=${data.company_id}`}
                key={idx}
                prefetch
              >
                <div className="rounded-xl m-4 hover:shadow-lg p-4 hover:cursor-pointer bg-white dark:text-white  text-sm fade-in-fwd  dark:bg-gray-700">
                  <div className="flex items-center">
                    <img className="w-12 h-12 mr-4" src={data.img} />
                    <div>
                      <div className="bold">{data.company_name}</div>
                      <div>📍 {data.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center border-t-2 border-t-gray-200 mt-2 pt-2">
                    Shopee Pte Ltd is a Singaporean multinational technology
                    company which focuses mainly on e-commerce. Headquartered
                    under Sea Group, Shopee was first launched in Singapore in
                    2015, and later expanded its reach to Malaysia, Thailand,
                    Taiwan, Indonesia, Vietnam, the Philippines, Brazil, and
                    Mexico.
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFilter = () => {
    let slideOverClassName =
      '  bg-white   transform duration-500 dark:bg-gray-90  opacity-1 text-sm rounded-lg p-4 mt-4';
    if (isMobile) {
      slideOverClassName += 'z-max';
    }
    return (
      <div className={slideOverClassName}>
        <div className="w-full">
          <RiFilter3Fill
            onClick={(_) => setFilterShow(!filterShow)}
            className="text-2xl ml-4"
          />
          <div className="bold">Industry</div>
          <div className={' mt-4'}>
            <div>Technology</div>
            <div>Marketing</div>
          </div>
        </div>
      </div>
    );
  };
  const renderActionBottomSheet = () => {
    let containerClassName =
      'z-max_4 p-1 bg-white fixed bottom-8 left-1/2 rounded-2xl w-72  border-gray-300 font-display flex shadow-2xl dark:bg-gray-700';
    if (isMobile) {
      containerClassName =
        'z-max flex  w-full px-4 py-2 fixed bottom-0  bg-white  z-max_4  items-center  dark:bg-gray-800  dark:text-white shadow-lg';
    }

    return (
      <div className={containerClassName}>
        <button className={btnSecondary}>Save</button>
        <button className={btnPrimary} onClick={(_) => fireConfetti()}>
          Apply now
        </button>
      </div>
    );
  };
  const renderMobileHeader = () => {
    let headerClassName =
      '  w-full fixed top-0 bg-white  z-max_4 transform duration-500 items-center  dark:bg-gray-800  dark:text-white z-max text-sm font-display';
    if (!showMobileNavHeader) {
      headerClassName = headerClassName + '  -translate-y-20';
    }
    return (
      <div className={headerClassName}>
        <div className="flex items-center p-4 pb-2 ">
          <div className="bold text-2xl ">Events</div>
        </div>
      </div>
    );
  };
  return (
    <>
      {isMobile && renderMobileHeader()}
      <BaseLayout className="font-display md:bg-gray-100 dark:bg-gray-800">
        {company_id && <div></div>}
        <div className="max-w-screen-xl mx-auto">
          <div className="flex">
            {!isMobile && renderSidebar()}
            <div className="w-full z-max_4  md:h-screen md:overflow-y-auto md:pt-16">
              <div>Events</div>
            </div>
          </div>
          {company_id && renderActionBottomSheet()}
        </div>
      </BaseLayout>
      {!isMobile && <AppNavbar />}
      {isMobile && <AppMobileNavbar />}
      {filterShow && isMobile && renderFilter()}
    </>
  );
}
const btnSecondary =
  'dark:text-white text-dark px-4 py-2 rounded-2xl bold mx-2 w-1/4';

const btnPrimary =
  'bg-blue-900 text-white px-4 py-2 rounded-2xl bold mx-2 w-3/4';
