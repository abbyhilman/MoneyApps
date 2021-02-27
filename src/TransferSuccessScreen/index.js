import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import moment from 'moment';

const TransferSuccessScreen = ({navigation, route}) => {
  const {nama, transfer} = route.params;
  console.log(transfer);

  const renderItem = ({item}) => {
    // const dt = transfer.data.waktu_transaksi;
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={styles.txtStatus}>Transfer Berhasil!</Text>
        <Text style={styles.txtNominal}>Rp. {transfer.data.nominal_transfer}</Text>
        <View
          style={{
            width: 280,
            height: 121,
            backgroundColor: '#4982C1',
            marginTop: 23,
            alignItems: 'center',
            padding: 15,
          }}>
          <Text style={{fontSize: 18, color: 'white', marginBottom: 17}}>
            {/* {moment(dt).format('d MMM YYYY')} */}
            {transfer.data.waktu_transaksi}
          </Text>
          <Text style={{fontSize: 18, color: 'white'}}>
            Penerima: {item.nama_user}
          </Text>
          <Text style={{fontSize: 18, color: 'white', marginTop: 12}}>
            {item.nomor_handphone}
          </Text>
          {/* <Text>VA Number: {transactionStatus.va_number}</Text> */}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/transfer.png')} style={styles.img} />
      <View style={{alignItems: 'center'}}>
        <FlatList
          data={nama}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_user}
          contentContainerStyle={{
            marginTop: 8,
          }}
        />
        <TouchableOpacity
          style={styles.btn_selesai}
          onPress={() => {
            navigation.navigate('MainBottomTab');
          }}
          activeOpacity={0.5}>
          <Text style={styles.txtSelesai}>SELESAI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TransferSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  img: {
    width: 240,
    height: 172,
    alignSelf: 'center',
  },
  txtStatus: {
    fontSize: 24,
    color: 'black',
    marginTop: 44,
  },
  txtNominal: {
    fontSize: 24,
    marginTop: 23,
  },
  btn_selesai: {
    width: 280,
    height: 48,
    backgroundColor: '#4982C1',
    borderRadius: 4,
    alignItems: 'center',
    padding: 15,
    marginTop: 27,
  },
  txtSelesai: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
