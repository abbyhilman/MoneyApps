import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeTab = ({navigation}) => {
  const [saldoUser, setSaldoUser] = useState('0');
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focus');
      _getData();
    });

    return unsubscribe;
  }, []);

  const format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&.');
  };

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
            setSaldoUser(response.data.data.saldo);
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
  //const {signOut} = useContext(AuthContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            height: 134,
            padding: 12,
          }}>
          <Image
            source={require('../../assets/logo_basicschool.png')}
            style={{width: 36, height: 36}}
          />
          {/* <Icon style={{fontSize: 20}} name="home" /> */}
          <Text style={{fontSize: 14, marginTop: 15}}>Saldo Anda : </Text>
          <Text style={{fontSize: 36, fontWeight: '500'}}>
            Rp. {format(saldoUser)}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#4982C1',
            borderRadius: 4,
            width: 320,
            height: 89,
            alignSelf: 'center',
            shadowOffset: {width: 4, height: 7},
            shadowColor: 'black',
            shadowOpacity: 0.2,
            elevation: 1,
            padding: 15,
          }}>
          <View>
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                backgroundColor: 'white',
                alignItems: 'center',
                padding: 18,
              }}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('TopUp');
              }}>
              <Icon
                style={{fontSize: 14, color: 'rgba(0, 0, 0, 0.54)'}}
                name="plus"
              />
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
              Top Up
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                backgroundColor: 'white',
                alignItems: 'center',
                padding: 18,
              }}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('QrPaymentScreen');
              }}>
              <Icon
                style={{fontSize: 14, color: 'rgba(0, 0, 0, 0.54)'}}
                name="barcode"
              />
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
              QR Pay
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                width: 48,
                height: 48,
                backgroundColor: 'white',
                alignItems: 'center',
                padding: 18,
              }}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('TransferScreen');
              }}>
              <Icon
                style={{fontSize: 14, color: 'rgba(0, 0, 0, 0.54)'}}
                name="arrow-right"
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: '500',
                textAlign: 'center',
              }}>
              Transfer
            </Text>
          </View>
          {/* <Button
            title="TopUp"
            onPress={() => {
              navigation.navigate('TopUp');
            }}
          />
          <Button
            title="Qr Pay"
            onPress={() => {
              navigation.navigate('QrPaymentScreen');
            }}
          />
          <Button
            title="Transfer"
            onPress={() => {
              navigation.navigate('TransferScreen');
            }}
          /> */}
        </View>
        {/* <View style={{marginTop: 16}}>
          <Button
            title="Qr Pay"
            onPress={() => {
              navigation.navigate('QrPaymentScreen');
            }}
          />
        </View>
        <View style={{marginTop: 16}}>
          <Button
            title="Transfer"
            onPress={() => {
              navigation.navigate('TransferScreen');
            }}
          />
        </View> */}
      </View>
      {/* <View style={{marginTop: 38, padding: 12}}>
          
        </View> */}
      <Text style={{fontSize: 14, fontWeight: '300', marginTop: 38, padding: 12}}>
        5 Transaksi Terakhir :
      </Text>
      <FlatList
        data={transaksi}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_transaction}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 8,
        }}
      />
    </SafeAreaView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({});
