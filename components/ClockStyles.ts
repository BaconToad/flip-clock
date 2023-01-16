import { StyleSheet, Text, View, Pressable, Animated, Dimensions } from 'react-native';

export interface Props {
  height: number,
  width: number
}

export const creteClockStyles = (props: Props) => StyleSheet.create({
  text: {
    position: 'relative',
    display: 'flex',
    fontSize: props.height,
    //React Native has a problem with line height for now -> make a ugly fix
    height: props.height * 1.175,
    alignSelf: 'center',
    fontFamily: 'Grotesk',
    color: '#B7B7B7'
  },
  textWrapper: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: props.height,
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
    height: props.height,
    width: props.width,
    margin: props.width/10,
    // borderColor: 'red',
    // borderWidth: 1
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
    borderBottomWidth: 1.5,
    borderTopLeftRadius: props.width / 5,
    borderTopRightRadius: props.width / 5,
  },
  card__bottom: {
    top: '50%',
    left: 0,
    borderBottomLeftRadius: props.width / 5,
    borderBottomRightRadius: props.width / 5,
    borderTopColor: 'white',
    borderTopWidth: 1.5,
    alignItems: 'center',
  },
  card__front: {
      zIndex: 0
  },
  card__back: {
      zIndex: 0
  }
});