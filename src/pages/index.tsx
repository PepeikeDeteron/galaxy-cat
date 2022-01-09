import React from 'react';
import Head from 'next/head';

const Home: React.VFC = () => {
  return (
    <>
      <Head>
        <title>Hello World</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>yarn dev test</h1>
      </div>
    </>
  );
};

export default Home;
