import React, { useState } from 'react';
import { Center, Flex, LoadingOverlay, Pagination, Text } from '@mantine/core';
import { BasicFrame } from '../Cards/BasicFrame';
import { COLORS } from '../../constants/themeStatics';
import { useAuthFetch } from '../../hooks/useAuthFetch';

export function Gallery({ requestQuery }: { requestQuery: string }) {
  const cards = useAuthFetch(requestQuery);
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
          cards.data
            .slice((activePage - 1) * 10, (activePage - 1) * 10 + 9)
            .map((card, index) => <BasicFrame key={index} card={card} />)}
      </Flex>
      <Center>
        <Pagination value={activePage} onChange={setPage} total={cards.data.length / 9 + 1} />
      </Center>
    </>
  );
}
