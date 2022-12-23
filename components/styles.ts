import { StyleSheet, Text, View, Pressable, Animated, Dimensions } from 'react-native';

const window = Dimensions.get("window");
const clockWidth = 300;
const halfHeight = 16,
  borderRadius = 5;

export const clockStyles = StyleSheet.create({
  text: {
    position: 'absolute',
    flex: 1,
    fontSize: clockWidth,
    // fontWeight: 'bold',
    width: '100%',
    //height: clockWidth * 2,
    // backgroundColor: 'aquamarine',
    lineHeight: clockWidth,
    textAlign: 'center',
  },
  textTop: {
    // top: '50%',
    top: 0,
    // backgroundColor: 'lightcoral',
  },
  textBottom: {
    bottom: 0,
    // backgroundColor: 'coral',
  },
  flipClock: {
    textAlign: 'center',
    // perspective: 400,
    // marginVertical: 20,
    // marginHorizontal: 'auto',
    height: clockWidth,
    width: clockWidth,
    // borderWidth: 1,
    // borderColor: 'green'
  },
  flipClock__piece: {
    display: 'flex',
    // marginVertical: 0,
    // marginHorizontal: 5,
    height: '100%',
    // borderWidth: 1,
    borderColor: 'yellow'
  },
  card: {
    display: 'flex',
    position: 'relative',
    // paddingBottom: halfHeight,
    // lineHeight: 0.95,
    // color: 'white',
    // borderWidth: 1,
    // borderColor: 'black',
    height: '100%'
  },
  card__share: {
    display: 'flex',
    height: '50%',
    width: '100%',
    // color: 'white',
    position: 'absolute',
  },
  card__top: {
    // top: '0%',
    backgroundColor: 'lightgray',
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    // backfaceVisibility: 'hidden',
    // borderWidth: 1,
    // borderColor: 'purple',
    // transform: [{translateZ: 0}],
    // alignItems: 'center',
    overflow: 'hidden'
    // justifyContent: 'center'
  },
  card__bottom: {
    // padding: halfHeight * 2,
    // backfaceVisibility: 'hidden',
    // transform: [{translateZ: 0}],
    position: 'absolute',
    top: '50%',
    left: 0,
    // borderTopWidth: 1,
    // borderColor: '#000',
    backgroundColor: 'darkgray',
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    // overflow: 'hidden',
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

export const animatedStyleX1 = (props) => {
    //const degree = interpolate(animatedValue.value, [0, 1], [0, 2 * Math.PI]);
    return {
      transform: [
        {perspective: 200},
        ...transformOriginWorklet(
          {x: clockWidth, y: clockWidth / 2.0},
          {x: clockWidth / 2.0, y: clockWidth / 4.0},
          [{rotateX: props.degree}],
        ),
      ],
    };
  };

  const transformOriginWorklet = (
    anchorPoint: Point2D,
    originalCenterPoint: Point2D,
    transforms,
  ) => {
    'worklet';
    const result = [
      {translateX: anchorPoint.x - originalCenterPoint.x},
      {translateY: anchorPoint.y - originalCenterPoint.y},
      ...transforms,
      {translateX: -(anchorPoint.x - originalCenterPoint.x)},
      {translateY: -(anchorPoint.y - originalCenterPoint.y)},
    ];
    return result;
  };

  interface Point2D {
    x: number;
    y: number;
  }