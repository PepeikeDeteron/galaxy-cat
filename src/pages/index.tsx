import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Model = dynamic(() => import('@/libs/Three'), {
  ssr: false
});

const Home: React.VFC = () => {
  return (
    <>
      <Head>
        <title>Three-Galaxy Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Model />
    </>
  );
};

export default Home;
