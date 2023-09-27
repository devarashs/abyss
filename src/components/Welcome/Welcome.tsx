import { Title, Text, useMantineColorScheme } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  const { colorScheme } = useMantineColorScheme();
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{
            from: colorScheme === 'dark' ? 'lightblue' : 'pink',
            to: colorScheme === 'dark' ? 'blue' : 'purple',
          }}
        >
          Abyss
        </Text>
      </Title>
      <Text ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Nietzsche once said, &quot;He who fights with monsters should look to it that he himself
        does not become a monster. And if you gaze long into an abyss, the abyss also gazes into
        you.&quot;
      </Text>
    </>
  );
}
