import React, { useState, useContext, useRef, useEffect } from 'react';
import AuthContext from '@context/Auth';

import { useForm, SubmitHandler } from 'react-hook-form';

import {
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  useToast,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import router from 'next/router';
import { INDUSTRIES_LIST } from '@constants/industry';
import { getCompanies } from '@api/companies';

type EmployerSignupFormInput = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  jobTitle: string;
  company: string;
  industry: string;
};

const EmployerSignup = () => {
  const { registerEmployer } = useContext(AuthContext);

  const toast = useToast();
  const id = 'warningToast';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EmployerSignupFormInput>();

  const password = useRef({});
  password.current = watch('password', '');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [isNewCompany, setIsNewCompany] = useState('true');

  useEffect(() => {
    (async () => {
      try {
        const res = await getCompanies('');
        setCompanies(res?.data.results);
      } catch {
        console.error('Error in getting companies');
      }
    })();
  }, []);

  const onSubmit: SubmitHandler<EmployerSignupFormInput> = async (data) => {
    let company;
    if (isNewCompany === 'false') {
      company = companies.find((company) => company.id === data.company);
    }
    const payload = {
      name: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      email: data.email,
      username: data.username,
      password: data.password,
      jobTitle: data.jobTitle,
      company: isNewCompany === 'true' ? data.company : company.name,
      industry: data.industry || company.industry,
    };

    const res = await registerEmployer(payload);
    if (!res.ok) {
      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'Something went wrong',
          description: res.error,
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      if (!toast.isActive(id)) {
        toast({
          id,
          title: 'Successfully registered',
          description: res.error,
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      }
      router.push(`/verify-email?email=${data.email}`);
    }
  };

  return (
    <>
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
      <Flex
        flexDirection="column"
        width="100wh"
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="md" pt="20px" pb="40px">
          Sign Up as an Employer
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack
            spacing="20px"
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl
              width="300px"
              isRequired
              isInvalid={errors.firstName ? true : false}
            >
              <FormLabel>First Name</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  bgColor="white"
                  placeholder="First Name"
                  {...register('firstName', {
                    required: 'This is required',
                    minLength: {
                      value: 2,
                      message: 'Minimum length should be 2',
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.firstName && errors.firstName.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              width="300px"
              isRequired
              isInvalid={errors.lastName ? true : false}
            >
              <FormLabel>Last Name</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  bgColor="white"
                  placeholder="Last Name"
                  {...register('lastName', {
                    required: 'This is required',
                    minLength: {
                      value: 2,
                      message: 'Minimum length should be 2',
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.lastName && errors.lastName.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              width="300px"
              isRequired
              isInvalid={errors.username ? true : false}
            >
              <FormLabel>Username</FormLabel>
              <InputGroup>
                <Input
                  type="username"
                  bgColor="white"
                  placeholder="Username"
                  {...register('username', {
                    required: 'This is required',
                    pattern: {
                      value:
                        /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                      message: 'Username must have 8-20 characters',
                    },
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              width="300px"
              isRequired
              isInvalid={errors.email ? true : false}
            >
              <FormLabel>Work Email</FormLabel>
              <InputGroup>
                <Input
                  type="email"
                  bgColor="white"
                  placeholder="example@example.com"
                  {...register('email', {
                    required: 'This is required',
                    pattern: /^\S+@\S+\.\S+$/,
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              width="300px"
              isRequired
              isInvalid={errors.password ? true : false}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  bgColor="white"
                  placeholder="Password"
                  {...register('password', {
                    required: 'You must specify a password',
                    minLength: {
                      value: 8,
                      message: 'Password must have at least 8 characters',
                    },
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              width="300px"
              isRequired
              isInvalid={errors.confirmPassword ? true : false}
            >
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  bgColor="white"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    validate: (value) =>
                      value === password.current ||
                      'The passwords do not match',
                  })}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              width="300px"
              isRequired
              isInvalid={errors.jobTitle ? true : false}
            >
              <FormLabel>Job Title</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  bgColor="white"
                  placeholder="Job Title"
                  {...register('jobTitle', {
                    required: 'You must specify a job title',
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.jobTitle && errors.jobTitle.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              width="300px"
              isRequired
              isInvalid={errors.company ? true : false}
            >
              <FormLabel>Company</FormLabel>
              <Text>Are you part of an existing company?</Text>
              <RadioGroup
                onChange={(e) => {
                  setIsNewCompany(e);
                }}
                value={isNewCompany}
              >
                <HStack mb="2">
                  <Radio value="false">Yes</Radio>
                  <Radio value="true">No</Radio>
                </HStack>
              </RadioGroup>
              {isNewCompany === 'true' && (
                <InputGroup>
                  <Input
                    type="text"
                    bgColor="white"
                    placeholder="Company Name"
                    {...register('company', {
                      required: 'You must specify a company',
                    })}
                  />
                </InputGroup>
              )}
              {isNewCompany === 'false' && (
                <Select
                  {...register('company', {
                    required: true,
                  })}
                  placeholder="Select an existing company"
                >
                  {companies.map((company) => {
                    return <option value={company.id}>{company.name}</option>;
                  })}
                </Select>
              )}
              <FormErrorMessage>
                {errors.company && errors.company.message}
              </FormErrorMessage>
            </FormControl>
            {isNewCompany === 'true' && (
              <FormControl
                width="300px"
                isRequired
                isInvalid={errors.industry ? true : false}
              >
                <FormLabel>Industry</FormLabel>
                <Select
                  {...register('industry', {
                    required: true,
                  })}
                  placeholder="Please select an industry"
                >
                  {INDUSTRIES_LIST.map((data) => {
                    return <option value={data}>{data}</option>;
                  })}
                </Select>
                <FormErrorMessage>
                  {errors.industry && errors.industry.message}
                </FormErrorMessage>
              </FormControl>
            )}
            <Button
              borderRadius="5px"
              type="submit"
              variant="solid"
              colorScheme="red"
              isLoading={isSubmitting}
              width="300px"
            >
              Sign Up
            </Button>
            <Text color="grey" px="50px" textAlign="center">
              By signing up, you have read and agreed to the{' '}
              <Link href="/terms" as={NextLink}>
                terms and conditions
              </Link>{' '}
              and{' '}
              <Link href="/privacy" as={NextLink}>
                privacy policy
              </Link>
              . <br />
              All applications will be reviewed within 5 working days.
            </Text>
          </VStack>
        </form>
      </Flex>
    </>
  );
};

export default EmployerSignup;
