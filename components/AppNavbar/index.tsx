import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import AuthContext from '@context/Auth';
import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { FcSearch } from 'react-icons/fc';
import { useState } from 'react';
import { DEFAULT_PROFILE_PICTURE } from '@constants';
const AppNavbar = () => {
  const { accessToken, userDetails } = useContext(AuthContext);
  const router = useRouter();
  const isMobile = useCheckMobileScreen();
  const [searchTerm, setSearchTerm] = useState('');

  const headerClassName =
    'z-100 w-full px-4 py-2 fixed top-0 bg-white  z-max_4 transform duration-500 items-center  dark:bg-gray-800  dark:text-white  text-md font-display';

  const handleJobSearch = async (event: any) => {
    event.preventDefault();
    if (event.target[0]) {
      router.push(`/jobs?query=${searchTerm}`);
    } else {
      router.push(`/jobs?query`);
    }
  };

  const { logoutUser } = useContext(AuthContext);

  const onLogout = async () => {
    const res = await logoutUser();
    if (!res.ok) {
      router.push('/');
    } else {
      router.push('/');
    }
  };
  const renderSearchBar = () => {
    return (
      <form onSubmit={handleJobSearch}>
        <InputGroup size="md">
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            pr="4.5rem"
            placeholder={'Search Jobs'}
          />
          <InputRightElement width="4.5rem">
            {/* <Button h="1.75rem" size="sm" onClick={handleJobSearch}>
              <FcSearch />
            </Button> */}
          </InputRightElement>
        </InputGroup>
      </form>
    );
  };
  const renderProfileButton = () => {
    const link = userDetails?.company ? '/employers' : '/profile';
    const renderProfilePic = () => {
      return (
        <Link href={isMobile ? link : ''}>
          <a>
            <img
              src={userDetails?.profilePicture || DEFAULT_PROFILE_PICTURE}
              className="mx-4 hover:text-gray-500 cursor-pointer rounded-full  w-8 h-8 border-2 border-gray-200"
            />
          </a>
        </Link>
      );
    };
    if (isMobile) {
      return renderProfilePic();
    }
    return (
      <Menu>
        <MenuButton>{renderProfilePic()}</MenuButton>
        <MenuList>
          <Link href={link}>
            <a>
              <MenuItem>Profile</MenuItem>
            </a>
          </Link>
          <MenuItem onClick={onLogout}>
            <a>Sign Out</a>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };
  return (
    <div className={headerClassName}>
      <div className="m-auto max-w-screen-xl justify-between flex">
        <div className="flex items-center">
          <img
            onClick={(_) => router.push('/')}
            className="mr-4 cursor-pointer"
            src="https://res.cloudinary.com/yosuam19/image/upload/v1624493931/Screenshot_2021-06-24_at_8.18.13_AM_eeuxku.png"
            alt="logo"
            width={50}
            height={50}
          />
          {renderSearchBar()}
        </div>
        <div className="flex items-center">
          <Link href={'/jobs'}>
            <a className="mx-4 hover:text-gray-500 cursor-pointer">Jobs</a>
          </Link>
          <Link href={'/companies'}>
            <a className="mx-4 hover:text-gray-500 cursor-pointer">Companies</a>
          </Link>
          <Link href={'/events'}>
            <a className="mx-4 hover:text-gray-500 cursor-pointer">Events</a>
          </Link>

          {renderProfileButton()}
        </div>
      </div>
    </div>
  );
};
export default AppNavbar;
