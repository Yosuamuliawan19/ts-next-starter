import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import { updateCompany } from '../../../api/companies';
import { useToast } from '@chakra-ui/react';
import FileUploader from '@components/FileUploader';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import AuthContext from '@context/Auth';
import { INDUSTRIES_LIST } from '@constants/industry';
interface Props {
  id: string;
}
const CompanySettings = ({ company, refreshCompany }: Props) => {
  const toast = useToast();
  const [companyLogo, setCompanyLogo] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(async () => {
    if (company) {
      reset({
        name: company.name,
        description: company.description,
        website: company.website,
        location: company.location,
        industry: company.industry,
        size: company.size,
      });
      setCompanyLogo(company.logo);
    }
  }, [company]);
  const onSubmit = async (values) => {
    values = {
      ...values,
      logo: companyLogo,
    };
    try {
      const res = await updateCompany(company?.id, values);
      refreshCompany();
      toast({
        title: 'Success',
        description: 'Company profile updated',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } catch (e) {
      toast({
        title: 'Failed updating company profile',
        description: e.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  const { logoutUser } = useContext(AuthContext);

  const onLogout = async () => {
    const res = await logoutUser();
    if (!res.ok) {
      router.push('/');
    } else {
      router.push('/');
    }
  };
  if (loading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-pop-up-top">
      <div className={'text-xl bold mb-4'}>Company profile</div>
      <div className="flex justify-center items-center">
        <img
          style={{
            borderRadius: ' 50%',
            height: 100,
            width: 100,
            objectFit: 'cover',
            marginRight: 24,
          }}
          src={companyLogo}
        />
        <FileUploader
          onSuccess={(url) => {
            setCompanyLogo(url);
          }}
        >
          <Button variant="outline">Change company logo</Button>
        </FileUploader>
      </div>
      <div className={'flex w-full'}>
        <div className={'w-1/2 p-2'}>
          <FormControl
            id="name"
            mb={4}
            isRequired
            isInvalid={errors.name ? true : false}
          >
            <FormLabel>Company Name</FormLabel>
            <Input
              {...register('name', {
                required: true,
              })}
            />
          </FormControl>
          <FormControl
            id="description"
            mb={4}
            isRequired
            isInvalid={errors.description ? true : false}
          >
            <FormLabel>Company Description</FormLabel>
            <Textarea
              height={220}
              {...register('description', {
                required: true,
              })}
            />
          </FormControl>
        </div>
        <div className={'w-1/2 p-2'}>
          <FormControl
            id="website"
            mb={4}
            isRequired
            isInvalid={errors.website ? true : false}
          >
            <FormLabel>Company Site</FormLabel>
            <Input
              {...register('website', {
                required: true,
              })}
            />
          </FormControl>

          <FormControl
            id="location"
            mb={4}
            isRequired
            isInvalid={errors.location ? true : false}
          >
            <FormLabel>Location</FormLabel>
            <Input
              {...register('location', {
                required: true,
              })}
            />
          </FormControl>
          <FormControl
            id="industry"
            mb={4}
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
          </FormControl>
          <FormControl
            id="size"
            mb={4}
            isRequired
            isInvalid={errors.size ? true : false}
          >
            <FormLabel>Company Size</FormLabel>
            <Input
              {...register('size', {
                required: true,
              })}
            />
          </FormControl>
        </div>
      </div>
      <div className="flex justify-end ">
        <Button colorScheme="red" variant="outline" mr={4} onClick={onLogout}>
          Logout
        </Button>
        <Button
          colorScheme="red"
          variant="solid"
          // mt={4}
          type="submit"
          isLoading={isSubmitting}
        >
          Save profile
        </Button>
      </div>
    </form>
  );
};
export default CompanySettings;
