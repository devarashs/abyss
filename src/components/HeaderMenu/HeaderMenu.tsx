import React, { useState } from 'react';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconAlien,
} from '@tabler/icons-react';
import { Button, Menu, Text, rem, useMantineColorScheme } from '@mantine/core';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, signOut } from '../../Store';
import { Link } from 'react-router-dom';
import { COLORS } from '../../constants/themeStatics';

export function HeaderMenu() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const SignOutHandler = () => {
    dispatch(signOut());
  };
  const { colorScheme } = useMantineColorScheme();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.96 }}
          style={{ backgroundColor: 'inherit' }}
        >
          <Button onClick={() => setToggleMenu(!toggleMenu)} style={{ backgroundColor: 'inherit' }}>
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
            {/*Define Routes For Only Unauthenticated User Here */}
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/login">
              <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                Log in
              </Menu.Item>
            </Link>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/signup">
              <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                Sign Up Now!
              </Menu.Item>
            </Link>
          </>
        )}

        {/*Define Public Routes Here */}

        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
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

        {/*Define User Authenticated Routes Here */}

        {userInfo && (
          <>
            {/*Define Creator Routes Here*/}

            {userInfo.isCreator && (
              <Link to="/creator/dashboard">
                <Menu.Item
                  leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
                >
                  Creator Dashboard
                </Menu.Item>
              </Link>
            )}
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/login">
              <Menu.Item
                onClick={() => SignOutHandler()}
                leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
              >
                Sign Out
              </Menu.Item>
            </Link>
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
  );
}
