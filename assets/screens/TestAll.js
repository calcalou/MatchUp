import React, { useRef } from 'react';
import { View, Text, Button } from 'react-native';
import Swiper from 'react-native-swiper';

const MySwiper = () => {
  const swiperRef = useRef(null);

  const goToPage = (index) => {
    if (swiperRef.current && swiperRef.current.state.index !== index) {
      swiperRef.current.scrollBy(index - swiperRef.current.state.index);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        ref={swiperRef}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        index={3}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'skyblue' }}>
          <Text>Page 1</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgreen' }}>
          <Text>Page 2</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'salmon' }}>
          <Text>Page 3</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightyellow' }}>
          <Text>Page 4</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightcoral' }}>
          <Text>Page 5</Text>
        </View>
      </Swiper>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 20 }}>
        <Button title="Page 1" onPress={() => goToPage(0)} />
        <Button title="Page 2" onPress={() => goToPage(1)} />
        <Button title="Page 3" onPress={() => goToPage(2)} />
        <Button title="Page 4" onPress={() => goToPage(3)} />
        <Button title="Page 5" onPress={() => goToPage(4)} />
      </View>
    </View>
  );
};

export default MySwiper;
