import { Center, Flex, NativeSelect } from '@mantine/core';
import { useState } from 'react';
import { Gallery } from '../components';
import { FrameSelection } from '../constants/creatorStatics';

export default function ManageCards() {
  const [frameTypeFilter, setFrameTypeFilter] = useState('all');
  return (
    <>
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
      <Flex justify="center" direction="column">
        <Gallery requestQuery="/cards/mycreations" filter={{ frameType: frameTypeFilter }} />
      </Flex>
    </>
  );
}
