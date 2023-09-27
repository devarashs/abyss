import '@mantine/core/styles.css';
import { AppShell, Button, Group, Text, Title, useMantineColorScheme } from '@mantine/core';
import { IconBrightnessUp, IconMoonFilled } from '@tabler/icons-react';
import { ToastContainer } from 'react-toastify';
import { COLORS } from './constants/themeStatics';
import { Router } from './Router';
import { HeaderMenu } from './components/HeaderMenu/HeaderMenu';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <AppShell padding="md" header={{ height: 85 }}>
      <AppShell.Header
        m="xs"
        p="md"
        style={{
          backgroundColor: colorScheme === 'dark' ? COLORS.violet : COLORS.lightviolet,
          borderRadius: 15,
        }}
      >
        <Group justify="space-between">
          <Title size={40}>
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{
                from: colorScheme === 'dark' ? 'white' : 'pink',
                to: colorScheme === 'dark' ? 'lightblue' : 'purple',
              }}
            >
              <a style={{ textDecoration: 'none', color: 'inherit' }} href="/">
                Abyss
              </a>
            </Text>
          </Title>
          <Group>
            {colorScheme === 'dark' ? (
              <Button
                onClick={() => setColorScheme('light')}
                style={{ backgroundColor: 'inherit' }}
              >
                <IconMoonFilled
                  style={{
                    color: COLORS.lightviolet,
                  }}
                  size={35}
                  strokeWidth={2}
                />
              </Button>
            ) : (
              <Button onClick={() => setColorScheme('dark')} style={{ backgroundColor: 'inherit' }}>
                <IconBrightnessUp
                  style={{
                    color: COLORS.violet,
                  }}
                  size={35}
                  strokeWidth={2}
                />
              </Button>
            )}

            <HeaderMenu />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <ToastContainer
          theme={colorScheme === 'dark' ? 'dark' : 'light'}
          position="bottom-center"
          limit={1}
        />
        <Router />
      </AppShell.Main>
    </AppShell>
  );
}
