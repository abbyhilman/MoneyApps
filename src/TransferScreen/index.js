import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const TransferSuccess = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/transfer.png')} style={styles.img} />
      <View style={{alignItems: 'center'}}>
        <TextInput
          placeholder="Nomor Handphone Penerima"
          //value={nominalTopup}
          autoCapitalize="none"
          keyboardType="number-pad"
          // onChangeText={(inputNominal) => {
          //   setNominalTopUp(inputNominal);
          // }}
          style={styles.txtCekNomor}
        />
        <TouchableOpacity
          style={styles.btn_cek}
          onPress={() => {
            navigation.navigate('TransferSuccessScreen');
          }}
          activeOpacity={0.5}>
          <Text style={styles.txt_cek}>PERIKSA NOMOR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransferSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  img: {
    width: 240,
    height: 172,
    alignSelf: 'center',
    marginTop: -86,
  },
  btn_cek: {
    width: 280,
    height: 48,
    backgroundColor: '#4982C1',
    borderRadius: 4,
    alignItems: 'center',
    padding: 15,
  },
  txt_cek: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  txtCekNomor: {
    width: 280,
    height: 48,
    borderColor: '#C3C3C3',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 25,
    paddingLeft: 12,
    marginTop: 86
  },
});
