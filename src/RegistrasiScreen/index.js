import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

const RegistrasiScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('');
  const [nomorHandphone, setNomorHandphone] = useState('');

  const _submitRegistrasi = async () => {
    // await auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(() => {
    //     console.log('User account created & signed in!');
    //   })
    //   .catch((error) => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //       Alert.alert(
    //         'Email Already used',
    //         'That email address is already in use!',
    //         [
    //           {
    //             text: 'Cancel',
    //             style: 'cancel',
    //           },
    //         ],
    //         {cancelable: false},
    //       );
    //     }

    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //       Alert.alert(
    //         'Invalid Email',
    //         'That email address is invalid!',
    //         [
    //           {
    //             text: 'Cancel',
    //             style: 'cancel',
    //           },
    //         ],
    //         {cancelable: false},
    //       );
    //     }

    //     if (error.code == 'auth/weak-password') {
    //       Alert.alert(
    //         'Password Weak',
    //         error.message,
    //         [
    //           {
    //             text: 'Cancel',
    //             style: 'cancel',
    //           },
    //         ],
    //         {cancelable: false},
    //       );
    //     }
    //     console.error(error);
    //   });
    axios.post('https://emoneydti.basicteknologi.co.id/index.php/api/users/registrasi', {
        email: email,
        password: password,
        nama: nama,
        nomor_handphone: nomorHandphone
      })
      .then(function (response) {
        console.log(response.data);
        if (response.status == true){
          Alert.alert(
            "Alert",
            response.data.msg,
            [
              { text: "Cancel", onPress: () => navigation.navigate('SignIn') }
            ],
            { cancelable: false }
          );
        }
        Alert.alert(response.data.msg)
      })
      .catch(function (error) {
        console.log(error);
      });
    setEmail('');
    setPassword('');
    setNama('');
    setNomorHandphone('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <View style={{alignItems: 'center'}}>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            style={styles.txtInputUser}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry
            style={styles.txtInputPass}
          />
          <TextInput
            placeholder="Nama"
            value={nama}
            onChangeText={(text) => {
              setNama(text);
            }}
            style={styles.txtInputPass}
          />
          <TextInput
            placeholder="No Handphone"
            value={nomorHandphone}
            keyboardType="phone-pad"
            onChangeText={(number) => {
              setNomorHandphone(number);
            }}
            style={styles.txtInputPass}
          />
          <TouchableOpacity
            style={styles.btn_Regis}
            onPress={() => {
              _submitRegistrasi();
            }}
            activeOpacity={0.5}>
            <Text style={styles.txtSubmit}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegistrasiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  page: {
    paddingHorizontal: 16,
  },
  txtInputUser: {
    width: 280,
    height: 48,
    borderColor: '#C3C3C3',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 25,
  },
  txtInputPass: {
    width: 280,
    height: 48,
    borderColor: '#C3C3C3',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 25,
  },
  btn_Regis: {
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
    fontSize: 16,
  },
});
