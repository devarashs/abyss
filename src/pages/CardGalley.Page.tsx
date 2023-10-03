import React from 'react';
import { Flex, NativeSelect } from '@mantine/core';
import { Gallery } from '../components';
import { FrameSelection } from '../constants/creatorStatics';

export function CardGalleyPage() {
  return (
    <Flex justify="center" align="center" direction="column">
      <NativeSelect w={500} my="md" data={FrameSelection} />
      <Gallery />
    </Flex>
  );
}
