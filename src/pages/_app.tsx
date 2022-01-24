import { VFC } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import 'normalize.css';

const App: VFC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
