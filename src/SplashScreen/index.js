import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import SplashScreen from "react-native-lottie-splash-screen";

const SplashScreen = () => {

  useEffect(() => {
    SplashScreen.hide(); // here
  }, []);
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreen;
