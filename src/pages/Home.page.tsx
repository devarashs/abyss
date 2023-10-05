import { Flex } from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { About, HomeCardPreview, Welcome } from '../components';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Flex justify="center" align="center" gap="sm" direction="column">
        <Welcome />
        <About />
        <HomeCardPreview />
      </Flex>
    </>
  );
}
