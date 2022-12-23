import { StyleSheet, Text, View, Pressable, Animated, Easing, Dimensions } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { clockStyles, animatedStyleX1 } from './styles'

namespace Clock {
    export interface Props {
        width: number,
        number: number
    }

    export const Component = (props: Props) => {
        let topCardRotation = useRef(new Animated.Value(0)).current
        let bottomCardRotation = useRef(new Animated.Value(0)).current
        const [oldNumber, setOldNimber] = useState(props.number);

        const duration = 600;
        console.log('old', oldNumber);
        console.log('new', props.number)

        let width = props.width;

        const animationConfig = {
            useNativeDriver: false,
            toValue: 1,
            duration: duration / 2.0,
        }

        useEffect(() => {
            console.log('animate...');
            topCardRotation.setValue(0);
            bottomCardRotation.setValue(0);
            // Animated.timing(
            //     topCardRotation,
            //     animationConfig
            // ).start(() => {
            //     Animated.timing(
            //         bottomCardRotation,
            //         {
            //             ...animationConfig,
            //             //delay: 450
            //         }
            //     ).start();
            // });

            Animated.parallel([
                Animated.timing(
                    topCardRotation,
                    animationConfig
                ),
                Animated.timing(
                    bottomCardRotation,
                    {
                        ...animationConfig,
                        delay: duration / 2.0
                    }
                )
            ]).start();

            return () => {
                setOldNimber(props.number);
            }
        }, [props.number])

        const topCardRotationDegree = topCardRotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-90deg'],
            //easing: Easing.linear
            easing: Easing.in(Easing.exp)
        });
        const bottomCardRotationDegree = bottomCardRotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['90deg', '0deg'],
            // easing: Easing.linear
            easing: Easing.out(Easing.exp)
        });
        console.log(topCardRotationDegree)

        return (
            <>
                <View style={clockStyles.flipClock}>
                    <View style={clockStyles.flipClock__piece}>
                        <View style={clockStyles.card}>
                            <Animated.View className="card__front__top" style={[
                                clockStyles.card__share,
                                // clockStyles.card__front,
                                clockStyles.card__top,
                                cardRotationStyles({ height: width / 2.0, degree: topCardRotationDegree }).card_front_top
                                //animatedStyleX1({degree: topCardRotationDegree})
                            ]}>
                                <Text style={[clockStyles.text, clockStyles.textTop]}>{oldNumber}</Text>
                            </Animated.View>
                            <View className="card__front__bottom" data-value='5' style={[
                                clockStyles.card__share,
                                clockStyles.card__front,
                                clockStyles.card__bottom]}>
                                <Text style={[clockStyles.text, clockStyles.textBottom]}>{oldNumber}</Text>
                            </View>
                            <View className="card__back__top" data-value='4' style={[
                                clockStyles.card__share,
                                clockStyles.card__back,
                                clockStyles.card__top,
                                // {
                                //     zIndex: 1
                                // }
                            ]}>
                                <Text style={[clockStyles.text, clockStyles.textTop]}>{props.number}</Text>
                            </View>
                            <Animated.View className="card__back__bottom" data-value='4' style={[
                                clockStyles.card__share,
                                clockStyles.card__back,
                                clockStyles.card__bottom,
                                cardRotationStyles({ height: width / 2.0, degree: bottomCardRotationDegree }).card_front_bottom
                            ]}>
                                <Text style={[clockStyles.text, clockStyles.textBottom]}>{props.number}</Text>
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </>
        )
    }

    const cardRotationStyles = (props) => StyleSheet.create({
        card_front_top: {
            backgroundColor: 'coral',
            zIndex: 1,
            // borderWidth: 1,
            // borderColor: 'black',
            transform: [
                { perspective: props.height * 5 },
                {
                    translateY: (props.height / 2.0)
                },
                {
                    rotateX: props.degree
                },
                {
                    translateY: -1 * (props.height / 2.0)
                },
            ]
        },
        card_front_bottom: {
            backgroundColor: 'coral',
            zIndex: 2,
            transform: [
                { perspective: props.height * 5 },
                {
                    translateY: -1 * (props.height / 2.0)
                },
                {
                    rotateX: props.degree
                },
                {
                    translateY: (props.height / 2.0)
                },
            ]
        },
    })
}

export default Clock