import { Badge, Box, Card, Group, Image, Text } from '@mantine/core';
import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Frames.module.css';
// import { fadeIn } from '../../constants/motion';

export function BasicFrame({ card, index }: { card: CardProps; index: number }) {
  const [seeMore, setSeeMore] = useState(false);
  return (
    <div style={{ width: '25rem' }}>
      <motion.div
        initial={{ x: 3000 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50, delay: index * 0.5 }}
      >
        <Card
          className={styles.BasicFrameContainer}
          shadow="lg"
          padding="lg"
          radius="md"
          withBorder
        >
          {seeMore ? (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: seeMore ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ backgroundColor: 'inherit' }}
            >
              <Image
                style={{ objectFit: 'fill', borderRadius: 25, opacity: 0.3 }}
                src={card.image}
                alt="Card With Basic Frame"
                onClick={() => setSeeMore(false)}
              />
            </motion.div>
          ) : (
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={0.98} transitionSpeed={250}>
              <motion.div
                whileTap={{ scale: 0.99 }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: seeMore ? 0 : 180 }}
                transition={{ duration: 0.5 }}
                style={{ backgroundColor: 'inherit' }}
              >
                <Box style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    style={{ objectFit: 'fill', borderRadius: 25 }}
                    src={card.image}
                    alt="Card With Basic Frame"
                    onClick={() => setSeeMore(true)}
                  />
                </Box>
              </motion.div>
            </Tilt>
          )}
          {seeMore && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Group p="lg" style={{ position: 'absolute', top: 30 }}>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique id sunt
                    quaerat, suscipit accusamus doloremque, fugit unde magni non quae vel possimus
                    sed doloribus. Totam ab dolor quisquam quibusdam ipsa ad libero tempore! Nihil a
                    repudiandae vero tenetur minus libero ratione veniam hic, quod vel ipsum ipsa
                    expedita magnam ullam deserunt est molestiae dolore eius labore quaerat impedit
                    cupiditate necessitatibus. Accusantium quis recusandae voluptates distinctio
                    cupiditate? Molestias eos quo fuga iure voluptatem esse provident sed dolore
                    explicabo ad incidunt rem unde nostrum libero eaque, quas minima iste
                    repudiandae id suscipit tempore quam porro deleniti sunt. Repudiandae vel itaque
                    debitis corporis?
                  </Text>
                </Group>
              </motion.div>
            </AnimatePresence>
          )}

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>{card.name}</Text>
            <Badge color="pink" variant="light">
              {card.level}
            </Badge>
          </Group>
          <Text size="sm">{card.description}</Text>
        </Card>
      </motion.div>
    </div>
  );
}
