import '@mantine/core/styles.css';
import {
  AppShell,
  Button,
  Group,
  Menu,
  Text,
  Title,
  rem,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconAlien,
} from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from './constants/themeStatics';
import { Router } from './Router';
import { selectUserInfo } from './Store';

export default function App() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const { colorScheme } = useMantineColorScheme();
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
              Abyss
            </Text>
          </Title>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.96 }}
                style={{ backgroundColor: 'inherit' }}
              >
                <Button
                  onClick={() => setToggleMenu(!toggleMenu)}
                  style={{ backgroundColor: 'inherit' }}
                >
                  <IconAlien
                    style={{
                      color: colorScheme === 'dark' ? COLORS.lightviolet : COLORS.violet,
                    }}
                    size={35}
                    strokeWidth={2}
                  />
                </Button>
              </motion.div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Abyss</Menu.Label>
              {!userInfo && (
                <>
                  <Menu.Item
                    leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
                  >
                    Log in
                  </Menu.Item>
                </>
              )}

              <Menu.Item
                leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}
              >
                News
              </Menu.Item>
              <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
                Gallery
              </Menu.Item>
              <Menu.Item
                leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
                rightSection={
                  <Text size="xs" c="dimmed">
                    ⌘K
                  </Text>
                }
              >
                Search
              </Menu.Item>

              <Menu.Divider />
              {userInfo && (
                <>
                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item
                    color="red"
                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                  >
                    Delete my account
                  </Menu.Item>
                </>
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Router />
      </AppShell.Main>
    </AppShell>
  );
}
