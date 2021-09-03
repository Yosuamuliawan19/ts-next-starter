import {
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react';
import { IoIosAdd } from 'react-icons/io';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { RiSuitcaseLine } from 'react-icons/ri';
import { getStatusColor } from '@helpers/status';
import AddJobView from '../AddJobView';
import HelpModal from '../HelpModal';
import AuthContext from '@context/Auth';
import { getFullName } from '@helpers';
import { AiOutlineFilter } from 'react-icons/ai';
import { STATUS_TYPES } from '@constants';

const DeleteModal = ({ isOpen, setOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={(_) => setOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete job listing</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete this job listing ? Please type in job
          name to proceed
          <Input placeholder={'Please type in job name here'} mt={4} />
        </ModalBody>
        <ModalFooter>
          <Button
            variant={'ghost'}
            colorScheme="blue"
            mr={3}
            onClick={(_) => setOpen(false)}
          >
            Close
          </Button>
          <Button colorScheme={'red'}>Delete Job</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
const Sidebar = ({ company, jobs }) => {
  const router = useRouter();
  const { job_id } = router.query;

  const [searchTerm, setSearchTerm] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const [isJobLoading, setJobLoading] = useState(false);
  const { userDetails } = useContext(AuthContext);
  const [jobFilter, setJobFilter] = useState('Active');

  let filteredJobs = jobs;
  if (jobFilter === 'Active') {
    filteredJobs = filteredJobs?.filter((data) => {
      return (
        data.status !== STATUS_TYPES.ARCHIVED &&
        data.status !== STATUS_TYPES.CLOSED
      );
    });
  } else if (jobFilter === 'Archived') {
    filteredJobs = filteredJobs?.filter((data) => {
      return (
        data.status === STATUS_TYPES.ARCHIVED ||
        data.status === STATUS_TYPES.CLOSED
      );
    });
  }

  return (
    <div
      className={
        'p-2 justify-between border-r-2 border-gray-100 flex flex-col w-72 h-screen'
      }
      style={{ height: '100vh', overflow: 'scroll' }}
    >
      <AddJobView
        company={company}
        createModalOpen={createModalOpen}
        setCreateModalOpen={setCreateModalOpen}
      />

      <DeleteModal isOpen={deleteModalOpen} setOpen={setDeleteModalOpen} />
      <div>
        <div
          className={
            'border-b-2 border-gray-200 mb-4 pb-1 flex flex-col justify-center items-center w-full'
          }
        >
          <div
            className={
              'flex w-full  items-center hover:bg-gray-200 rounded-xl cursor-pointer px-2 py-2 my-2'
            }
            onClick={(_) =>
              router.push({
                pathname: '/employers',
                query: { tab: 'settings' },
              })
            }
          >
            <img
              style={{ width: 50, height: 50 }}
              className={' object-contain mr-4'}
              src={company?.logo}
            />
            <div>
              {userDetails && (
                <div className={' bold'}>{getFullName(userDetails?.name)}</div>
              )}
              {company && <div> {company?.name}</div>}
            </div>
          </div>
        </div>
        <div
          className={'bold text-md flex items-center justify-between mb-2 pl-2'}
        >
          <div className={'flex items-center'}>
            <RiSuitcaseLine className={'mr-2'} />
            Job listings
          </div>

          <Menu>
            <MenuButton className="rounded-full w-min hover:bg-gray-200 p-2 cursor-pointer">
              <AiOutlineFilter />
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                value={jobFilter}
                onChange={(e) => setJobFilter(e)}
                defaultValue="Active"
                type="radio"
              >
                <MenuItemOption key={'Active'} value={'Active'}>
                  Active jobs
                </MenuItemOption>
                <MenuItemOption key={'Archived'} value={'Archived'}>
                  Closed / Archived jobs
                </MenuItemOption>
                <MenuItemOption key={'All'} value={'All'}>
                  All
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </div>
        <Input
          placeholder={'Search job'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={4}
        />

        {isJobLoading && <Spinner />}
        {filteredJobs
          ?.filter((job) => job?.title?.toLowerCase().includes(searchTerm))
          ?.sort((a, b) => a.title.localeCompare(b.title))
          ?.map((data) => {
            return (
              <button
                key={data}
                onClick={(_) =>
                  router.push({
                    pathname: '/employers',
                    query: { job_id: data.id },
                  })
                }
                className={
                  classes.sidebarJobs +
                  ' text-pop-up-top ' +
                  (job_id === data?.id && ' bg-gray-200')
                }
              >
                <div className="flex  items-center">
                  {' '}
                  <div
                    style={{
                      fontSize: '24px',
                      color: getStatusColor(data?.status),
                      marginRight: 6,
                    }}
                  >
                    •
                  </div>{' '}
                  {data?.title}
                </div>
              </button>
            );
          })}
        <Button
          colorScheme="red"
          variant="solid"
          mt={4}
          onClick={(_) => setCreateModalOpen(true)}
        >
          <IoIosAdd />
          Add new listing
        </Button>
      </div>
      <div>
        <Button
          colorScheme="red"
          variant="link"
          mb={4}
          ml={4}
          onClick={(_) => setHelpModalOpen(true)}
        >
          Need help ?
        </Button>
        <HelpModal isOpen={isHelpModalOpen} setOpen={setHelpModalOpen} />
      </div>
    </div>
  );
};

export default Sidebar;

const classes = {
  searchBar: 'border-2 border-black rounded-lg',
  dropdownItem:
    'cursor-pointer text-sm  hover:bg-gray-200 p-2  w-full text-left flex  items-center w-full ',
  sidebarJobs:
    ' hover:bg-gray-200 px-2 py-2 rounded-lg w-full text-left flex justify-between items-center w-full ',
};
