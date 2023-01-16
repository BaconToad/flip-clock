import { StyleSheet, Text, View, Pressable, Animated, Dimensions, Image, ImageBackground, Vibration } from 'react-native';
import { useState, useEffect, useRef, useReducer } from 'react';
import Toggle from '../components/Toggle'
import Clock from '../components/Clock'
import { useFonts } from 'expo-font';
import moment, { Moment } from 'moment'
import StorageService from '../services/StorageService';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { Audio } from 'expo-av';
// import * as Haptics from 'expo-haptics';

const soundObject = new Audio.Sound();

const Main = (props) => {
    const [timeParts, setTimeParts] = useState([0, 0, 0, 0]);
    const [isStarted, setIsStarted] = useState(false);
    // const [startTime, setStartTime] = useState<moment.Moment>(null);
    let startTimeRef = useRef<moment.Moment>(null);
    const [userPrefs, setUserPrefs] = useState<StorageService.UserPreferences>(null);
    // const [isPaused, setIsPaused] = useState(false);
    let isPausedRef = useRef(false);
    // const [timeDurationBeforePause, setTimeDurationBeforePause] = useState<moment.Duration>(null);

    const [timerInterval, setTimerInterval] = useState<NodeJS.Timer>(null);

    const [backgroundImage, setBackgroundImage] = useState<string>(null);

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    // StorageService.SavePrefsToStoreAsync({
    //     mode: StorageService.TimerMode.Free,
    //                 timerDuration: 30000,
    //                 backgroundImageUri: null
    // })

    useEffect(() => {
        let func = async () => {
            let prefs = await StorageService.RestorePrefsFromStorageAsync();
            if (!prefs) {
                prefs = {
                    mode: StorageService.TimerMode.Free,
                    timerDuration: 30000,
                    backgroundImageUri: null
                };
                await StorageService.SavePrefsToStoreAsync(prefs);
            }
            setUserPrefs(prefs);

            if (prefs.backgroundImageUri) {
                let fileContent = await ReadFileAsBase64(prefs.backgroundImageUri)
                setBackgroundImage(fileContent);
            }
            else {
                let getPermissionsResponse = await ImagePicker.getMediaLibraryPermissionsAsync();
                let pickerResponse = await ImagePicker.launchImageLibraryAsync({
                    selectionLimit: 1,
                    quality: 1,
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    base64: true
                });
                if (pickerResponse.canceled) {
                    //TODO error message popup
                }
                else if (pickerResponse.assets) {
                    setBackgroundImage(pickerResponse.assets[0].base64);
                    await StorageService.SavePrefsToStoreAsync({ ...prefs, backgroundImageUri: pickerResponse.assets[0].uri });
                }
            }

        };
        func();
    }, []);

    const start = () => {
        let timePartsLocal = [...timeParts];
        let interval = setInterval(() => {
            if (startTimeRef.current && !isPausedRef.current) {
                let diff = moment.duration(moment().diff(startTimeRef.current));
                let decMinutes = Math.floor(diff.minutes() / 10);
                let minutes = diff.minutes() % 10;
                let decSeconds = Math.floor(diff.seconds() / 10);
                let seconds = diff.seconds() % 10;

                if (timePartsLocal[0] != decMinutes || timePartsLocal[1] != minutes || timePartsLocal[2] != decSeconds || timePartsLocal[3] != seconds) {
                    setTimeParts((partsParam) => {
                        timePartsLocal = [decMinutes, minutes, decSeconds, seconds];
                        return timePartsLocal;
                    });
                    let momentDuration = moment.duration({
                        milliseconds: userPrefs.timerDuration
                    });

                    if (userPrefs.mode === StorageService.TimerMode.Timer && diff.asSeconds() > momentDuration.asSeconds()){
                        clearInterval(interval);
                        playAlarm();
                        Vibration.vibrate([700, 400], true);
                    }
                }
            }
        }, 100);
        setTimerInterval(interval);
    }

    const onSettingsPress = () => {
        props.navigation.navigate("settings");
    }

    const onStartPressed = () => {
        console.log("Start time: ", startTimeRef.current)
        if (!isStarted) {
            let now = moment();
            console.log("Start button: ", now);
            // setStartTime(now);
            startTimeRef.current = now;
            start();
            // setIsPaused(false);
            isPausedRef.current = false;
            setIsStarted(true);
            return;
        }

        console.log("start/pause pressed");
        if (isPausedRef.current) {
            let duration = moment.duration({
                minutes: timeParts[0] * 10 + timeParts[1],
                seconds: timeParts[2] * 10 + timeParts[3]
            });
            let diff = moment().diff((startTimeRef.current.add(duration)));
            //setStartTime(startTime.add(diff));
            startTimeRef.current = startTimeRef.current.add(diff);
        }
        // setIsPaused(!isPaused);
        isPausedRef.current = !isPausedRef.current;
        forceUpdate();
    }
    const onResetPressed = async () => {
        // setStartTime(null);
        startTimeRef.current = null;
        // setIsPaused(false);
        isPausedRef.current = false;
        clearInterval(timerInterval);
        setTimeParts([0, 0, 0, 0]);
        setIsStarted(false);

        Vibration.cancel();
        await soundObject.stopAsync()
    }

    const playAlarm = async () => {
        try {
            await soundObject.loadAsync(require('../assets/alarm.mp3'));
            await soundObject.setIsLoopingAsync(true);
            await soundObject.playAsync();
        } catch (error) {
            //TODO popup error message
            console.error(error);
        }
    };

    const clockContainerSize = Dimensions.get('window').width * 0.7;
    const clockWidth = clockContainerSize / 4.5;

    console.log("State: ", isStarted, isPausedRef.current)
    return (
            <ImageBackground source={{
                uri: `data:image/png;base64,${backgroundImage}`
            }} resizeMode="cover" style={styles.image}>
                <View style={styles.container}>
                    {/* <Image source={{
            uri: `data:image/png;base64,${backgroundImage}`
          }} style={{
            position: 'absolute',
            width: 200,
            height: 200,
            zIndex: 10
          }}/> */}
                    <Pressable style={styles.settings_button} onPress={onSettingsPress}>
                        <Image style={styles.settings_icon} source={require('../assets/cog.png')} resizeMode='contain' />
                    </Pressable>
                    <View style={{
                        width: clockContainerSize,
                        height: clockContainerSize,
                        flexDirection: 'row',
                        // backgroundColor: 'aqua',
                        justifyContent: 'space-around'
                    }}>
                        <Clock.Component width={clockWidth} number={timeParts[0]} />
                        <Clock.Component width={clockWidth} number={timeParts[1]} />
                        <View style={{
                            width: clockWidth / 2
                        }} />
                        <Clock.Component width={clockWidth} number={timeParts[2]} />
                        <Clock.Component width={clockWidth} number={timeParts[3]} />
                    </View>
                    <Pressable onPress={onStartPressed} style={[styles.button, isPausedRef.current ? styles.button_pause : styles.button_start]}>
                        <Text style={styles.button_text}>{!isStarted ? "Старт" : (isPausedRef.current ? "Старт" : "Пауза")}</Text>
                    </Pressable>
                    <Pressable onPress={onResetPressed} style={[styles.button, styles.button_reset]}>
                        <Text style={styles.button_text}>Сброс</Text>
                    </Pressable>
                </View>
            </ImageBackground>
    );
}

export default Main;

async function ReadFileAsBase64(uri: string): Promise<string>{
    //TODO add file existense check 
    return await FileSystem.readAsStringAsync(uri, {encoding: 'base64'});
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    settings_button: {
        position: 'absolute',
        top: 30,
        right: 30,
        width: 30,
        height: 30,
    },
    settings_icon: {
        width: 30,
        height: 30,
    },
    button: {
        width: '50%',
        height: 60,
        borderRadius: 20,
        borderColor: 'darkgrey',
        borderWidth: 2,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button_text: {
        fontSize: 25
    },
    button_start: {
        backgroundColor: '#28C869'
    },
    button_pause: {
        backgroundColor: '#28C869'
    },
    button_reset: {
        backgroundColor: '#EF4B56'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    }
});