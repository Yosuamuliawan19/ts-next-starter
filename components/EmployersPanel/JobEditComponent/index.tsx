import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  Input,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { createJobs, getJob, updateJob } from '@api/jobs';
import { useForm } from 'react-hook-form';
import { STATUS_TYPES, EDIT_MODE } from '@constants';
import { getStatusColor } from '@helpers/status';
import HelpModal from '../HelpModal';
import MultiSelect from '@components/MultiSelect';
import moment from 'moment';

import { Tag, Select, Divider } from '@chakra-ui/react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { showErrorMsg, showSuccessMsg } from '@helpers';
import { INTEREST_LIST } from '@constants/interests';
import { EDUCATION_LEVEL_LIST } from '@constants/educationLevel';
import { useRouter } from 'next/router';
import { workingPeriod } from '@constants/workingPeriod';

interface Props {
  id: string;
  mode?: string;
  company: any;
  onClose: any;
  onUpdate: any;
}
const JobEditComponent = ({
  mode = EDIT_MODE.CREATE,
  id,
  company,
  onClose,
  onUpdate,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [yearValues, setYearValues] = useState();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  console.log('job edit');
  const onTogglePublish = async () => {
    const currentStatus = getValues('status');
    let newStatus;
    if (currentStatus === STATUS_TYPES.PUBLISHED) {
      newStatus = STATUS_TYPES.DRAFT;
    } else if (currentStatus === STATUS_TYPES.DRAFT) {
      newStatus = STATUS_TYPES.PUBLISHED;
    } else if (currentStatus === STATUS_TYPES.CLOSED) {
      newStatus = STATUS_TYPES.DRAFT;
    } else {
      newStatus = STATUS_TYPES.DRAFT;
    }
    try {
      const res = await updateJob(id, {
        status: newStatus,
      });
      showSuccessMsg('Successfully changed publishing status');
      refreshJobDetails();
    } catch (e) {
      showErrorMsg('Failed saving job');
    }
  };
  const onArchive = async () => {
    try {
      const res = await updateJob(id, {
        status: STATUS_TYPES.ARCHIVED,
      });
      showSuccessMsg('Successfully changed publishing status');
      refreshJobDetails();
    } catch (e) {
      showErrorMsg('Failed saving job');
    }
  };
  const onSubmit = async () => {
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
      year: yearValues.map((data) => {
        return data.value;
      }),
    };
    try {
      let res;
      if (mode === EDIT_MODE.CREATE) {
        res = await createJobs({
          ...values,
        });
        console.log('res', res);
        router.push(`employers?job_id=${res?.data?.job?.id}`);
        onClose();
      } else {
        res = await updateJob(id, values);
        refreshJobDetails();
      }

      showSuccessMsg(
        `Successfully ${mode === EDIT_MODE.CREATE ? 'created' : 'updated'} job`
      );
    } catch (e) {
      showErrorMsg('Failed saving job');
    }
  };

  const refreshJobDetails = async () => {
    setLoading(true);
    try {
      let values = await getJob(id);
      values = values.data;
      reset({
        title: values.title,
        headquarters: values.headquarters,
        location: values.location,
        type: values.type[0],
        description: values.description,
        requirements: values.requirements,
        category: values.category,
        period: values.period,
        duration: values.duration,
        hoursPerWeek: values.hoursPerWeek,
        status: values.status,
        updatedAt: values.updatedAt,
      });
      setYearValues(
        values?.year.map((data) => {
          return { label: data, value: data };
        })
      );
      if (onUpdate) onUpdate();
    } catch (e) {
      showErrorMsg('Failed getting job');
    }
    setLoading(false);
  };
  const currentStatus = getValues('status');
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);

  useEffect(() => {
    if (mode === 'edit') refreshJobDetails();
  }, [id]);
  if (loading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" w-auto text-sm  bg-white  md:rounded-xl  fade-in-fwd dark:bg-gray-700 dark:text-white z-max_4"
    >
      <div>
        <div className=" hover:cursor-pointer dark:text-white  text-sm  fade-in-fwd  ">
          {mode === EDIT_MODE.EDIT && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="inline-block">
                  <div className="flex items-center mb-1">
                    Status:
                    <Tag
                      ml={2}
                      borderRadius="full"
                      size={'sm'}
                      variant="solid"
                      bgColor={getStatusColor(currentStatus)}
                    >
                      {getValues('status')}
                    </Tag>
                  </div>
                  <div className="text-gray-400 ">
                    Last edited:{' '}
                    {moment(getValues('updatedAt')).format('MMMM Do YYYY')}
                  </div>
                </div>

                <div>
                  {currentStatus === STATUS_TYPES.ARCHIVED ? (
                    <Button
                      colorScheme="red"
                      variant="outline"
                      onClick={onTogglePublish}
                    >
                      Unarchive
                    </Button>
                  ) : currentStatus === STATUS_TYPES.CLOSED ? (
                    <div className="flex items-center">
                      <div className="flex items-center">
                        This position has been automatically closed by the
                        system, however, you can still reopen it.
                        <a
                          className="text-red-600 bold ml-2 cursor-pointer"
                          onClick={(_) => setHelpModalOpen(true)}
                        >
                          Learn More
                        </a>
                        <HelpModal
                          isOpen={isHelpModalOpen}
                          setOpen={setHelpModalOpen}
                        />
                      </div>
                      <Button
                        ml={2}
                        colorScheme="red"
                        variant="outline"
                        onClick={onTogglePublish}
                      >
                        Reopen
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={onArchive}
                      >
                        Archive
                      </Button>
                      <Button
                        colorScheme="red"
                        variant="outline"
                        ml={2}
                        type={'submit'}
                        // onClick={onSubmit}
                      >
                        Save changes
                      </Button>
                      <Button
                        colorScheme="red"
                        variant="solid"
                        ml={2}
                        onClick={onTogglePublish}
                      >
                        {getValues('status') === STATUS_TYPES.PUBLISHED
                          ? 'Unpublish'
                          : 'Publish'}
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <Divider borderColor="gray.400" />
            </div>
          )}
        </div>
        <div
          style={
            mode === EDIT_MODE.EDIT
              ? { height: 'calc(100vh - 140px)', overflow: 'scroll' }
              : {}
          }
        >
          <div className="flex items-start justify-between mt-4">
            <div className={'flex'}>
              <img className="w-12 h-12 mr-4" src={company?.logo} />
              <div className={'flex flex-col'}>
                <div className="bold  mb-2">Job Title</div>
                <FormControl isRequired isInvalid={errors.title ? true : false}>
                  <Input
                    className={'bold'}
                    placeholder="Job title"
                    size="md"
                    width={400}
                    mb={2}
                    {...register('title', {
                      required: true,
                    })}
                  />
                </FormControl>
                <div className="flex">
                  <div className="flex items-center"></div>
                </div>
              </div>
            </div>
          </div>
          <div className=" my-4 md:flex">
            <div className="md:mr-8">
              <div className="bold  mb-2">📍 Office Location</div>
              <FormControl
                isRequired
                isInvalid={errors.headquarters ? true : false}
              >
                <Input
                  placeholder="Office location"
                  {...register('headquarters', {
                    required: true,
                  })}
                />
              </FormControl>
            </div>
            <div className="md:mr-8">
              <div className="bold  mb-2">Position Type</div>
              <FormControl isRequired isInvalid={errors.type ? true : false}>
                <Select
                  {...register('type', {
                    required: true,
                  })}
                  placeholder="Select option"
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className=" my-4 md:flex">
            <div className="md:mr-8">
              <div className="bold  mb-2">Work from</div>
              <FormControl
                isRequired
                isInvalid={errors.location ? true : false}
              >
                <Select
                  {...register('location', {
                    required: true,
                  })}
                  placeholder="Select option"
                >
                  <option value="In-person">In-person</option>
                  <option value="Remote">Remote</option>
                </Select>
              </FormControl>
            </div>
            <div className="md:mr-8">
              <div className="bold  mb-2">Category</div>
              <FormControl
                isRequired
                isInvalid={errors.category ? true : false}
              >
                <Select
                  {...register('category', {
                    required: true,
                  })}
                  placeholder="Select option"
                >
                  {INTEREST_LIST.map((data) => {
                    return <option value={data}>{data}</option>;
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="md:mr-8">
              <div className="bold  mb-2">Year</div>
              <div style={{ minWidth: 280 }}>
                {/*<FormControl isRequired isInvalid={errors.year ? true : false}>*/}

                <MultiSelect
                  className="w-90"
                  isMulti
                  options={EDUCATION_LEVEL_LIST.map((data) => {
                    return {
                      label: data,
                      value: data,
                    };
                  })}
                  placeholder="Select year requirment"
                  closeMenuOnSelect={false}
                  value={yearValues}
                  onChange={(e) => {
                    console.log(e);
                    setYearValues(e);
                  }}
                />
                {/*</FormControl>*/}
              </div>
            </div>
          </div>
          <div className=" my-4 md:flex">
            <div className="md:mr-8">
              <div className="bold  mb-2">Period</div>
              <FormControl isRequired isInvalid={errors.period ? true : false}>
                <Select
                  {...register('period', {
                    required: true,
                  })}
                  placeholder="Select option"
                >
                  {workingPeriod.map((data) => {
                    return <option value={data}>{data}</option>;
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="md:mr-8">
              <div className="bold  mb-2">Duration (months)</div>
              <FormControl
                isRequired
                isInvalid={errors.duration ? true : false}
              >
                <NumberInput size="md" maxW={20} defaultValue={3} min={0}>
                  <NumberInputField
                    {...register('duration', {
                      required: true,
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </div>
            <div className="md:mr-8">
              <div className="bold  mb-2">Hours per week</div>
              <FormControl
                isRequired
                isInvalid={errors.hoursPerWeek ? true : false}
              >
                <NumberInput size="md" maxW={20} defaultValue={3} min={0}>
                  <NumberInputField
                    {...register('hoursPerWeek', {
                      required: true,
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </div>
          </div>
          <div className=" my-4">
            <div className="bold  my-2">Requirements</div>
            <FormControl
              isRequired
              isInvalid={errors.requirements ? true : false}
            >
              <Textarea
                height={200}
                mt={2}
                {...register('requirements', {
                  required: true,
                })}
              />
            </FormControl>
            <div className="bold  my-2">Description</div>
            <FormControl
              isRequired
              isInvalid={errors.description ? true : false}
            >
              <Textarea
                height={200}
                mt={2}
                {...register('description', {
                  required: true,
                })}
              />
            </FormControl>
          </div>
        </div>
        {mode === EDIT_MODE.CREATE && (
          <div className="flex justify-end">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" mr={3} type={'submit'}>
              Save as Draft
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default JobEditComponent;
