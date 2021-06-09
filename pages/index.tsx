// Next
import Head from 'next/head';

// Components
import Navbar from '../components/Navbar';

// React Types
import { FC } from 'react';

const Auth0Landing: FC = () => {
  return (
    <div>
      <Head>
        <title>Auth0 - Kanui</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1>Auth0 - Kanui</h1>
      </main>
    </div>
  );
};

export default Auth0Landing;
