import { StyleSheet, Text, View, Pressable, Animated, Dimensions } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Toggle from './components/Toggle'
import Clock from './components/Clock'
import { useFonts } from 'expo-font';

export default function App() {

  const [timeParts, setTimeParts] = useState([]);

  useEffect(() => {
    let interval = undefined;
    setTimeout(() => {
      interval = setInterval(() => {
        let date = new Date();
        let decMinutes = date.getMinutes() == 0 ? 0 : Math.floor(date.getMinutes() / 10);
        let minutes = date.getMinutes() == 0 ? 0 : date.getMinutes() % 10;
        let decSeconds = date.getSeconds() == 0 ? 0 : Math.floor(date.getSeconds() / 10);
        let seconds = date.getSeconds() == 0 ? 0 : date.getSeconds() % 10;
  
        console.log(date.getMinutes().toString(), date.getSeconds().toString(), decMinutes, minutes, decSeconds, seconds);
        setTimeParts([decMinutes, minutes, decSeconds, seconds]);
      }, 100);
    }, 1000 - (new Date()).getMilliseconds()); //for align clock system's miliseconds
    
    return () => {
      clearInterval(interval);
    }
  });

  const [isFontLoaded] = useFonts({
    Grotesk: require('./assets/fonts/Grotesk.otf'),
  });

  if (!isFontLoaded)
    return null;

  const clockContainerSize = Dimensions.get('window').width * 0.7; 
  const clockWidth = clockContainerSize / 4.5;
  
  return (
    <View style={styles.container}>
      <View style={{ 
          width: clockContainerSize, 
          height: clockContainerSize,
          flexDirection: 'row',
          backgroundColor: 'aqua',
          justifyContent: 'space-around'
        }}>
        <Clock.Component width={clockWidth} number={timeParts[0]} />
        <Clock.Component width={clockWidth} number={timeParts[1]} />
        <View style={{
          width: clockWidth / 2
        }}/>
        <Clock.Component width={clockWidth} number={timeParts[2]} />
        <Clock.Component width={clockWidth} number={timeParts[3]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

