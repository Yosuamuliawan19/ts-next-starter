import React, { useRef } from 'react';
import { Storage } from 'aws-amplify';
import { useToast } from '@chakra-ui/react';

import { S3BucketURL } from '../../constants';
interface Props {
  onSuccess?: any;
  children?: any;
  contentType?: string;
}
export default function FileUploader(props: Props) {
  const toast = useToast();

  const { onSuccess, children, contentType } = props;
  const onUpload = async (e) => {
    const file = e.target.files[0];
    try {
      const res = await Storage.put(file.name, file, {
        contentType: contentType || 'image/png',
        level: 'public',
      });
      if (onSuccess) {
        onSuccess(S3BucketURL + res?.key);
      }
    } catch (error) {
      toast({
        title: 'Failed uploading file',
        status: 'error',
        description: error.message,
        duration: 1000,
        isClosable: true,
      });
    }
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = (e) => {
    console.log('on click');
    inputRef.current?.click();
  };
  return (
    <div onClick={handleClick}>
      <input
        id="file-upload"
        type="file"
        onChange={onUpload}
        className={'hidden'}
        ref={(e) => {
          inputRef.current = e;
        }}
      />
      <label htmlFor="file-upload">{children}</label>
    </div>
  );
}
