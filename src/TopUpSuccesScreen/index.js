import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const TopUpSuccesScreen = ({navigation, route}) => {
  const {orderId} = route.params;

  const [transactionStatus, setTransactionStatus] = useState({});
  const [statusPayment, setStatusPayment] = useState('Berhasil');

  useEffect(() => {
    _getTransactionStatus();
  });

  const _getTransactionStatus = () => {
    axios
      .get(
        `https://emoneydti.basicteknologi.co.id/index.php/api/snap/transactionstatus?order_id=${orderId}`,
      )
      .then(function (response) {
        // handle success
        //console.log(response.data);
        if (response.data.data.bank == null) {
          setStatusPayment('Pending');
        } else {
          setTransactionStatus(response.data.data);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/dompet.png')} style={styles.img} />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.txtStatus}>Top Up {statusPayment}</Text>
        <Text style={styles.txtNominal}>
          Rp. {transactionStatus.nominal_topup}
        </Text>
        <View
          style={{
            width: 280,
            height: 91,
            backgroundColor: '#4982C1',
            marginTop: 23,
            alignItems: 'center',
            padding: 15,
          }}>
          <Text style={{fontSize: 18, color: 'white'}}>
            {transactionStatus.transaction_time}
          </Text>
          <Text style={{fontSize: 18, color: 'white', marginTop: 17}}>
            VA {transactionStatus.bank}
          </Text>
          {/* <Text>VA Number: {transactionStatus.va_number}</Text> */}
        </View>
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

export default TopUpSuccesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    width: 156,
    height: 156,
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
    fontSize: 16
  },
});
