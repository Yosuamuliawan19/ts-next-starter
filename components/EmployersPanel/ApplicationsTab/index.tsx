import {
  Button,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Tag,
  ModalCloseButton,
  HStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { AiOutlineDownload } from 'react-icons/ai';
import { SiMinutemailer } from 'react-icons/si';
import { getAllApplications, changeApplicationStatus } from '@api/applications';
import { APPLICATION_STATUS_TYPES } from '@constants';
import PDFViewer from '@components/PDFViewer';
import PDFViewerCore from '@components/PDFViewerCore';
import { BsArrowRight } from 'react-icons/bs';
import { getApplicationStatusColor } from '@helpers/status';
import ApplicationsTable from './ApplicationsTable';
import { showErrorMsg } from '@helpers/';
import { showSuccessMsg } from '@helpers/';
interface Props {
  id: string;
}
const ApplicationsTab = ({ id }: Props) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const [PDFUrl, setPDFUrl] = useState(false);
  const [PDFViewerTitle, setPDFViewerTitle] = useState('');
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedUserIdx, setSelectedUserIdx] = useState();

  const filteredApplications =
    applications?.filter((data) => {
      let check = false;
      const term = searchTerm?.toLowerCase();
      check = check || data?.name?.firstName?.toLowerCase().includes(term);
      check = check || data?.name?.firstName?.toLowerCase().includes(term);
      check = check || data?.college.toLowerCase().includes(term);
      check = check || data?.email.toLowerCase().includes(term);
      check = check || data?.major.toLowerCase().includes(term);
      return check;
    }) || [];
  let selectedUser;
  if (selectedUserIdx !== undefined)
    selectedUser = filteredApplications[selectedUserIdx];
  const toast = useToast();

  // status change
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [transitionStatus, setTransitionStatus] = useState(['', '']);
  useHotkeys(
    'up',
    () => {
      if (selectedUserIdx !== undefined && selectedUserIdx !== 0)
        setSelectedUserIdx(selectedUserIdx - 1);
    },
    [selectedUserIdx]
  );
  useHotkeys(
    'down',
    () => {
      if (
        selectedUserIdx !== undefined &&
        selectedUserIdx < filteredApplications.length - 1
      )
        setSelectedUserIdx(selectedUserIdx + 1);
    },
    [selectedUserIdx, filteredApplications]
  );
  useHotkeys(
    'Y',
    () => {
      onStatusChange(
        selectedUser?.id,
        selectedUser?.status,
        APPLICATION_STATUS_TYPES.SHORTLISTED
      );
    },
    [selectedUserIdx, filteredApplications]
  );

  useHotkeys(
    'N',
    () => {
      onStatusChange(
        selectedUser?.id,
        selectedUser?.status,
        APPLICATION_STATUS_TYPES.REJECTED
      );
    },
    [selectedUserIdx, filteredApplications]
  );
  useHotkeys(
    'U',
    () => {
      onStatusChange(
        selectedUser?.id,
        selectedUser?.status,
        APPLICATION_STATUS_TYPES.PENDING
      );
    },
    [selectedUserIdx, filteredApplications]
  );
  useHotkeys(
    'D',
    () => {
      onDownloadResume();
    },
    [selectedUserIdx, filteredApplications]
  );
  useHotkeys(
    'E',
    () => {
      onEmailCandidate();
    },
    [selectedUserIdx, filteredApplications]
  );
  const refreshApplication = async () => {
    try {
      const res = await getAllApplications(id);
      setLoading(true);
      setApplications(res?.data?.results);
      setLoading(false);
    } catch (e) {
      showErrorMsg(e.message);
    }
  };
  useEffect(async () => {
    refreshApplication();
  }, [id]);
  const onChangeApplicationStatus = async (applicationId: string) => {
    try {
      const res = await changeApplicationStatus(
        transitionStatus[2],
        transitionStatus[1]
      );
      showSuccessMsg('Succesfully changed application status');
    } catch (e) {
      showErrorMsg(e.message);
    }
    refreshApplication();
  };
  const onConfirmStatusChange = () => {
    setShowConfirmationModal(false);
    onChangeApplicationStatus();
  };
  const onStatusChange = (
    applicationId: string,
    currentStatus: string,
    newStatus: string
  ) => {
    setShowConfirmationModal(true);
    setTransitionStatus([currentStatus, newStatus, applicationId]);
  };
  const onEmailCandidate = () => {
    window.open(`mailto:${selectedUser?.email}`);
  };
  const onDownloadResume = () => {
    window.open(selectedUser?.resume);
  };
  if (loading) return <Spinner />;

  const renderTable = () => {
    return (
      <>
        <div className="flex none	max-h-screen ">
          <div className="min-w-1/2 " style={{ maxWidth: 720 }}>
            <ApplicationsTable
              data={applications}
              selectedUser={selectedUser}
              setSelectedUserIdx={setSelectedUserIdx}
            />
          </div>
          <div
            className="max-h-screen   overflow-y-auto p-4"
            style={{ minWidth: 500 }}
          >
            {!selectedUser && <div>No user selected</div>}
            {selectedUser && (
              <div className="text-pop-up-top" key={selectedUser?.id}>
                {selectedUser?.status === APPLICATION_STATUS_TYPES.REJECTED ? (
                  <div>This applicant has been rejected</div>
                ) : (
                  <HStack spacing="24px" mb={4}>
                    {selectedUser?.status !==
                      APPLICATION_STATUS_TYPES.PENDING && (
                      <Button
                        bgColor={'green.500'}
                        onClick={(_) =>
                          onStatusChange(
                            selectedUser?.id,
                            selectedUser?.status,
                            APPLICATION_STATUS_TYPES.PENDING
                          )
                        }
                        color={'white'}
                        mx={1}
                      >
                        (U) Unshortlist
                      </Button>
                    )}
                    {selectedUser?.status ===
                      APPLICATION_STATUS_TYPES.PENDING && (
                      <Button
                        onClick={(_) =>
                          onStatusChange(
                            selectedUser?.id,
                            selectedUser?.status,
                            APPLICATION_STATUS_TYPES.SHORTLISTED
                          )
                        }
                        bgColor={'green.500'}
                        color={'white'}
                        mx={1}
                      >
                        (Y) Shortlist
                      </Button>
                    )}
                    {selectedUser?.status !==
                      APPLICATION_STATUS_TYPES.REJECTED && (
                      <Button
                        onClick={(_) =>
                          onStatusChange(
                            selectedUser?.id,
                            selectedUser?.status,
                            APPLICATION_STATUS_TYPES.REJECTED
                          )
                        }
                        bgColor={'red.500'}
                        color={'white'}
                        mx={1}
                      >
                        (N) Reject
                      </Button>
                    )}
                    {selectedUser?.status ===
                      APPLICATION_STATUS_TYPES.SHORTLISTED && (
                      <>
                        <Button colorScheme={'blue'} onClick={onDownloadResume}>
                          <AiOutlineDownload /> Download Resume
                        </Button>
                        <Button colorScheme={'blue'} onClick={onEmailCandidate}>
                          <SiMinutemailer /> Reach out
                        </Button>
                      </>
                    )}
                  </HStack>
                )}

                <PDFViewerCore url={selectedUser?.resume} />
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
  const renderConfirmModal = () => {
    return (
      <Modal
        isOpen={showConfirmationModal}
        onClose={(_) => setShowConfirmationModal(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm your changes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <div className="flex">
                <Tag
                  ml={2}
                  borderRadius="full"
                  size={'sm'}
                  variant="solid"
                  bgColor={getApplicationStatusColor(transitionStatus[0])}
                >
                  {transitionStatus[0]}
                </Tag>
                <div className="mx-4">
                  <BsArrowRight />
                </div>
                <Tag
                  ml={2}
                  borderRadius="full"
                  size={'sm'}
                  variant="solid"
                  bgColor={getApplicationStatusColor(transitionStatus[1])}
                >
                  {transitionStatus[1]}
                </Tag>
              </div>
              <div className="mt-4">
                This candidate will receive an automated email regarding a
                status change in their application. Would you like to continue?
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost">Cancel</Button>
            <Button
              autoFocus
              colorScheme="blue"
              mr={3}
              onClick={onConfirmStatusChange}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  return (
    <div className={'w-full'} className="text-pop-up-top overflow-y-hidden">
      {applications.length === 0 ? (
        <div>This listing has no applications yet</div>
      ) : (
        <>{renderTable()}</>
      )}
      <div style={{ maxHeight: '100vh', overflow: 'scroll' }}>
        <PDFViewer
          modalTitle={PDFViewerTitle}
          url={PDFUrl}
          isOpen={showPDFViewer}
          setOpen={setShowPDFViewer}
        />
      </div>

      {renderConfirmModal()}
    </div>
  );
};

export default ApplicationsTab;
