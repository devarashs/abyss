import React from 'react';
import { Flex, LoadingOverlay, Text } from '@mantine/core';
import { BasicFrame } from '../Cards/BasicFrame';
import { COLORS } from '../../constants/themeStatics';
import { useAuthFetch } from '../../hooks/useAuthFetch';

export function HomeCardPreview() {
  const cards = useAuthFetch('/cards/');
  return cards.isLoading ? (
    <LoadingOverlay color={COLORS.violet} />
  ) : cards.error ? (
    <Text>Something Went Wrong Trace Back to C-HCP</Text>
  ) : (
    <Flex
      gap="md"
      wrap="wrap"
      justify="space-evenly"
      align="center"
      direction={{ base: 'column', md: 'row' }}
    >
      {cards.data.length > 0 &&
        cards.data
          .slice(0, 3)
          .map((card) => <BasicFrame key={(card as CardProps).name} card={card} />)}
    </Flex>
  );
}
