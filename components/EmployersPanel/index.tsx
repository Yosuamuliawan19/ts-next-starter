import {
  ChakraProvider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import EditJobView from '@components/EmployersPanel/EditJobView';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ApplicationsTab from './ApplicationsTab';
import CompanySettings from './CompanySettings';
import Sidebar from './Sidebar';
import { getEmployersSetting } from '@api/employers';
import { showErrorMsg } from '@helpers';

const Employers = () => {
  const router = useRouter();
  const [company, setCompany] = useState();
  const { job_id } = router.query;
  const [jobs, setJobs] = useState();
  const [loading, setLoading] = useState(false);
  const refreshCompany = async () => {
    try {
      const res = await getEmployersSetting();
      const companyResult = res?.data?.company;
      setCompany(companyResult);
      setJobs(res?.data?.jobs);
    } catch (e) {
      showErrorMsg('Failed getting company settings');
    }
  };
  useEffect(async () => {
    setLoading(true);
    refreshCompany();
    setLoading(false);
  }, []);

  const renderContent = () => {
    if (router?.query?.tab === 'settings') {
      return (
        <div className={'p-8 w-full'}>
          <CompanySettings company={company} refreshCompany={refreshCompany} />
        </div>
      );
    }
    if (!job_id) {
      return (
        <div className="w-full h-screen h1 bold flex items-center justify-center">
          No Job currently not selected
        </div>
      );
    }
    return (
      <div className={'p-8 w-full'} style={{ height: '100vh' }}>
        <Tabs>
          <TabList>
            <Tab>Applications</Tab>
            <Tab>Job Info</Tab>
          </TabList>
          <TabPanels>
            <TabPanel className={'overflow-y-scroll'}>
              <ApplicationsTab id={job_id} />
            </TabPanel>
            <TabPanel>
              <EditJobView
                id={job_id}
                company={company}
                onUpdate={refreshCompany}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  };

  return (
    <div
      className="flex text-md"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <Sidebar company={company} jobs={jobs} />
      {renderContent()}
    </div>
  );
};

const WrappedEmployers = () => {
  return (
    <ChakraProvider>
      <Employers />
    </ChakraProvider>
  );
};
export default WrappedEmployers;
