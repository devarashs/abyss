import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl">
      <Button color="grape" onClick={() => setColorScheme('light')}>
        Light
      </Button>
      <Button color="grape" onClick={() => setColorScheme('dark')}>
        Dark
      </Button>
      <Button color="grape" onClick={() => setColorScheme('auto')}>
        Auto
      </Button>
    </Group>
  );
}
