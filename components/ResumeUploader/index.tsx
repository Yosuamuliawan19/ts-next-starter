import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Button } from '@chakra-ui/react';
const ResumeUploader = (props) => {
  const { description } = props;
  return (
    <Button
      height={32}
      fontWeight={'normal'}
      width={'100%'}
      className={
        'rounded-lg w-full h-32 bg-gray-200 flex items-center justify-center cursor-pointer'
      }
    >
      {description && (
        <>
          <AiOutlineCloudUpload />
          <div className="ml-2">{description}</div>
        </>
      )}
    </Button>
  );
};

export default ResumeUploader;
