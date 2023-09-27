import { Flex } from '@mantine/core';
import { About, Welcome } from '../components';

export function HomePage() {
  return (
    <Flex justify="center" align="center" gap="sm" direction="column">
      <Welcome />
      <About />
    </Flex>
  );
}
