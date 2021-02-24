import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const QrPaymentScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <RNCamera
        captureAudio={false}
        ref={(ref) => {
          this.camera = ref;
        }}
        style={{width: 319, height: 319, alignSelf: 'center'}}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          console.log(barcodes);
          if(barcodes[0].type == 'QR_CODE'){
            console.log(barcodes[0].data);
            navigation.navigate('KonfirmasiBayarScreen', {
              qrdata: barcodes[0].data
            });
          }
        }}
      />
    </View>
  );
};

export default QrPaymentScreen;

const styles = StyleSheet.create({});
