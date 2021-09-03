import React from 'react';
import { Box } from '@chakra-ui/react';
import { MdContentCopy } from 'react-icons/md';
import { useToast } from '@chakra-ui/react';

const ReferralSection = (props) => {
  const toast = useToast();

  return (
    <>
      <div className={'bg-white rounded-md p-4 mt-4 '}>
        <div className={'text-gray-500 text-md'}>Refferal Code</div>

        <div
          className={'flex items-center'}
          onClick={(_) => {
            navigator.clipboard.writeText(props?.user?.referral);
            toast({
              position: 'bottom',
              duration: 800,
              isClosable: true,
              render: () => (
                <Box color="white" p={3} bg="green.400" borderRadius={12}>
                  Refferal code copied
                </Box>
              ),
            });
          }}
        >
          {props?.user?.referral}{' '}
          <MdContentCopy className={'ml-2 cursor-pointer'} />
        </div>
      </div>
    </>
  );
};
export default ReferralSection;
