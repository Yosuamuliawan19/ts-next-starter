import { getEvent, registerEvent } from '@api/events';
import { Flex, Heading, Text } from '@chakra-ui/react';
/*
 * Internal components
 */
import { BaseLayout, ContentLayout } from '@components';
import AppNavbar from '@components/AppNavbar';
import Card from '@components/Card';
import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import moment from 'moment';

export default function EventDetailPage() {
  const isMobile = useCheckMobileScreen();

  const [event, setEvent] = useState(null);
  const [isLoadingRegister, setLoadingRegister] = useState(false);

  //   const { event_id } = router.query;
  const event_id = '610136809c26d70c2c5bc3dd';
  const fetchCurrentEvent = async () => {
    if (event_id) {
      const res = await getEvent(event_id);
      setEvent(res?.data);
    }
  };
  const onClickRegister = async () => {
    setLoadingRegister(true);
    const res = await registerEvent(event_id);
    setLoadingRegister(false);
    fetchCurrentEvent();
  };
  useEffect(async () => {
    fetchCurrentEvent();
  }, []);
  return (
    <>
      {!isMobile && <AppNavbar />}
      <BaseLayout className="font-display md:bg-gray-100 dark:bg-gray-800 mt-16">
        <ContentLayout className="min-h-screen">
          <Card>
            <Flex justify="space-between">
              <div>
                <Flex className={styles.eventDate}>
                  <Text isTruncated>
                    {moment(event?.dateStart).format('MMM DD [AT] hh.mm [PM]')}
                  </Text>
                  <Text isTruncated>
                    {moment(event?.dateEnd).format('[-] hh.mm [EDT]')}
                  </Text>
                </Flex>
                <Heading isTruncated as="h4">
                  {event?.title}
                </Heading>
                <Text isTruncated className={styles.eventType} fontSize="lg">
                  {event?.eventType}
                </Text>
              </div>
              <Flex alignItems="center">
                {/* <Button
                  onClick={onClickRegister}
                  isLoading={isLoadingRegister}
                  colorScheme="red"
                >
                  {event?.registered ? 'Registered' : 'Register'}
                </Button> */}
              </Flex>
            </Flex>
          </Card>
          <Flex>
            <img className={styles.eventImg} src={event?.eventImage} />
            <Card className={styles.eventDescription}>
              <Text fontWeight="bold" fontSize="xl" isTruncated>
                Description
              </Text>
              <Text isTruncated>{`📍  ${event?.location}`}</Text>
              <Text isTruncated>{`🌎  ${event?.visibility}`}</Text>
              <Text isTruncated>{event?.description}</Text>
            </Card>
          </Flex>
        </ContentLayout>
      </BaseLayout>
    </>
  );
}
