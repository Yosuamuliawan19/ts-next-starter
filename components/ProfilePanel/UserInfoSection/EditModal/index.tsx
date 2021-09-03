import {
  Box,
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
  Flex,
} from '@chakra-ui/react';
import FileUploader from '@components/FileUploader';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { updateProfile } from '@api/profile';
import { DEFAULT_PROFILE_PICTURE } from '@constants';
const EditModal = (props) => {
  const { isOpen, onClose, user } = props;
  const generateDate = () => {
    if (props?.user?.year && props?.user?.month) {
      return new Date(props?.user?.year, props?.user?.month);
    }
    return new Date();
  };
  const { onEditSuccess } = props;
  const [profileImg, setProfileImg] = useState(
    props?.user?.profilePicture || DEFAULT_PROFILE_PICTURE
  );
  const [graduationDate, setGraduationDate] = useState(generateDate());
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    values = {
      college: values.college,
      major: values.major,
      name: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      profilePicture: profileImg,
      year: graduationDate.getFullYear(),
      month: graduationDate.getMonth() + 1,
    };
    try {
      const res = await updateProfile(values);
      onClose();
      toast({
        position: 'bottom',
        duration: 1000,
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
      firstName: user?.name?.firstName,
      lastName: props?.user?.name?.lastName,
      college: props?.user?.college,
      major: props?.user?.major,
    });
  }, [isOpen]);
  return (
    <Portal>
      <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={'flex items-center mb-4 justify-center'}>
                <img
                  style={{
                    borderRadius: ' 50%',
                    height: 100,
                    width: 100,
                    objectFit: 'cover',
                    marginRight: 24,
                    background: 'rgba(0,0,0,0.1)',
                  }}
                  src={profileImg}
                />
                <FileUploader
                  onSuccess={(url) => {
                    console.log(url);
                    setProfileImg(url);
                  }}
                >
                  <Button variant="outline">Change profile picture</Button>
                </FileUploader>
              </div>
              <Flex mb={4}>
                <FormControl id="firstName">
                  <FormLabel isRequired>First Name</FormLabel>
                  <Input
                    {...register('firstName', {
                      required: true,
                      maxLength: 100,
                    })}
                    type="firstName"
                  />
                </FormControl>
                <div className="w-8"></div>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="lastName"
                    {...register('lastName', {
                      required: true,
                      maxLength: 100,
                    })}
                  />
                </FormControl>
              </Flex>
              <FormControl id="college" mb={4} isRequired>
                <FormLabel>University</FormLabel>
                <Input
                  type="college"
                  {...register('college', {
                    required: true,
                    maxLength: 100,
                  })}
                />
              </FormControl>
              <Flex>
                <FormControl id="major" isRequired>
                  <FormLabel>Major</FormLabel>
                  <Input
                    type="major"
                    {...register('major', {
                      required: true,
                      maxLength: 100,
                    })}
                  />
                </FormControl>
                <div className="w-8"></div>

                <FormControl id="email" isRequired>
                  <FormLabel>Graduation Date</FormLabel>

                  <DatePicker
                    className="pl-2"
                    selected={graduationDate}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    showFullMonthYearPicker
                    onChange={(date) => setGraduationDate(date)}
                  />
                </FormControl>
              </Flex>
              <div className="flex justify-end py-4">
                <Button variant="ghost" onClick={onClose}>
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
