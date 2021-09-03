import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@context/Auth';
import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
interface Props {
  useCard?: boolean;
}
const AccountManagement = ({ useCard }: Props) => {
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, userDetails } = useContext(AuthContext);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const payload = {
      email: event.target[0].value,
      password: event.target[1].value,
    };
    const res = await loginUser(payload);

    if (!res.ok) {
      toast({
        title: 'Failed logging in',
        description: res.error,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    } else {
      console.log(res);
      if (res?.data?.user?.role === 'employer') {
        router.push('/employers');
      } else {
        router.push('/jobs');
      }
    }
  };
  const renderContent = () => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col items-center my-4">
          <img
            onClick={(_) => window.open('/')}
            src="https://res.cloudinary.com/yosuam19/image/upload/v1627572724/kerja/kerja-logo_one-line_color-black_b1z7va.svg"
            alt="logo"
            width={140}
            height={50}
          />
        </div>
        <div className="font-display font-bold text-lg dark:text-white">
          Welcome back!
        </div>
        <form onSubmit={handleLogin} className="pt-2">
          <Input placeholder="Email Address" mb={4}></Input>
          <InputGroup size="md" mb={2}>
            <Input
              pr="4.5rem"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={(_) => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Link href={'/forgot-password'}>
            <a className=" font-display text-sm text-blue-500 cursor-pointer ">
              Forgot password?
            </a>
          </Link>
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-4">
              <Button type={'submit'}>Sign in</Button>
            </div>
            <Link href={'/sign-up'}>
              <div className=" text-sm font-display cursor-pointer">
                Dont have an account ?
                <a className="ml-2  text-blue-500 ">Register here</a>
              </div>
            </Link>
          </div>
        </form>
      </div>
    );
  };
  if (useCard) {
    return (
      <div className=" bg-white flex flex-col rounded-2xl w-auto mx-4 my-6 md:mx-auto  md:p-8 md:shadow-lg md:w-96 ">
        {renderContent()}
      </div>
    );
  }
  return renderContent();
};

export default AccountManagement;
