import React, { useEffect, useState } from 'react';
import { Center, Flex, LoadingOverlay, Pagination, Text } from '@mantine/core';
import { BasicFrame } from '../Cards/BasicFrame';
import { COLORS } from '../../constants/themeStatics';
import { useFilteredFetch } from '../../hooks/useFilteredFetch';

export function Gallery({
  filter,
  requestQuery,
}: {
  filter: { frameType: string };
  requestQuery: string;
}) {
  const cards = useFilteredFetch(`${requestQuery}/filter`, filter);
  const [activePage, setPage] = useState(1);

  useEffect(() => {
    cards.refetch();
  }, [filter]);

  return cards.isLoading ? (
    <LoadingOverlay color={COLORS.violet} />
  ) : cards.error ? (
    <Text>Something Went Wrong Trace Back to C-G</Text>
  ) : (
    <>
      <Flex
        p="sm"
        my="md"
        gap="md"
        wrap="wrap"
        justify="space-evenly"
        align="center"
        direction={{ base: 'column', md: 'row' }}
      >
        {cards.data.length > 0 &&
          cards.data
            .slice((activePage - 1) * 12, (activePage - 1) * 12 + 12)
            .map((card, index) => <BasicFrame index={index} key={index} card={card} />)}
      </Flex>
      <Center>
        <Pagination
          color={COLORS.violet}
          value={activePage}
          onChange={setPage}
          total={cards.data.length / 13 + 1}
        />
      </Center>
    </>
  );
}
