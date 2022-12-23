import { StyleSheet, Text, View, Pressable, Animated, Dimensions } from 'react-native';

const window = Dimensions.get("window");
const clockWidth = 300;
const borderRadius = 5;

export const clockStyles = StyleSheet.create({
  text: {
    position: 'absolute',
    flex: 1,
    fontSize: clockWidth,
    width: '100%',
    lineHeight: clockWidth,
    textAlign: 'center',
  },
  textTop: {
    top: 0,
  },
  textBottom: {
    bottom: 0,
  },
  flipClock: {
    textAlign: 'center',
    height: clockWidth,
    width: clockWidth,
  },
  flipClock__piece: {
    display: 'flex',
    height: '100%',
    borderColor: 'yellow'
  },
  card: {
    display: 'flex',
    position: 'relative',
    height: '100%'
  },
  card__share: {
    display: 'flex',
    height: '50%',
    width: '100%',
    position: 'absolute',
  },
  card__top: {
    backgroundColor: 'lightgray',
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    overflow: 'hidden'
  },
  card__bottom: {
    position: 'absolute',
    top: '50%',
    left: 0,
    backgroundColor: 'darkgray',
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    alignItems: 'center',
    overflow: 'hidden'
  },
  card__front: {
      zIndex: -1
  },
  card__back: {
      zIndex: -1
  }
});