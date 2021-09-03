import { Tooltip, useDisclosure, Link, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiFillLinkedin } from 'react-icons/ai';
import { FiEdit, FiExternalLink } from 'react-icons/fi';
import { GiTriquetra } from 'react-icons/gi';
import { HiOutlineMail } from 'react-icons/hi';
import EditModal from './EditModal';
import PDFViewer from '@components/PDFViewer';

interface Props {
  user: any;
  onEditSuccess: any;
}
const UserContactSection = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, onEditSuccess } = props;

  const [showPDFViewer, setShowPDFViewer] = useState(false);

  const renderContent = () => {
    return (
      <>
        <div className={'w-full flex justify-between items-center '}>
          <div className={'text-gray-500 text-md pt-2 pl-4'}>Contact</div>
          <Tooltip label="Edit profile information" fontSize="md">
            <div
              className={
                'hover:bg-gray-200 p-2 m-2  rounded-full cursor-pointer '
              }
            >
              <FiEdit onClick={onOpen} />
            </div>
          </Tooltip>
        </div>
        <div className={'p-4 pt-0'}>
          {' '}
          <div className={'flex items-center'}>
            <HiOutlineMail className={'mr-2'} />
            {user?.email}
          </div>
          <div className={'flex items-center'}>
            <AiFillLinkedin className={'mr-2'} />
            <a href={user?.linkedin} target={'_blank'}>
              {' '}
              {user?.linkedin}
            </a>
          </div>
          <div className={'mt-4 text-gray-500 text-md'}>Resume</div>
          <div>
            <Link onClick={(_) => setShowPDFViewer(GiTriquetra)} mb={4}>
              <div className="flex items-center">
                My resume <FiExternalLink className="ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {props.user && (
        <EditModal
          user={props.user}
          isOpen={isOpen}
          onClose={onClose}
          onEditSuccess={onEditSuccess}
        />
      )}
      <div className={'bg-white rounded-md mt-4 '}>
        {props.user ? (
          renderContent()
        ) : (
          <div className="h-36 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
      <PDFViewer
        modalTitle={'Your resume'}
        url={user?.resume}
        isOpen={showPDFViewer}
        setOpen={setShowPDFViewer}
      />
    </>
  );
};
export default UserContactSection;
