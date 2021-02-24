import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KonfirmasiBayarScreen = ({navigation, route}) => {
  const {qrdata} = route.params;

  const [merchant, setMerchant] = useState({});
  const [nominalBayar, setNominalBayar] = useState(0);
  const [idUser, setIdUser] = useState();

  useEffect(() => {
    _getMerchant();
    _getData();
  }, []);

  const _getData = async () => {
    try {
      let id_user = await AsyncStorage.getItem('id_user');
      if (id_user !== null) {
        setIdUser(id_user);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const _getMerchant = () => {
    axios
      .get(
        `https://emoneydti.basicteknologi.co.id/index.php/api/merchant/?kode_merchant=${qrdata}`,
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        setMerchant(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const _postBayar = () => {
    axios
      .post(
        'https://emoneydti.basicteknologi.co.id/index.php/api/merchant/pay',
        {
          id_merchant: merchant.id_merchant,
          nominal_bayar: nominalBayar,
          id_user: idUser,
        },
      )
      .then(function (response) {
        console.log(response);
        if (response.data.status == 'true') {
          navigation.navigate('PaySuccessScreen', {
            merchant: merchant,
            nominalBayar: nominalBayar,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={{paddingHorizontal: 8, marginTop: 16}}>
      <Text>Konfirmasi Bayar :</Text>
      <Text>Nama Merchant: {merchant.nama_merchant}</Text>
      <Text>Alamat Merchant: {merchant.alamat_merchant}</Text>
      <TextInput
        placeholder="Nominal Bayar"
        style={{borderWidth: 1, borderColor: '#8c8c8c', marginTop: 8}}
        onChangeText={(inputNominal) => {
          setNominalBayar(inputNominal);
        }}
        defaultValue={nominalBayar}
      />
      <View style={{marginTop: 16}}>
        <Button
          title="Bayar"
          onPress={() => {
            _postBayar();
          }}
        />
      </View>
    </View>
  );
};

export default KonfirmasiBayarScreen;

const styles = StyleSheet.create({});
