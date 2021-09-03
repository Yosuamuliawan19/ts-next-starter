import CommonMeta from '@components/CommonMeta';
import ErrorBoundary from '@components/ErrorBoundary';
import { AuthProvider } from '@context/Auth';
import { IdProvider } from '@radix-ui/react-id';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

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

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     mixpanel.track(router.pathname);
  //   }
  // }, [router.pathname]);

  return (
    <div>
      <Head>
        <title>Next TS Starter 🔥</title>
        <CommonMeta />
      </Head>
      <AuthProvider>
        <IdProvider>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </IdProvider>
      </AuthProvider>
    </div>
  );
}
export default MyApp;
