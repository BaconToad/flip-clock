import { useRef, useState } from "react";
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';

namespace Toggle {
    export const Component = (props : Props) => {
        const [value, setValue] = useState(false);
        const position = useRef(new Animated.Value(0)).current

        const onPressHandler = () => {
            const newValue = !value;
            Animated.timing(
                position,
                {
                    useNativeDriver: false,
                    toValue: value ? 0 : 1,
                    duration: 200,
                }
            ).start();
            setValue(newValue);
            if (props.onChange)
                props.onChange(newValue);
        }

        const interpolatedPosition = position.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
        });

        return (
            <Pressable onPress={onPressHandler} data-id="toggle-wrapper" style={toggleStyles({ position: interpolatedPosition }).wrapper}>
                <Animated.View data-id="toggle-thumb" style={toggleStyles({ position: interpolatedPosition }).thumb}>
                    <View style={toggleStyles({ position }).thumbImage}></View>
                </Animated.View>
            </Pressable>
        )
    }

    const toggleStyles = (props) => StyleSheet.create({
        wrapper: {
            height: 40,
            width: 100,
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 50,
            padding: 1.5,
            paddingHorizontal: 19
        },
        thumb: {
            height: '100%',
            width: 34,
            left: props.position//`${props.position}%`,

        },
        thumbImage: {
            height: '100%',
            width: '100%',
            marginLeft: '-50%',
            borderRadius: 50,
            backgroundColor: 'gray',
        }
    })

    export interface Props {
        onChange: (boolean) => {}
    }
}

export default Toggle