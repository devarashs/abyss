import React, { useState } from 'react';
import { Center, Flex, NativeSelect } from '@mantine/core';
import { Gallery } from '../components';
import { FrameSelection } from '../constants/creatorStatics';

export default function CardGalleryPage() {
  const [frameTypeFilter, setFrameTypeFilter] = useState('all');
  return (
    <Flex w="100%" justify="center" direction="column">
      <Center>
        <NativeSelect
          w={{ base: '100%', md: '50%' }}
          label="Choose Frame Type"
          my="md"
          data={FrameSelection}
          defaultValue={frameTypeFilter}
          onChange={(event) => setFrameTypeFilter(event.target.value)}
        />
      </Center>
      <Gallery requestQuery="/cards" filter={{ frameType: frameTypeFilter }} />
    </Flex>
  );
}
