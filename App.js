import { StyleSheet, Text, View, Pressable, Animated, Dimensions, ImageBackground, Image } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Toggle from './components/Toggle'
import Clock from './components/Clock'
import { useFonts } from 'expo-font';
import PreciseTimer, { TimeSpan } from './services/PreciseCountdownTimer'
import moment, { Moment } from 'moment'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StorageService from './services/StorageService';
// import * as MediaLibrary from 'expo-media-library';
// import RNFS from react-native-fs;

import Main from './screens/Main';
import Settings from './screens/Settings'

export default function App() {

  const [isFontLoaded] = useFonts({
    Grotesk: require('./assets/fonts/Grotesk.otf'),
  });

  if (!isFontLoaded)
    return null;

  const Stack = createStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}
          initialRouteName={"settings"}>
          <Stack.Screen name={"main"} component={Main} />
          <Stack.Screen name={"settings"} component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

