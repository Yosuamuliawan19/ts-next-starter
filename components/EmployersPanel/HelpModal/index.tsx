import { Button } from '@chakra-ui/react';
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Divider,
} from '@chakra-ui/react';
import { Tag } from '@chakra-ui/react';
import { Kbd } from '@chakra-ui/react';

import { STATUS_TYPES, APPLICATION_STATUS_TYPES } from '@constants';
import { getStatusColor, getApplicationStatusColor } from '@helpers/status';
const HelpModal = ({ isOpen, setOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={(_) => setOpen(false)} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Help</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="text-pop-up-top flex">
          <div className="p-2 w-1/2">
            <Text fontSize="lg" fontWeight="bold">
              Job listing status
            </Text>
            <Divider borderColor="gray.400" />
            <Tag
              mt={4}
              borderRadius="full"
              size={'sm'}
              variant="solid"
              bgColor={getStatusColor(STATUS_TYPES.PUBLISHED)}
            >
              {STATUS_TYPES.PUBLISHED}
            </Tag>
            <Text fontSize="md" mb={2}>
              In a published state, your job listing will be shown to Kerja.io
              users.
            </Text>{' '}
            <Divider borderColor="gray.400" />
            <Tag
              mt={4}
              borderRadius="full"
              size={'sm'}
              variant="solid"
              bgColor={getStatusColor(STATUS_TYPES.DRAFT)}
            >
              {STATUS_TYPES.DRAFT}
            </Tag>
            <Text fontSize="md" mb={2}>
              In a draft state, this job listing will only be visible to you and
              your company members (not visible to the public)
            </Text>{' '}
            <Divider borderColor="gray.400" />
            <Tag
              mt={4}
              borderRadius="full"
              size={'sm'}
              variant="solid"
              bgColor={getStatusColor(STATUS_TYPES.ARCHIVED)}
            >
              {STATUS_TYPES.ARCHIVED}
            </Tag>
            <Text fontSize="md" mb={2}>
              You can archive job listings that are no longer relevant to the
              compan
            </Text>
            <Divider borderColor="gray.400" />
            <Tag
              mt={4}
              borderRadius="full"
              size={'sm'}
              variant="solid"
              bgColor={getStatusColor(STATUS_TYPES.CLOSED)}
            >
              {STATUS_TYPES.CLOSED}
            </Tag>
            <Text fontSize="md" mb={2}>
              The system will automatically close jobs listings after a certain
              amount of time, however, you can still re-open it anytime
            </Text>
          </div>
          <div className="p-2 w-1/2">
            <Text fontSize="lg" fontWeight="bold">
              Applications status
            </Text>
            <Divider borderColor="gray.400" />
            <Tag
              mt={4}
              borderRadius="full"
              size={'sm'}
              variant="solid"
              bgColor={getApplicationStatusColor(
                APPLICATION_STATUS_TYPES.PENDING
              )}
            >
              {APPLICATION_STATUS_TYPES.PENDING}
            </Tag>
            <Text fontSize="md" mb={2}>
              In a published state, your job listing will be shown to Kerja.io
              users.
            </Text>{' '}
            <Divider borderColor="gray.400" />
            <Tag
              mt={4}
              borderRadius="full"
              size={'sm'}
              variant="solid"
              bgColor={getApplicationStatusColor(
                APPLICATION_STATUS_TYPES.SHORTLISTED
              )}
            >
              {APPLICATION_STATUS_TYPES.SHORTLISTED}
            </Tag>
            <Text fontSize="md" mb={2}>
              In a published state, your job listing will be shown to Kerja.io
              users.
            </Text>{' '}
            <Divider borderColor="gray.400" />
            <Tag
              mt={4}
              borderRadius="full"
              size={'sm'}
              variant="solid"
              bgColor={getApplicationStatusColor(
                APPLICATION_STATUS_TYPES.REJECTED
              )}
            >
              {APPLICATION_STATUS_TYPES.REJECTED}
            </Tag>
            <Text fontSize="md" mb={2}>
              In a published state, your job listing will be shown to Kerja.io
              users.
            </Text>{' '}
          </div>
          <div className="p-2 w-1/2">
            <Text fontSize="lg" fontWeight="bold">
              Keyboard shortcuts
            </Text>
            <div className="bold">Application management</div>
            <div className="flex items-center justify-between">
              <div>Shortlist candidate</div> <Kbd>Y</Kbd>
            </div>
            <div className="flex items-center justify-between">
              <div>Unshortlist candidate</div> <Kbd>U</Kbd>
            </div>
            <div className="flex items-center justify-between">
              <div> Reject candidate</div> <Kbd>R</Kbd>
            </div>
            <div className="bold mt-4">Quick Actions</div>

            <div className="flex items-center justify-between">
              <div>Reach out to candidate</div> <Kbd>E</Kbd>
            </div>
            <div className="flex items-center justify-between">
              <div>Download resume</div> <Kbd>D</Kbd>
            </div>
            <div className="bold mt-4">Navigation</div>
            <div className="flex items-center justify-between">
              <div> Shift between jobs</div>{' '}
              <div>
                {' '}
                <Kbd>Up</Kbd> / <Kbd>Down</Kbd>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div> Change resume page </div>{' '}
              <div>
                <Kbd>Left</Kbd> /<Kbd>Right</Kbd>
              </div>
            </div>
          </div>
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HelpModal;

const classes = {
  searchBar: 'border-2 border-black rounded-lg',
  dropdownItem:
    'cursor-pointer text-sm  hover:bg-gray-200 p-2  w-full text-left flex  items-center w-full ',
  sidebarJobs:
    ' hover:bg-gray-200 p-2 rounded-lg w-full text-left flex justify-between items-center w-full ',
};
