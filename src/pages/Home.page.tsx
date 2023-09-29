import { Flex } from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { About, Welcome } from '../components';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Flex justify="center" align="center" gap="sm" direction="column">
        <Welcome />
        <About />
      </Flex>
    </>
  );
}
