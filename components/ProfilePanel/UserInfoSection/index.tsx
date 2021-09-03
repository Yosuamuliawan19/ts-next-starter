import { Tooltip, useDisclosure, Spinner } from '@chakra-ui/react';
import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FiEdit } from 'react-icons/fi';
import EditModal from './EditModal';
import { DEFAULT_PROFILE_PICTURE } from '@constants';
interface Props {
  user: any;
  onEditSuccess: any;
}
const UserInfoSection = (props: Props) => {
  const { user, onEditSuccess } = props;
  const isMobile = useCheckMobileScreen();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderContent = () => {
    return (
      <>
        <div className={'w-full flex justify-end '}>
          <Tooltip label="Edit profile information" fontSize="md">
            <div
              className={
                'hover:bg-gray-200 p-2 m-2 rounded-full cursor-pointer '
              }
            >
              <FiEdit onClick={onOpen} />
            </div>
          </Tooltip>
        </div>
        <div className={'p-4 pt-0 flex md:flex-col items-center '}>
          <img
            style={{
              borderRadius: ' 50%',
              height: isMobile ? 100 : 200,
              width: isMobile ? 100 : 200,
              objectFit: 'cover',
              background: 'rgba(0,0,0,0.1)',
            }}
            src={user?.profilePicture || DEFAULT_PROFILE_PICTURE}
          />
          <div className={'ml-4  md:ml-0 flex flex-col md:items-center'}>
            {' '}
            <div className={'mt-4 bold text-lg'} onClick={onEditSuccess}>
              {user?.name?.firstName + ' ' + user?.name?.lastName}
            </div>
            <div className={'text-md'}>{user?.college}</div>
            <div className={'text-gray-500 text-md'}>{user?.major}</div>
            <div className={'text-gray-500 text-md'}>
              🎓 {user?.month} / {user?.year}
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {user && (
        <EditModal
          user={user}
          isOpen={isOpen}
          onClose={onClose}
          onEditSuccess={onEditSuccess}
        />
      )}
      <div className={'bg-white rounded-md   '}>
        {user ? (
          renderContent()
        ) : (
          <div className="h-72 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};
export default UserInfoSection;
