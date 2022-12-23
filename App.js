import { StyleSheet, Text, View, Pressable, Animated, Dimensions } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import Toggle from './components/Toggle'
import Clock from './components/Clock'

const clockWidth = 300;

export default function App() {

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      if (counter == 9)
        setCounter(0);
      else
        setCounter(counter + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  });

  return (
    <View style={styles.container}>
      <View style={{ width: clockWidth, height: clockWidth }}>
        <Clock.Component width={300} number={counter}/>
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

