import React, { useState } from 'react';
import { Spinner, useToast } from '@chakra-ui/react';
import { createJobs } from '../../../api/jobs';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/react';



import JobEditComponent from '../JobEditComponent';
interface Props {
  id: string;
}
const AddJobView = ({
  company,
  createModalOpen,
  setCreateModalOpen,
}: Props) => {
  const toast = useToast();

  const [job, setJob] = useState();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onCreateJob = async () => {
    let values = getValues();
    values = {
      title: values.title,
      headquarters: values.headquarters,
      location: values.location,
      type: [values.type],
      description: values.description,
      requirements: values.requirements,

      category: values.category,
      period: values.period,
      duration: values.duration,
      hoursPerWeek: values.hoursPerWeek,
      year: [values.year],
      expires: new Date(),
    };
    try {
      const res = await createJobs(values);
      toast({
        title: 'Success',
        description: 'Successfully created job',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      setCreateModalOpen(false);
    } catch (e) {
      toast({
        title: 'Failed saving job',
        description: e.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  const onPublishListing = () => {
    const values = getValues();
  };
  if (loading) return <Spinner />;

  return (
    <Modal
      size={'3xl'}
      isOpen={createModalOpen}
      onClose={(_) => setCreateModalOpen(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create job listing</ModalHeader>
        <div className="px-8 py-2">
          <JobEditComponent
            mode="create"
            company={company}
            onClose={(_) => setCreateModalOpen(false)}
          />
        </div>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default AddJobView;
