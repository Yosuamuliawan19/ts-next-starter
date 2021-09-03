import { getAllEvents, registerEvent } from '@api/events';
import { Flex, Text } from '@chakra-ui/react';
/*
 * Internal components
 */
import { BaseLayout, ContentLayout } from '@components';
import AppNavbar from '@components/AppNavbar';
import useCheckMobileScreen from '@hooks/useCheckMobileScreen';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import moment from 'moment';

export default function EventDetailPage() {
  const isMobile = useCheckMobileScreen();

  const [events, setEvents] = useState([]);
  const [isLoadingRegister, setLoadingRegister] = useState(false);

  //   const { event_id } = router.query;
  const event_id = '610136809c26d70c2c5bc3dd';
  const fetchEvents = async () => {
    if (event_id) {
      const res = await getAllEvents(event_id);
      console.log(res?.data?.results);
      setEvents(res?.data?.results);
    }
  };
  const onClickRegister = async () => {
    setLoadingRegister(true);
    const res = await registerEvent(event_id);
    setLoadingRegister(false);
    fetchCurrentEvent();
  };
  useEffect(async () => {
    fetchEvents();
  }, []);
  const renderDateSection = (data) => {
    const date = moment(data);
    return (
      <Flex
        justify="center"
        alignItems="center"
        flexDirection="column"
        width="140px"
      >
        <Text>{date.format('MMM')}</Text>
        <Text fontSize="xl" className={styles.eventDate}>
          {date.format('DD')}
        </Text>
        <Text>{date.format('ddd')}</Text>
      </Flex>
    );
  };
  const renderTimeSection = (data) => {
    return (
      <Flex className={styles.eventTime}>
        <Text isTruncated>{moment(data.dateStart).format('hh:mm ')}</Text>
        <div>-</div>
        <Text isTruncated>{moment(data.dateEnad).format('hh:mm [WIB]')}</Text>
      </Flex>
    );
  };
  return (
    <>
      {!isMobile && <AppNavbar />}
      <BaseLayout className="font-display md:bg-gray-100 dark:bg-gray-800 mt-16">
        <ContentLayout className="min-h-screen">
          {/*{events?.map((data) => {*/}
          {/*  return (*/}
          {/*    <Card>*/}
          {/*      <Flex>*/}
          {/*        {renderDateSection(data.dateStart)}*/}
          {/*        <Divider orientation="vertical" />*/}

          {/*        <img className={styles.eventImg} src={data.eventImage} />*/}
          {/*        <Flex flexDirection="column" justify="center" paddingLeft="8">*/}
          {/*          <Text fontSize="xl" isTruncated fontWeight="bold">*/}
          {/*            {data.title}*/}
          {/*          </Text>*/}
          {/*          {renderTimeSection(data)}*/}
          {/*        </Flex>*/}

          {/*        <div>{data.location}</div>*/}
          {/*        <div>{data.description}</div>*/}
          {/*        <div>{data.eventType}</div>*/}
          {/*      </Flex>*/}
          {/*    </Card>*/}
          {/*  );*/}
          {/*})}*/}
          <div className={'flex flex-row mt-4 '}>
            {events?.map((data) => {
              return (
                <div className={styles.cardNew + ' '}>
                  <img className={styles.eventImgNew} src={data.eventImage} />
                  <div className={'p-4'}>
                    <div className={'bold mb-2'}>{data.title}</div>
                    <div className={'mb-2'}>{data.description}</div>

                    <a href={data.location} className={'mb-4'}>
                      {data.location}
                    </a>
                    <div className={'mb-4'}>{data.eventType}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/*<Flex justify="space-between">*/}
          {/*  <div className={styles.eventScheduledList}>*/}
          {/*    <Text isTruncated fontSize="lg">*/}
          {/*      Your Schedule*/}
          {/*    </Text>*/}
          {/*    {events?.map((data) => {*/}
          {/*      return (*/}
          {/*        <Card>*/}
          {/*          <Flex>*/}
          {/*            {renderDateSection(data.dateStart)}*/}
          {/*            <Divider orientation="vertical" />*/}
          {/*            <Flex*/}
          {/*              flexDirection="column"*/}
          {/*              justify="center"*/}
          {/*              paddingLeft="8"*/}
          {/*            >*/}
          {/*              <Text isTruncated fontWeight="bold">*/}
          {/*                {data.title}*/}
          {/*              </Text>*/}
          {/*              <Text isTruncated>{data.description}</Text>*/}
          {/*              {renderTimeSection(data)}*/}
          {/*            </Flex>*/}
          {/*          </Flex>*/}
          {/*        </Card>*/}
          {/*      );*/}
          {/*    })}*/}
          {/*  </div>*/}
          {/*  <div className={styles.eventsAllList}>*/}
          {/*    {events?.map((data) => {*/}
          {/*      return (*/}
          {/*        <Card>*/}
          {/*          <Flex>*/}
          {/*            {renderDateSection(data.dateStart)}*/}
          {/*            <Divider orientation="vertical" />*/}

          {/*            <img className={styles.eventImg} src={data.eventImage} />*/}
          {/*            <Flex*/}
          {/*              flexDirection="column"*/}
          {/*              justify="center"*/}
          {/*              paddingLeft="8"*/}
          {/*            >*/}
          {/*              <Text fontSize="xl" isTruncated fontWeight="bold">*/}
          {/*                {data.title}*/}
          {/*              </Text>*/}
          {/*              <Text isTruncated>{data.description}</Text>*/}
          {/*              {renderTimeSection(data)}*/}
          {/*            </Flex>*/}
          {/*          </Flex>*/}
          {/*        </Card>*/}
          {/*      );*/}
          {/*    })}*/}
          {/*  </div>*/}
          {/*</Flex>*/}
        </ContentLayout>
      </BaseLayout>
    </>
  );
}
