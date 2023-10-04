import { Badge, Card, Group, Image, Text } from '@mantine/core';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Frames.module.css';

export function BasicFrame({ card }: { card: CardProps }) {
  return (
    <Card
      className={styles.BasicFrameContainer}
      w={{ base: '100%', md: '25%' }}
      shadow="lg"
      padding="lg"
      radius="md"
      withBorder
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        style={{ backgroundColor: 'inherit' }}
      >
        <Image
          style={{ objectFit: 'fill', borderRadius: 25 }}
          src={card.image}
          alt="Card With Basic Frame"
        />

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{card.name}</Text>
          <Badge color="pink" variant="light">
            {card.level}
          </Badge>
        </Group>
        <Text size="sm">{card.description}</Text>
      </motion.div>
    </Card>
  );
}
