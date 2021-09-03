import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import CommonMeta from '@components/CommonMeta';
import '@components/DatePicker/datepicker.css';
import ErrorBoundary from '@components/ErrorBoundary';
import { AuthProvider } from '@context/Auth';
import Amplify from 'aws-amplify';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import awsconfig from '../aws-exports';
import '../styles/globals.css';
import { IdProvider } from '@radix-ui/react-id';
import mixpanel from 'mixpanel-browser';
// or with require() syntax:
// const mixpanel = require('mixpanel-browser');
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import { useRouter } from 'next/router';

Sentry.init({
  dsn: 'https://3c7b1a80d8c04409a255ede9111d5b23@o900209.ingest.sentry.io/5919205',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
mixpanel.init('6c24bef3bb678f503a79833dc9b09c65');
Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState('light');

  const toggleDarkMode = () => {
    console.log('toggling');
    if (darkMode === 'dark') {
      localStorage.setItem('theme', 'light');
      setDarkMode('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setDarkMode('dark');
    }
  };
  const theme = extendTheme({
    fonts: {
      heading: 'Inter',
      body: 'inter',
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let initialValue = 'light';
      if (localStorage.getItem('theme')) {
        initialValue = localStorage.getItem('theme');
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('track', router.pathname);
      mixpanel.track(router.pathname);
    }
  }, [router.pathname]);

  return (
    <div className={darkMode}>
      <Head>
        <title>Kerja.io | Untitled</title>
        <CommonMeta />
      </Head>
      <AuthProvider>
        <IdProvider>
          <ChakraProvider theme={theme}>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </ChakraProvider>
        </IdProvider>
      </AuthProvider>
    </div>
  );
}
export default MyApp;
