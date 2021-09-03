import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Portal,
  useToast,
  Box,
  Link,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { updateProfile } from '@api/profile';
import FileUploader from '@components/FileUploader';
import { FiExternalLink } from 'react-icons/fi';
import ResumeUploader from '@components/ResumeUploader';
const EditModal = (props) => {
  const { onEditSuccess } = props;
  const { isOpen, onClose } = props;
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const res = await updateProfile(values);
      props.onClose();
      toast({
        position: 'bottom',
        duration: 800,
        isClosable: true,
        render: () => (
          <Box color="white" p={3} bg="green.400" borderRadius={12}>
            Profile updated
          </Box>
        ),
      });
      onEditSuccess();
    } catch (e) {
      toast({
        position: 'bottom',
        duration: 1000,
        isClosable: true,
        status: 'error',
        title: 'Error updating profile',
        description: e.message,
      });
    }
  };
  useEffect(() => {
    reset({
      linkedin: props?.user?.linkedin,
      email: props?.user?.email,
      resume: props?.user?.resume,
    });
  }, [isOpen]);
  return (
    <Portal>
      <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit contact information and resume</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email" mb={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register('email', {
                    required: true,
                  })}
                />
              </FormControl>
              <FormControl id="Linkedin" mb={4} isRequired>
                <FormLabel>Linkedin</FormLabel>
                <Input
                  type="text"
                  {...register('linkedin', {
                    required: true,
                  })}
                />
              </FormControl>
              <FormControl id="resume" mb={4} isRequired>
                <FormLabel>Resume</FormLabel>
                {getValues('resume') ? (
                  <Link href={getValues('resume')} isExternal>
                    <div className="flex items-center">
                      My resume <FiExternalLink className="ml-2" />
                    </div>
                  </Link>
                ) : (
                  <div>No resume uploaded</div>
                )}

                <FileUploader
                  onSuccess={(url) => {
                    const value = getValues();
                    value.resume = url;
                    reset(value);
                  }}
                  contentType={'application/pdf'}
                >
                  <ResumeUploader
                    description={'Upload resume'}
                    uploadedUrl={getValues('resume')}
                  />
                </FileUploader>
              </FormControl>
              <div className="flex justify-end py-4">
                <Button variant="ghost" onClick={props.onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Save
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Portal>
  );
};
export default EditModal;
