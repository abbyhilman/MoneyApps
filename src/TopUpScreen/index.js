import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopUpScreen = ({navigation}) => {
  const [idUser, setIdUser] = useState('');
  const [nominalTopup, setNominalTopUp] = useState('');
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
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

  const _submitTopUp = () => {
    axios
      .post('https://emoneydti.basicteknologi.co.id/index.php/api/snap/token', {
        id_user: idUser,
        nominal_topup: nominalTopup,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.status == 'true') {
          //buka webview midtrans
          console.log(response.data.data.order_id);
          setOrderId(response.data.data.order_id);
          setUrl(response.data.data.redirect_url);
          setOpen(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  if (open) {
    return (
      <WebView
        source={{uri: url}}
        onNavigationStateChange={(navState) => {
          // console.log(navState.url);
          if (navState.url.search('basicteknologi.co.id') > 0) {
            console.log(orderId);
            navigation.navigate('TopUpSucces', {
              orderId: orderId,
            });
          }
        }}
      />
    );
  } else {
    console.log(idUser)
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/dompet.png')} style={styles.img} />
        <View style={{alignItems: 'center'}}>
          <TextInput
            placeholder="Nominal Top Up"
            value={nominalTopup}
            autoCapitalize="none"
            keyboardType="number-pad"
            onChangeText={(inputNominal) => {
              setNominalTopUp(inputNominal);
            }}
            style={styles.txtInputTopUp}
          />
          <TouchableOpacity
            style={styles.btn_submit}
            onPress={() => {
              _submitTopUp();
            }}
            activeOpacity={0.5}>
            <Text style={styles.txtSubmit}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default TopUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    width: 142,
    height: 142,
    alignSelf: 'center',
  },
  btn_submit: {
    width: 280,
    height: 48,
    backgroundColor: '#4982C1',
    borderRadius: 4,
    alignItems: 'center',
    padding: 15,
  },
  txtSubmit: {
    color: 'white', 
    fontWeight: '500', 
    fontSize: 16
  },
  txtInputTopUp: {
    width: 280,
    height: 48,
    borderColor: '#C3C3C3',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 25,
    paddingLeft: 12,
  },
});
