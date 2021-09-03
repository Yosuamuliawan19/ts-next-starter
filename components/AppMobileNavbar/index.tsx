import Link from 'next/link';
import {
  RiBuilding4Fill,
  RiCalendarEventLine,
  RiSuitcaseFill,
} from 'react-icons/ri';

const AppMobileNavbar = () => {
  return (
    <div
      className={
        'fixed bottom-0 left-0 w-full bg-white z-max_1 border-t-2 border-t-gray-200 '
      }
    >
      <div className={'flex p-4 px-8 justify-between'}>
        <Link href={'/jobs'}>
          <div className={'flex flex-col items-center'}>
            <RiSuitcaseFill />
            <div className={'text-sm text-gray-700'}>Jobs</div>
          </div>
        </Link>
        <Link href={'/companies'}>
          <div className={'flex flex-col items-center'}>
            <RiBuilding4Fill />
            <div className={'text-sm text-gray-700'}>Companies</div>
          </div>
        </Link>
        <Link href={'/events'}>
          <div className={'flex flex-col items-center'}>
            <RiCalendarEventLine />
            <div className={'text-sm text-gray-700'}>Events</div>
          </div>
        </Link>
        <Link href={'/profile'}>
          <div className={'flex flex-col items-center'}>
            <div className=" hover:text-gray-500 cursor-pointer rounded-full bg-red-300 w-4 h-4"></div>{' '}
            <div className={'text-sm text-gray-700'}>Profile</div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default AppMobileNavbar;
