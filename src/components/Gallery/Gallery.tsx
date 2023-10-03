import React, { useState } from 'react';
import { Flex, LoadingOverlay, Pagination, Text } from '@mantine/core';
import { BasicFrame } from '../Cards/BasicFrame';
import { COLORS } from '../../constants/themeStatics';
import { useUnAuthFetch } from '../../hooks/useUnAuthFetch';

export function Gallery() {
  const cards = useUnAuthFetch('/cards/');
  const [activePage, setPage] = useState(1);
  return cards.isLoading ? (
    <LoadingOverlay color={COLORS.violet} />
  ) : cards.error ? (
    <Text>Something Went Wrong Trace Back to C-G</Text>
  ) : (
    <>
      <Flex
        my="md"
        gap="md"
        wrap="wrap"
        justify="space-evenly"
        align="center"
        direction={{ base: 'column', md: 'row' }}
      >
        {cards.data.length > 0 &&
          cards.data.slice((activePage - 1) * 10, (activePage - 1) * 10 + 9).map((card) => (
            <>
              <BasicFrame key={(card as CardProps).name} card={card} />
            </>
          ))}
      </Flex>
      <Pagination value={activePage} onChange={setPage} total={cards.data.length / 15 + 1} />
    </>
  );
}
