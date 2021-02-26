import React, {useState} from 'react';
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Alert,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {TextInput} from '../component';

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
    axios
      .post(
        'https://emoneydti.basicteknologi.co.id/index.php/api/users/registrasi',
        {
          email: email,
          password: password,
          nama: nama,
          nomor_handphone: nomorHandphone,
        },
      )
      .then(function (response) {
        console.log(response.data);
        if (response.status == true) {
          Alert.alert(
            'Alert',
            response.data.msg,
            [{text: 'Cancel', onPress: () => navigation.navigate('SignIn')}],
            {cancelable: false},
          );
        }
        Alert.alert(response.data.msg);
      })
      .catch(function (error) {
        console.log(error);
      });
    setEmail('');
    setPassword('');
    setNama('');
    setNomorHandphone('');
  };
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    // <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset} style={{flex: 1}}>
    // <View style={styles.container}>
    //       <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
    //         <TextInput
    //           placeholder="Email"
    //           keyboardType="email-address"
    //           autoCapitalize="none"
    //           value={email}
    //           onChangeText={(text) => {
    //             setEmail(text);
    //           }}
    //           // style={styles.txtInputUser}
    //         />

    //       </View>
    //   </View>
    // </KeyboardAvoidingView>
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry
          // style={styles.txtInputPass}
        />
        <TextInput
          placeholder="Nama"
          value={nama}
          onChangeText={(text) => {
            setNama(text);
          }}
          // style={styles.txtInputPass}
        />
        <TextInput
          placeholder="No Handphone"
          value={nomorHandphone}
          keyboardType="phone-pad"
          onChangeText={(number) => {
            setNomorHandphone(number);
          }}
          // style={styles.txtInputPass}
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
    </ScrollView>
  );
};

export default RegistrasiScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    alignItems: 'center',
    flex: 1,
  },
  page: {
    paddingHorizontal: 16,
    flex: 1,
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
  scroll: {flexGrow: 1},
});
