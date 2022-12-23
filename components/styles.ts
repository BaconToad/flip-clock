import { StyleSheet, Text, View, Pressable, Animated, Dimensions } from 'react-native';

const window = Dimensions.get("window");
const clockWidth = 300;
const borderRadius = 5;
const textHeight = clockWidth * 1.175;

export const clockStyles = StyleSheet.create({
  text: {
    position: 'relative',
    display: 'flex',
    fontSize: clockWidth,
    //React Native has a problem with line height for now -> make a ugly fix
    height: textHeight,
    alignSelf: 'center',
    fontFamily: 'Grotesk',
    color: '#B7B7B7'
  },
  textWrapper: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: clockWidth,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textWrapperTop: {
    top: 0
  },
  textWrapperBottom: {
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
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#282828'
  },
  card__top: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  card__bottom: {
    top: '50%',
    left: 0,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderTopColor: 'white',
    borderTopWidth: 2,
    alignItems: 'center',
  },
  card__front: {
      zIndex: -1
  },
  card__back: {
      zIndex: -1
  }
});