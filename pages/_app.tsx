import CommandCenter, { COMMAND_LIST } from '@components/Common/CommandCenter';
import CommonMeta from '@components/Common/CommonMeta';
import ErrorBoundary from '@components/Layout/ErrorBoundary';
import { IdProvider } from '@radix-ui/react-id';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { KBarProvider } from 'kbar';
import nightwind from 'nightwind/helper';
// import 'nprogress/nprogress.css';
import { LocaleProvider } from '@douyinfe/semi-ui';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import AuthModal from '@components/Common/AuthModal';
import { SessionProvider } from 'next-auth/react';
import { initializeApp } from 'firebase/app';
import { FIREBASE_CONFIG } from '@constants/';

// TODO: Replace the following with your app's Firebase project configuration
const app = initializeApp(FIREBASE_CONFIG);
// Sentry.init({
//   dsn: 'https://3c7b1a80d8c04409a255ede9111d5b23@o900209.ingest.sentry.io/5919205',
//   integrations: [new Integrations.BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });
// mixpanel.init('6c24bef3bb678f503a79833dc9b09c65');
// Amplify.configure(awsconfig);
// import Router from 'next/router';
// import nProgress from 'nprogress';
// Router.events.on('routeChangeStart', nProgress.start);
// Router.events.on('routeChangeError', nProgress.done);
// Router.events.on('routeChangeComplete', nProgress.done);

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     mixpanel.track(router.pathname);
  //   }
  // }, [router.pathname]);

  return (
    <SessionProvider session={session}>
      <LocaleProvider locale={en_GB}>
        <KBarProvider actions={COMMAND_LIST}>
          <Head>
            <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
            <CommonMeta />
          </Head>
          {/* <TopProgressBar /> */}
          {/*<AuthProvider>*/}
          <AuthModal />
          <div className={'text-black bg-white'} id={'dark-id dark'}>
            <IdProvider>
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </IdProvider>
          </div>
          <CommandCenter />
          {/*</AuthProvider>*/}
        </KBarProvider>
      </LocaleProvider>
    </SessionProvider>
  );
}
export default MyApp;
