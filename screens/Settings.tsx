import { StyleSheet, Text, View, TextInput, Animated, Dimensions, Image, Pressable, Button } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Toggle from '../components/Toggle'
import Clock from '../components/Clock'
import { useFonts } from 'expo-font';
import moment, { Moment } from 'moment'
import StorageService from '../services/StorageService';
import * as ImagePicker from 'expo-image-picker';


const Settings = (props) => {

    const [durationInput, setDurationInput] = useState("0.2");
    const [userPrefs, setUserPrefs] = useState<StorageService.UserPreferences>({
        mode: StorageService.TimerMode.Free,
        timerDuration: 20000,
        backgroundImageUri: null
    });

    const SavePrefs = async (prefsToSave: StorageService.UserPreferences) => {
        setUserPrefs(prefsToSave);
        await StorageService.SavePrefsToStoreAsync(prefsToSave);
    }

    useEffect(() => {
        const func = async () => {
            const prefsFromStore = await StorageService.RestorePrefsFromStorageAsync();
            setUserPrefs(prefsFromStore);
        }
        func();
    }, [])


    const onModeToggleChange = async (newValue: boolean): Promise<void> => {
        SavePrefs({
            ...userPrefs,
            mode: newValue ? StorageService.TimerMode.Timer : StorageService.TimerMode.Free
        });
    }

    const onDurationInputChange = (value: string) => {
        setDurationInput(value);
        try {
            let newDuration = Number.parseFloat(value);
            console.log(newDuration, newDuration * 60 * 1000)
            SavePrefs({
                ...userPrefs,
                timerDuration: newDuration * 60 * 1000
            })
        }
        catch (error) {
            //TODO popup error message
        }
    }

    const onBackPressed = () => {
        props.navigation.navigate("main");
    }

    const onSelectBackgroundPressed = async () => {
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
            await StorageService.SavePrefsToStoreAsync({ ...userPrefs, backgroundImageUri: pickerResponse.assets[0].uri });
        }
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.back_button} onPress={onBackPressed}>
                <Image style={styles.back_button_icon} source={require('../assets/back.png')} resizeMode='contain' />
            </Pressable>
            <View style={styles.row}>
                <Text style={styles.text}>Включить таймер?</Text>
                <Toggle onChange={onModeToggleChange} />
            </View>
            <View style={[styles.row, userPrefs.mode === StorageService.TimerMode.Free ? styles.durationWrapperShade : {}]} 
                pointerEvents={userPrefs.mode === StorageService.TimerMode.Timer ? 'auto' : 'none'}>
                <Text style={styles.text}>Таймер:</Text>
                <TextInput
                    style={styles.durationInput}
                    onChangeText={onDurationInputChange}
                    value={durationInput}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.row}>
                <Button title='Выбрать фон' onPress={onSelectBackgroundPressed}/>
            </View>
        </View>
    )
}



export default Settings;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20
    },
    durationWrapperShade: {
        opacity: 0.5
    },
    durationInput: {
        fontFamily: 'Grotesk',
        fontSize: 20,
        width: 50,
        height: 40,
        borderColor: 'ligthgrey',
        borderWidth: 0.5,
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    back_button: {
        // position: 'absolute',
        marginTop: 40,
        marginLeft: 20,
        width: 40,
        height: 40,
    },
    back_button_icon: {
        width: 40,
        height: 40,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Grotesk',
    },
    imageSelectorWrapper:{

    }
})