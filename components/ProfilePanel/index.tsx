/*
 * Internal components
 */
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react';
import { BaseLayout } from '@components';
import AppMobileNavbar from '@components/AppMobileNavbar';
import AppNavbar from '@components/AppNavbar';
import LoadingOverlay from '@components/LoadingOverlay';
import ReferralSection from '@components/ProfilePanel/ReferralSection';
import UserContactSection from '@components/ProfilePanel/UserContactSection';
import UserInfoSection from '@components/ProfilePanel/UserInfoSection';
import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
import React, { useEffect, useState } from 'react';
import { getProfile } from '../../api/profile';
import PastApplications from './PastApplications';
import SavedJobs from './SavedJobs';
import AuthContext, { USER_ROLES } from '@context/Auth';
import { useContext } from 'react';

function ProfilePanel() {
  const isMobile = useCheckMobileScreen();
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const { userDetails } = useContext(AuthContext);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      setProfile(res.data);
    } catch (e) {
      toast({
        title: 'Failed fetching profile',
        description: e.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }

    setLoading(false);
  };
  useEffect(async () => {
    fetchProfile();
  }, []);

  const renderSidebar = () => {
    if (isMobile) {
      return (
        <>
          <UserInfoSection user={profile?.user} onEditSuccess={fetchProfile} />
          <ReferralSection user={profile?.user} />
          <UserContactSection
            user={profile?.user}
            onEditSuccess={fetchProfile}
          />
        </>
      );
    }
    return (
      <div className="w-auto overflow-y-scroll mt-4" style={{ width: 360 }}>
        <UserInfoSection user={profile?.user} onEditSuccess={fetchProfile} />
        <ReferralSection user={profile?.user} />
        <UserContactSection user={profile?.user} onEditSuccess={fetchProfile} />
      </div>
    );
  };

  return (
    <>
      {!isMobile && <AppNavbar />}
      {isMobile && <AppMobileNavbar />}
      {isLoading && <LoadingOverlay />}
      <BaseLayout className="font-display md:bg-gray-100">
        <div className="max-w-screen-xl mx-auto">
          <div className=" md:pt-16">
            {userDetails?.role !== USER_ROLES.USER ? (
              <div className="w-full md:h-screen md:overflow-y-auto mt-4">
                This page is only available to users
              </div>
            ) : (
              <div className={'flex ' + (isMobile ? 'flex-col' : '')}>
                {renderSidebar()}
                <div className="w-full md:h-screen md:overflow-y-auto mt-4">
                  <Tabs>
                    <TabList>
                      <Tab>Submitted applications</Tab>
                      <Tab>Saved Jobs</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <PastApplications
                          applications={profile?.applications}
                        />
                      </TabPanel>
                      <TabPanel>
                        <SavedJobs
                          saved={profile?.saved}
                          onSaveJob={(_) => {
                            fetchProfile();
                          }}
                        />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </div>
              </div>
            )}
          </div>
        </div>
      </BaseLayout>
    </>
  );
}

export default ProfilePanel;
