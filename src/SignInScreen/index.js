import React, {useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../Context';

const SignInScreen = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = useContext(AuthContext);

  const _postUser = async () => {
    // axios
    //   .post('https://reqres.in/api/users', {
    //     firstName: firstName,
    //     lastName: lastName,
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // try {
    //   let response = await auth().signInWithEmailAndPassword(
    //     firstName,
    //     lastName,
    //   );
    //   if (response && response.user) {
    //     console.log(response.user);
    //     Alert.alert('Success');
    //     // let Token = response.user.refreshToken
    //     // console.log(Token)
    //     signIn({firstName, lastName});
    //   }
    // } catch (e) {
    //   console.error(e.message);
    //   Alert.alert(e.message);
    // }
    // firestore()
    //   .collection('Users')
    //   .add({
    //     name: 'Ada Lovelace',
    //     age: 30,
    //   })
    //   .then(() => {
    //     console.log('User added!');
    //   });
    signIn({username, password});
    setUsername('');
    setPassword('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo_basicschool.png')}
          style={styles.img}
        />
        <Text style={styles.titleTxt}>e-money</Text>
        <TextInput
            placeholder="Username"
            value={username}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(inputUserName) => {
              setUsername(inputUserName);
            }}
            style={styles.txtInputUser}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(inputPassWord) => {
              setPassword(inputPassWord);
            }}
            secureTextEntry
            style={styles.txtInputPass}
          />
          <TouchableOpacity
            style={styles.btn_sigin}
            onPress={() => {
              _postUser();
            }}
            activeOpacity={0.5}>
            <Text style={styles.txtLogin}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              navigation.navigate('Registrasi');
            }}
            activeOpacity={0.5}>
            <Text style={styles.txtRegis}>Registrasi</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: '30%',
    marginTop: 24,
    alignItems: 'center',
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: 16,
  },
  img: {
    width: 142,
    height: 142,
    alignSelf: 'center',
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
  txtLogin: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  txtRegis: {
    fontSize: 14,
    color: '#4E4E4E',
    marginTop: 27,
  },
  titleTxt: {
    fontSize: 24,
    fontWeight: '500',
    color: '#4982C1',
    alignSelf: 'center',
    paddingTop: 12,
    paddingBottom: 19,
  },
  btn_sigin: {
    width: 280,
    height: 48,
    backgroundColor: '#4982C1',
    borderRadius: 4,
    alignItems: 'center',
    padding: 15,
  },
  scroll: {flexGrow: 1},
});
