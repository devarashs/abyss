import { Accordion, Text, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Panel } from '../../../constants/creatorStatics';
import { COLORS, SIZES } from '../../../constants/themeStatics';

export function CreatorSidePanel({ width }: { width: string }) {
  const { colorScheme } = useMantineColorScheme();
  const items = Panel.map((item) => (
    <Accordion.Item
      style={{
        backgroundColor: colorScheme === 'dark' ? COLORS.black : COLORS.gray2,
        padding: SIZES.small,
        borderRadius: SIZES.small,
      }}
      my="xs"
      mx="md"
      w={width}
      key={item.value}
      value={item.value}
    >
      <Accordion.Control icon={item.emoji}>{item.value}</Accordion.Control>

      <Accordion.Panel mt="sm">
        <Link to={item.route}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            style={{
              backgroundColor: colorScheme === 'dark' ? COLORS.violet : COLORS.lightviolet,
              padding: SIZES.large,
              borderRadius: SIZES.small,
            }}
          >
            <Text>{item.description}</Text>
          </motion.div>
        </Link>
      </Accordion.Panel>
    </Accordion.Item>
  ));
  return <Accordion defaultValue="Apples">{items}</Accordion>;
}
