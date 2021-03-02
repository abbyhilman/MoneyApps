import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  PermissionsAndroid,
  ToastAndroid,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';

const TransferSuccess = ({navigation}) => {
  const [idUser, setIdUser] = useState('');
  const [inputNomor, setInputNomor] = useState('');
  const [nominalTransfer, setNominalTransfer] = useState('');
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [idPenerima, setIdPenerima] = useState('');
  const [dataMaps, setDataMaps] = useState({});

  const hasLocationPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = async () => {

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  useEffect(() => {
    _getData();
    hasLocationPermissionIOS();
    hasLocationPermission();
    Geolocation.getCurrentPosition(
      (position) => {
        //this.setState({ location: position, loading: false });
        // console.log(position);
        setDataMaps(position.coords);
        //console.log(dataMaps)
      },
      (error) => {
        //this.setState({ loading: false });
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: false,
        showLocationDialog: true,
      },
    );
  }, []);

  const _getData = async () => {
    try {
      let id_user = await AsyncStorage.getItem('id_user');
      if (id_user !== null) {
        //console.log(id_user);
        setIdUser(id_user);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const _cekNumber = () => {
    axios
      .get(
        `https://emoneydti.basicteknologi.co.id/index.php/api/transfer/checknumber?nomor_handphone=${inputNomor}`,
      )
      .then(function (response) {
        // handle success
        if (inputNomor == '') {
          Alert.alert('Failed', 'Masukkan Nomor Handphone');
        } else if (response.data.status == 'true') {
          setIdPenerima(response.data.data[0].id_user);
          setData(response.data.data);
          setShow(true);
          setInputNomor('');
        } else {
          Alert.alert(response.data.msg);
        }
      })
      .catch(function (error) {
        // handle error
        Alert.alert(error.message);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const _transfeProcess = () => {
    axios
      .post(
        'https://emoneydti.basicteknologi.co.id/index.php/api/transfer/process',
        {
          id_pengirim: idUser,
          id_penerima: idPenerima,
          nominal_transfer: nominalTransfer,
          latitude_transaksi: dataMaps.latitude,
          longitude_transaksi: dataMaps.longitude,
        },
      )
      .then(function (response) {
        console.log(response.data);
        let DataProcess = response.data;
        if (nominalTransfer == '') {
          Alert.alert('Failed', 'Masukkan Nominal Transfer');
        } else if (nominalTransfer == 0) {
          Alert.alert('Failed', 'Masukkan Nominal Lebih dari 0');
        } else {
          navigation.navigate('TransferSuccessScreen', {
            nama: data,
            transfer: DataProcess,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const renderItem = ({item}) => {
    return (
      <>
        <Text style={{fontSize: 16, textAlign: 'center'}}>Penerima: </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '300',
            marginVertical: 21,
            textAlign: 'center',
          }}>
          {item.nama_user}
        </Text>
        <TouchableOpacity
          style={styles.btn_cek}
          onPress={() => {
            // navigation.navigate('TransferSuccessScreen');
            _transfeProcess();
          }}
          activeOpacity={0.5}>
          <Text style={styles.txt_cek}>TRANSFER</Text>
        </TouchableOpacity>
      </>
    );
  };
  console.log(dataMaps);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/transfer.png')}
          style={styles.img}
        />
        {show ? (
          <TextInput
            placeholder="Nomor Transfer"
            value={nominalTransfer}
            autoCapitalize="none"
            keyboardType="number-pad"
            onChangeText={(text) => {
              setNominalTransfer(text);
            }}
            style={styles.txtCekNomor}
          />
        ) : (
          <TextInput
            placeholder="Nomor Handphone Penerima"
            value={inputNomor}
            autoCapitalize="none"
            keyboardType="number-pad"
            onChangeText={(text) => {
              setInputNomor(text);
            }}
            style={styles.txtCekNomor}
          />
        )}
        {show ? (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id_user}
            contentContainerStyle={{
              marginTop: 8,
            }}
          />
        ) : null}
        {show ? null : (
          <TouchableOpacity
            style={styles.btn_cek}
            onPress={() => {
              // navigation.navigate('TransferSuccessScreen');
              _cekNumber();
            }}
            activeOpacity={0.5}>
            <Text style={styles.txt_cek}>PERIKSA NOMOR</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default TransferSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: '30%',
    marginTop: 24,
    alignItems: 'center',
    backgroundColor: 'white',
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
    marginTop: 86,
  },
});
