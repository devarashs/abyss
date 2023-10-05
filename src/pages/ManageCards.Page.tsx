import { Flex, LoadingOverlay, Text } from '@mantine/core';
import { useAuthFetch } from '../hooks/useAuthFetch';
import { COLORS } from '../constants/themeStatics';
import { Gallery } from '../components';

export default function ManageCards() {
  const cards = useAuthFetch('/cards/mycreations');
  return cards.isLoading ? (
    <LoadingOverlay color={COLORS.violet} />
  ) : cards.error ? (
    <Text>Error Trace to P-MC</Text>
  ) : cards.data.length > 0 ? (
    <Flex justify="center" direction="column">
      <Gallery requestQuery="/cards/mycreations" />
    </Flex>
  ) : (
    <Text>You Have Not Made Any Cards Yet! Give it A try ...</Text>
  );
}
