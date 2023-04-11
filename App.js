/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import Home from './screen/Home';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView>
      <Home />
    </SafeAreaView>
  );
}

export default App;
