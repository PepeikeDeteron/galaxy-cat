import { VFC } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Model = dynamic(() => import('@/libs/Three'), {
  ssr: false
});

const Home: VFC = () => {
  return (
    <>
      <Head>
        <title>Galaxy Cat</title>
        <link rel="icon" href="https://img.icons8.com/color/50/000000/cat-eyes.png" />
      </Head>
      <Model />
    </>
  );
};

export default Home;