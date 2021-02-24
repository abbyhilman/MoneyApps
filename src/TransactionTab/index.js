import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';

const TransactionTab = ({navigation}) => {
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focus');
      _getData();
    });

    return unsubscribe;
  }, []);

  const _getData = async () => {
    try {
      let id_user = await AsyncStorage.getItem('id_user');
      if (id_user !== null) {
        axios
          .get(
            `https://emoneydti.basicteknologi.co.id/index.php/api/dashboard?id_user=${id_user}`,
          )
          .then(function (response) {
            // handle success
            console.log(response.data);
            setTransaksi(response.data.data.transaksi);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const renderItem = ({item}) => {
    //console.log(item);
    const dt = item.waktu_transaksi;
    return (
      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 4,
          paddingBottom: 4,
          paddingHorizontal: 2,
          marginBottom: 16,
          flexDirection: 'row',
          width: 319,
          height: 72,
          alignSelf: 'center',
          shadowOffset: {width: 4, height: 7},
          shadowColor: 'black',
          shadowOpacity: 0.2,
          elevation: 1,
          justifyContent: 'space-between',
        }}>
        <Image
          source={require('../../assets/compare_arrows.png')}
          style={{width: 24, height: 24, alignSelf: 'center', marginLeft: 11}}
        />
        <View style={{flexDirection: 'column', alignSelf: 'center'}}>
          <Text style={{fontSize: 14, fontWeight: '300'}}>
            Rp. {item.nominal_transaksi}
          </Text>
          <Text style={{fontSize: 14, fontWeight: '300', marginTop: 9}}>
            {item.berita_transaksi}
          </Text>
        </View>
        <Text
          style={{
            marginRight: 11,
            marginTop: 8,
            fontSize: 14,
            fontWeight: '300',
          }}>
          {moment(dt).format('d MMM YYYY')}
        </Text>
        {/* <Text>{item.jenis_transaksi}</Text> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={transaksi}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_transaction}
          contentContainerStyle={{
            marginTop: 8
          }}
        />
    </SafeAreaView>
  );
};

export default TransactionTab;

const styles = StyleSheet.create({});
