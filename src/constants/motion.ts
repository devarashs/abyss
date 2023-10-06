export const textVariant = (delayValue: number) => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay: delayValue,
    },
  },
});

export const fadeIn = (
  directionValue: string,
  typeValue: string,
  delayValue: number,
  durationValue: number
) => ({
  exit: {
    x: directionValue === 'left' ? 100 : directionValue === 'right' ? -100 : 0,
    y: directionValue === 'up' ? 100 : directionValue === 'down' ? -100 : 0,
    opacity: 0,
  },
  initital: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: typeValue,
      delay: delayValue,
      duration: durationValue,
      ease: 'easeOut',
    },
  },
});

export const zoomIn = (delayValue: number, durationValue: number) => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'tween',
      delay: delayValue,
      duration: durationValue,
      ease: 'easeOut',
    },
  },
});

export const slideIn = (
  directionValue: string,
  typeValue: string,
  delayValue: number,
  durationValue: number
) => ({
  hidden: {
    x: directionValue === 'left' ? '-100%' : directionValue === 'right' ? '100%' : 0,
    y: directionValue === 'up' ? '-100%' : directionValue === 'down' ? '100%' : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: {
      type: typeValue,
      delay: delayValue,
      duration: durationValue,
      ease: 'easeOut',
    },
  },
});

export const staggerContainer = (staggerChildrenValue: number, delayChildrenValue: number = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: staggerChildrenValue,
      delayChildren: delayChildrenValue,
    },
  },
});
