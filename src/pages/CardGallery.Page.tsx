import React from 'react';
import { Flex, NativeSelect } from '@mantine/core';
import { Gallery } from '../components';
import { FrameSelection } from '../constants/creatorStatics';

export function CardGalleryPage() {
  return (
    <Flex justify="center" align="center" direction="column">
      <NativeSelect
        w={{ base: '100%', md: '50%' }}
        label="Choose Frame Type"
        my="md"
        data={FrameSelection}
      />
      <Gallery />
    </Flex>
  );
}
