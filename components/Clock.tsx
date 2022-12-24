import { StyleSheet, Text, View, Pressable, Animated, Easing, Dimensions } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { creteClockStyles } from './ClockStyles'

namespace Clock {
    export interface Props {
        width: number,
        number: number
    }

    export const Component = (props: Props) => {
        let topCardRotation = useRef(new Animated.Value(0)).current
        let bottomCardRotation = useRef(new Animated.Value(0)).current
        const [oldNumber, setOldNimber] = useState(props.number);

        const duration = 800;
        const width = props.width;
        const height = props.width * 2;

        const animationConfig = {
            useNativeDriver: false,
            toValue: 1,
            duration: duration / 2.0,
        }

        useEffect(() => {
            topCardRotation.setValue(0);
            bottomCardRotation.setValue(0);

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
            easing: Easing.in(Easing.exp)
        });
        const bottomCardRotationDegree = bottomCardRotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['90deg', '0deg'],
            easing: Easing.out(Easing.exp)
        });

        const clockStyles = creteClockStyles({height: height, width: width});

        return (
            <>
                <View style={clockStyles.flipClock}>
                    <View style={clockStyles.flipClock__piece}>
                        <View style={clockStyles.card}>
                            <Animated.View className="card__front__top" style={[
                                clockStyles.card__share,
                                clockStyles.card__top,
                                createCardRotationStyles({ height: height, degree: topCardRotationDegree }).card_front_top
                            ]}>
                                <View style={[
                                    clockStyles.textWrapper, 
                                    clockStyles.textWrapperTop
                                ]}>
                                    <Text style={[clockStyles.text]}>{oldNumber}</Text>
                                </View>
                            </Animated.View>
                            <View className="card__front__bottom" data-value='5' style={[
                                clockStyles.card__share,
                                clockStyles.card__front,
                                clockStyles.card__bottom]}>
                                <View style={[
                                    clockStyles.textWrapper, 
                                    clockStyles.textWrapperBottom
                                ]}>
                                    <Text style={[clockStyles.text]}>{oldNumber}</Text>
                                </View>
                            </View>
                            <View className="card__back__top" data-value='4' style={[
                                clockStyles.card__share,
                                clockStyles.card__back,
                                clockStyles.card__top,
                            ]}>
                                <View style={[
                                    clockStyles.textWrapper, 
                                    clockStyles.textWrapperTop
                                ]}>
                                    <Text style={[clockStyles.text]}>{props.number}</Text>
                                </View>
                            </View>
                            <Animated.View className="card__back__bottom" data-value='4' style={[
                                clockStyles.card__share,
                                clockStyles.card__back,
                                clockStyles.card__bottom,
                                createCardRotationStyles({ height: height, degree: bottomCardRotationDegree }).card_back_bottom
                            ]}>
                                <View style={[
                                    clockStyles.textWrapper, 
                                    clockStyles.textWrapperBottom
                                ]}>
                                    <Text style={[clockStyles.text]}>{props.number}</Text>
                                </View>
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </>
        )
    }

    const createCardRotationStyles = (props) => StyleSheet.create({
        card_front_top: {
            zIndex: 11,
            transform: [
                { perspective: 2000 },
                {
                    translateY: (props.height / 4.0)
                },
                {
                    rotateX: props.degree
                },
                {
                    translateY: -1 * (props.height / 4.0)
                },
            ]
        },
        card_back_bottom: {
            zIndex: 12,
            transform: [
                { perspective: 2000 },
                {
                    translateY: -1 * (props.height / 4.0)
                },
                {
                    rotateX: props.degree
                },
                {
                    translateY: (props.height / 4.0)
                },
            ]
        },
    })
}

export default Clock