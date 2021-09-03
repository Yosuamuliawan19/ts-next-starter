import React from 'react';
import {
  HStack,
  VStack,
  Box,
  Heading,
  Text,
  Button,
  Link,
} from '@chakra-ui/react';

import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
import NextLink from 'next/link';

export default function RegisterLanding() {
  const isMobile = useCheckMobileScreen();

  const renderStudentCard = () => (
    <Box
      bg="#094067"
      h="240px"
      w={isMobile ? '90vw' : '400px'}
      rounded="10px"
      p={8}
    >
      <Heading size="md" fontWeight="normal" color="white">
        Students
      </Heading>
      <Box mb={8} h="38px">
        <Text color="white" my={2}>
          Gain access to over 200+ Indonesian top companies.
        </Text>
      </Box>
      <NextLink href="/student-signup">
        <Button colorScheme="red">Sign up as a Student</Button>
      </NextLink>
    </Box>
  );

  const renderEmployerCard = () => (
    <Box
      bg="#094067"
      h="240px"
      w={isMobile ? '90vw' : '400px'}
      rounded="10px"
      p={8}
    >
      <Heading size="md" fontWeight="normal" color="white">
        Employers
      </Heading>
      <Box mb={8} h="38px">
        <Text color="white" my={2}>
          Hire talent from top US universities.
        </Text>
      </Box>
      <NextLink href="/employer-signup">
        <Button colorScheme="red">Sign up as an Employer</Button>
      </NextLink>
    </Box>
  );

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
      <VStack
        py={isMobile ? '60px' : '180px'}
        justifyContent="center"
        alignItems="center"
      >
        {!isMobile && (
          <HStack spacing={10}>
            {renderStudentCard()}
            {renderEmployerCard()}
          </HStack>
        )}
        {isMobile && (
          <VStack spacing={5}>
            {renderStudentCard()}
            {renderEmployerCard()}
          </VStack>
        )}
        <HStack justifyContent="center" p={5}>
          <Text mt={2}> Already have an account? </Text>
          <NextLink href="/sign-in">
            <Link
              fontWeight="700"
              bgGradient="linear(to-r, #E4363D, #3DA9FC)"
              bgClip="text"
            >
              Sign In
            </Link>
          </NextLink>
        </HStack>
      </VStack>
    </>
  );
}
