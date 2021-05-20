/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
} from 'react-native';

const DATA = [...Array(10).keys()];
const ITEM_HEIGHT = 200;

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const App = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const flatListRef = useRef();

  useEffect(() => {
    const newData = [...DATA, ...DATA];
    setData(newData);
    setValue(newData.length / 2);
  }, []);

  const onScroll = event => {
    const {nativeEvent} = event;
    const {contentOffset} = nativeEvent;
    const TOP_INDEX = 4;
    const BOTTOM_INDEX = 6;
    if (contentOffset.y <= ITEM_HEIGHT * TOP_INDEX) {
      flatListRef.current.scrollToOffset({
        offset: ITEM_HEIGHT * (DATA.length + TOP_INDEX),
        animated: false,
      });
    }
    if (contentOffset.y >= ITEM_HEIGHT * (DATA.length + BOTTOM_INDEX)) {
      flatListRef.current.scrollToOffset({
        offset: ITEM_HEIGHT * BOTTOM_INDEX,
        animated: false,
      });
    }
  };

  const renderItem = ({item}) => (
    <View
      style={{
        height: ITEM_HEIGHT,
        borderColor: 'red',
        borderWidth: 1,
      }}>
      <Text style={styles.title}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="A"
        onPress={() => {
          const DATA = [...Array(11).keys()];
          const newData = [...DATA, ...DATA];
          setData(newData);
          flatListRef.current.scrollToOffset({
            offset: ITEM_HEIGHT * DATA.length,
            animated: false,
          });
        }}
      />
      <FlatList
        ref={flatListRef}
        initialScrollIndex={value}
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => String(index)}
        onScroll={onScroll}
        decelerationRate="fast"
        snapToInterval={ITEM_HEIGHT}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
        // windowSize={5}
        // maxToRenderPerBatch={5}
        // updateCellsBatchingPeriod={30}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 5,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
