import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import BaseLayout from '@components/BaseLayout';
import DatePicker from '@components/DatePicker';
import FileUploader from '@components/FileUploader';
import PasswordField from '@components/PasswordField';
import ResumeUploader from '@components/ResumeUploader';
import AuthContext from '@context/Auth';
import { showErrorMsg } from '@helpers/';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiExternalLink } from 'react-icons/fi';
const StudentSignup = () => {
  const router = useRouter();
  const toast = useToast();
  const { step } = router.query;

  const [showSuccess, setShowSuccess] = useState(false);
  const { registerUser } = useContext(AuthContext);
  const { register, handleSubmit, watch, reset, getValues, formState } =
    useForm({ mode: 'all', reValidateMode: 'onChange' });

  const { errors, isSubmitting, dirtyFields, isDirty, isValid } = formState;

  const onNext = () => {
    if (getValues('confirmPassword') === getValues('password')) {
      router.push('/student-signup?step=2');
    } else {
      showErrorMsg('Passwords do not match');
    }
  };
  const onSubmit = async (values) => {
    console.log('vavvv', values);
    const res = await registerUser({
      username: values.email,
      name: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      password: values.password,
      email: values.email,
      year: values.graduationDate?.getFullYear(),
      month: values.graduationDate?.getMonth(),
      shortQuestion1: values.shortQuestion1,
      shortQuestion2: values.shortQuestion2,
      shortQuestion3: values.shortQuestion3,
      shortQuestion4: values.shortQuestion4,

      college: values.college,
      major: values.major,
      linkedin: values.linkedin,
    });

    if (!res.ok) {
      toast({
        title: 'An error was encountered',
        status: 'error',
        description: res.error,
        duration: 1000,
        isClosable: true,
      });
    } else {
      setShowSuccess(true);
      router.push(`/verify-email?email=${values.email}`);
    }
  };
  const onCloseSuccess = () => {
    router.push('/');
  };

  const renderStepTwo = () => {
    return (
      <>
        <Text fontSize="2xl" className="text-2xl bold">
          Help Us Get to Know You
        </Text>
        <Text className="mb-4">
          Please answer the Answering the questions below is optional, but it
          may put you ahead of other applicants. In the event that your
          application is not approved, you may come back to submit your answers.
          below.
        </Text>
        <div
          style={{ maxWidth: 720 }}
          className=" bg-white flex flex-col rounded-2xl w-auto mx-4 my-6 md:mx-auto  md:p-8 font-display  "
        >
          <FormControl id="shortQuestion1">
            <FormLabel>
              Describe a situation where you had to solve a problem.
            </FormLabel>
            <Textarea
              placeholder="Please type answer here"
              height={200}
              mb={4}
              {...register('shortQuestion1')}
            />
          </FormControl>
          <div className="w-8"></div>
          <FormControl id="shortQuestion2">
            <FormLabel>
              What is an idea or topic you are most passionate about?
            </FormLabel>
            <Textarea
              placeholder="Please type answer here"
              mb={4}
              height={200}
              type="password"
              {...register('shortQuestion2')}
            />
          </FormControl>
          <div className="w-8"></div>
          <FormControl id="shortQuestion3">
            <FormLabel>
              What books have you read in the last 6 months?
            </FormLabel>
            <Textarea
              placeholder="Please type answer here"
              mb={4}
              height={200}
              {...register('shortQuestion3')}
            />
          </FormControl>
          <FormControl id="shortQuestion4">
            <FormLabel>What is the name of your smartest friend?</FormLabel>
            <Textarea
              placeholder="Please type answer here"
              mb={4}
              height={200}
              {...register('shortQuestion4')}
            />
          </FormControl>
          <Button
            colorScheme="red"
            mb={2}
            disabled={!isValid}
            isLoading={isSubmitting}
            type="submit"
          >
            Register
          </Button>
          <Text className="mb-4">
            All applications will be reviewed within 5 working days.
          </Text>
        </div>
      </>
    );
  };

  const renderStepOne = () => {
    return (
      <>
        <Text fontSize="2xl" className="text-2xl bold mt-8">
          Sign Up as Student
        </Text>
        <Text className="mb-8">
          Kerja! is currently open to US-educated Indonesian students and select
          partner Canadian and UK institutions.
        </Text>
        <div className=" bg-white flex flex-col rounded-2xl w-auto mx-4 my-6 md:mx-auto  md:p-8 font-display md:w-96 ">
          <Modal size={'2xl'} isOpen={showSuccess} onClose={onCloseSuccess}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Successfully registered</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div>
                  Please wait a few days while we review your registration
                </div>
              </ModalBody>{' '}
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onCloseSuccess}>
                  Okay
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <div>
            <FormControl id="email" isRequired>
              <FormLabel>University Email</FormLabel>
              <Input
                mb={4}
                {...register('email', {
                  required: true,
                })}
              />
            </FormControl>
            <div className="w-8"></div>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <PasswordField
                mb={4}
                type="password"
                {...register('password', {
                  required: true,
                  minLength: 8,
                })}
              />
            </FormControl>
            <div className="w-8"></div>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <PasswordField
                mb={4}
                type="password"
                {...register('confirmPassword', {
                  required: true,
                  minLength: 8,
                })}
              />
            </FormControl>
            <FormControl id="firstName" isRequired>
              <FormLabel isRequired>First Name</FormLabel>
              <Input
                mb={4}
                {...register('firstName', {
                  required: true,
                })}
              />
            </FormControl>
            <div className="w-8"></div>
            <FormControl id="lastName" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                mb={4}
                {...register('lastName', {
                  required: true,
                })}
              />
            </FormControl>
            <div className="w-8"></div>
            <div className="w-8"></div>
            <FormControl id="college" isRequired>
              <FormLabel>University</FormLabel>
              <Input
                mb={4}
                {...register('college', {
                  required: true,
                  maxLength: 20,
                })}
              />
            </FormControl>
            <div className="w-8"></div>
            <FormControl id="major" isRequired>
              <FormLabel>Major</FormLabel>
              <Input
                mb={4}
                {...register('major', {
                  required: true,
                })}
              />
            </FormControl>

            <div className="w-8"></div>
            <FormControl id="graduationDate" isRequired>
              <FormLabel>Graduation Year</FormLabel>
              <div className=" mb-4 w-full">
                <DatePicker
                  selectedDate={getValues('graduationDate')}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  showFullMonthYearPicker
                  onChange={(url) => {
                    const value = getValues();
                    value.graduationDate = url;
                    reset(value);
                  }}
                />
              </div>
            </FormControl>
            <div className="w-8"></div>
            <FormControl id="linkedin" isRequired>
              <FormLabel>Linkedin URL</FormLabel>
              <Input
                mb={4}
                {...register('linkedin', {
                  required: true,
                })}
              />
            </FormControl>
            <FormControl id="resume" mb={4} isRequired>
              <FormLabel>Resume</FormLabel>
              <Input
                mb={4}
                {...register('resume', {
                  required: true,
                })}
                hidden
              />
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
                  description={
                    getValues('resume')
                      ? 'Resume uploaded, upload another '
                      : 'Upload resume (PDF only)'
                  }
                />
              </FileUploader>
            </FormControl>
            <Button
              colorScheme="blue"
              mr={3}
              disabled={!isValid}
              // isLoading={isSubmitting}
              onClick={onNext}
            >
              Continue
            </Button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <div
        className="kerja-gradient"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: 16,
        }}
      ></div>
      <BaseLayout>
        <div className="flex justify-center">
          <img
            className="my-4 mt-8"
            onClick={(_) => window.open('/')}
            src="https://res.cloudinary.com/yosuam19/image/upload/v1627572724/kerja/kerja-logo_one-line_color-black_b1z7va.svg"
            alt="logo"
            width={200}
            height={50}
          />
        </div>
        <form className="px-4 md:px-0" onSubmit={handleSubmit(onSubmit)}>
          {step != 2 && renderStepOne()}
          {step == 2 && renderStepTwo()}
        </form>
      </BaseLayout>
    </div>
  );
};

export default StudentSignup;
