/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  Animated,
} from 'react-native';
import Picker from './src/components/Picker';

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const App = () => {
  formatTime = time => (time >= 0 && time < 10 ? `0${time}` : time);

  const HOURS = [...Array(24).keys()].map(item => formatTime(item));
  const MINUTES = [...Array(60).keys()].map(item => formatTime(item));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Picker data={HOURS} />
        <Picker data={MINUTES} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center',
  },
  box: {flex: 1, flexDirection: 'row', alignContent: 'center', width: 200},
});

export default App;
