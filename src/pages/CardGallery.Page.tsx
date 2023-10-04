import React from 'react';
import { Center, Flex, NativeSelect } from '@mantine/core';
import { Gallery } from '../components';
import { FrameSelection } from '../constants/creatorStatics';

export function CardGalleryPage() {
  return (
    <Flex w="100%" justify="center" direction="column">
      <Center>
        <NativeSelect
          w={{ base: '100%', md: '50%' }}
          label="Choose Frame Type"
          my="md"
          data={FrameSelection}
        />
      </Center>
      <Gallery requestQuery="/cards/" />
    </Flex>
  );
}
