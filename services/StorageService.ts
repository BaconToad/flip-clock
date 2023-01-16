import AsyncStorage from '@react-native-async-storage/async-storage';

namespace StorageService {
    export async function SavePrefsToStoreAsync(prefs: UserPreferences) {
        try {
            await AsyncStorage.setItem('userPreferences', JSON.stringify(prefs));
        } catch (error) {
            //TODO add popup error message
            console.error(error);
        }
    }
    
    export async function RestorePrefsFromStorageAsync(): Promise<UserPreferences> {
        let prefs: UserPreferences = null;
        try {
            const prefsString = await AsyncStorage.getItem('userPreferences');
            if (prefsString)
                prefs = JSON.parse(prefsString);
        } catch (error) {
            //TODO add popup error message
            console.error(error);
        }
        return prefs;
    }

    export interface UserPreferences {
        mode: TimerMode,
        timerDuration: number,
        backgroundImageUri: string
    }
    
    export enum TimerMode {
        Free,
        Timer
    }
}

export default StorageService 