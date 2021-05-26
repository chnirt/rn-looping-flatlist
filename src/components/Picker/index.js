import React, {useRef, useState, useCallback} from 'react';
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

const ITEM_HEIGHT = 100;

function Picker({data = []}) {
  const flatListRef = useRef();
  const yRef = useRef(new Animated.Value(0.01)).current;

  const onScroll = useCallback(({nativeEvent}) => {
    const {contentOffset} = nativeEvent;
    const TOP_INDEX = 10;
    const BOTTOM_INDEX = 10;
    yRef.setValue(contentOffset.y);

    // yRef.current = new Animated.Value(contentOffset.y);
    if (contentOffset.y <= ITEM_HEIGHT * TOP_INDEX) {
      flatListRef.current.scrollToIndex({
        index: data.length + TOP_INDEX,
        animated: false,
      });
    }
    if (contentOffset.y >= ITEM_HEIGHT * (data.length * 2 - BOTTOM_INDEX)) {
      flatListRef.current.scrollToIndex({
        index: data.length - BOTTOM_INDEX,
        animated: false,
      });
    }
  }, []);

  const renderItem = useCallback(({item, index}) => {
    const color = yRef.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: ['red', '#006CD5', 'red'],
    });

    return (
      <View
        style={{
          height: ITEM_HEIGHT,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'red',
          borderWidth: 1,
        }}>
        <Animated.Text
          style={[
            {textAlign: 'center'},
            {
              // color,
            },
          ]}>
          {item}
        </Animated.Text>
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => String(index), []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      ref={flatListRef}
      initialScrollIndex={data.length}
      data={[...data, ...data]}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onScroll={onScroll}
      pagingEnabled
      snapToOffsets={[...data].map((_, i) => i * ITEM_HEIGHT)}
      decelerationRate="fast"
      getItemLayout={getItemLayout}
      showsVerticalScrollIndicator={false}
      windowSize={data.length}
      style={{
        height: ITEM_HEIGHT * 5,
      }}
      contentContainerStyle={{
        paddingVertical: ITEM_HEIGHT * 2,
      }}
      // disableIntervalMomentum={true}
      snapToAlignment={'start'}
      decelerationRate={0}
    />
  );
}

export default Picker;
