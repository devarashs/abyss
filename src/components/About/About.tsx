import { Paper, Text, Title, useMantineColorScheme } from '@mantine/core';

export function About() {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Paper
      px="lg"
      py="sm"
      my="md"
      w={{ base: '100vw', md: '65vw' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 25,
      }}
    >
      <Title mb="md" ta="center" size={35} order={2}>
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{
            from: colorScheme === 'dark' ? 'blue' : 'pink',
            to: colorScheme === 'dark' ? 'lightblue' : 'violet',
          }}
        >
          What is This Project About?
        </Text>
      </Title>
      <Text>
        This is A Start Of a Fantasy Card Trading Game Which is Built Using React. We Will Have
        Cards With Stunning Pictures That Were Generated Using A.I , They Will Have Powers and
        Abilites and More!
      </Text>
      <Text>
        We Will Have Creators And Other Ways that I Haven&apos;t Came up With Yet To Approve User
        Made Cards - For Now We Will Have Limited Creators For Cards That Will Frequently Inject
        More Cards to The Game!
      </Text>
    </Paper>
  );
}
