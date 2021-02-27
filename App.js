import 'react-native-gesture-handler';
import * as React from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import {AuthContext} from './src/Context';
import SplashScreen from './src/SplashScreen';
import SignInScreen from './src/SignInScreen';
import TopUpScreen from './src/TopUpScreen';
import TopUpSuccesScrenn from './src/TopUpSuccesScreen';
import RegistrasiScreen from './src/RegistrasiScreen';
import QrPaymentScreen from './src/QrPaymentScreen';
import PaySuccessScreen from './src/PaySuccessScreen';
import KonfirmasiBayarScreen from './src/KonfirmasiBayarScreen';
import TransferNominalScreen from './src/TransferNominalScreen';
import TransferScreen from './src/TransferScreen';
import TransferSuccessScreen from './src/TransferSuccessScreen';
import HomeTab from './src/HomeTab';
import TransactionTab from './src/TransactionTab';
import SettingTab from './src/SettingTab';
import Icon from 'react-native-vector-icons/FontAwesome';

// function SplashScreen() {
//   return (
//     <View>
//       <Text>Loading...</Text>
//     </View>
//   );
// }

// function HomeScreen() {
//   const {signOut} = React.useContext(AuthContext);

//   React.useEffect(() => {
//     // fetch('https://reactnative.dev/movies.json').then((response) => response.json()).then((json) => {
//     //   console.log(json.movies[2].title)
//     // })
//     // axios.get('https://reactnative.dev/movies.json')
//     // .then(function (response) {
//     //   // handle success
//     //   console.log(response.data.title);
//     // })
//     // .catch(function (error) {
//     //   // handle error
//     //   console.log(error);
//     // })
//     // .then(function () {
//     //   // always executed
//     // });
//     // axios.post('https://reqres.in/api/users', {
//     //   firstName: 'Fred',
//     //   lastName: 'Flintstone'
//     // })
//     // .then(function (response) {
//     //   console.log(response.data);
//     // })
//     // .catch(function (error) {
//     //   console.log(error);
//     // });
//   });

//   return (
//     <View>
//       <Text>Signed in!</Text>
//       <Button title="Sign out" onPress={signOut} />
//     </View>
//   );
// }

// function SignInScreen() {
//   const [firstName, setUsername] = React.useState('');
//   const [lastName, setPassword] = React.useState('');

//   const {signIn} = React.useContext(AuthContext);

//   const _postUser = () => {
//     axios
//       .post('https://reqres.in/api/users', {
//         firstName: firstName,
//         lastName: lastName,
//       })
//       .then(function (response) {
//         console.log(response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="Username"
//         value={firstName}
//         onChangeText={(inputUserName) => {
//           setUsername(inputUserName);
//         }}
//       />
//       <TextInput
//         value={lastName}
//         onChangeText={(inputPassWord) => {
//           setPassword(inputPassWord);
//         }}
//         secureTextEntry
//       />
//       <Button
//         title="Sign in"
//         onPress={() => {
//           //console.log(firstName, lastName)
//           _postUser();
//         }}
//       />
//     </View>
//   );
// }

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

console.disableYellowBox = true;

function MainBottomTab() {
  return (
    <Tab.Navigator tabBarOptions={{showLabel: false, activeTintColor: 'black',}}>
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TransactionTab"
        component={TransactionTab}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="exchange" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingTab}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App({navigation}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        axios
          .post(
            'https://emoneydti.basicteknologi.co.id/index.php/api/users/login',
            {
              email: data.username,
              password: data.password,
            },
          )
          .then(function (response) {
            console.log(response.data);
            if (response.data.status == 'true') {
              //login berhasil
              if (response.data.data.nama_user == "") {
                Alert.alert('Failed', 'Insert Email and Password')
              } else {
                Alert.alert(
                  'Success',
                  response.data.msg,
                  [
                    {
                      text: 'Cancel',
                      onPress: async () => {
                        try {
                          await AsyncStorage.setItem(
                            'id_user',
                            response.data.data.id_user,
                          );
                          await AsyncStorage.setItem(
                            'email_user',
                            response.data.data.email_user,
                          );
                          await AsyncStorage.setItem(
                            'nama_user',
                            response.data.data.nama_user,
                          );
                          await AsyncStorage.setItem(
                            'nomor_handphone',
                            response.data.data.nomor_handphone,
                          );
                          await AsyncStorage.setItem('token', 'dummy-auth-token');
                          dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
                        } catch (e) {
                          // saving error
                        }
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }
              
            } else {
              //login gagal
              Alert.alert(
                'Failed',
                response.data.msg,
                [{text: 'Cancel', onPress: async () => {}}],
                {cancelable: false},
              );
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      signOut: async () => {
        try {
          await AsyncStorage.setItem('userToken', '');
          dispatch({type: 'SIGN_OUT'});
        } catch (e) {
          // saving error
        }
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  headerShown: false,
                  title: 'Sign in',
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              <Stack.Screen
                name="Registrasi"
                component={RegistrasiScreen}
                options={{
                  title: 'Registrasi Akun',
                  headerBackTitleVisible: false,
                  headerStyle: {
                    backgroundColor: '#005690',
                  },
                  headerTitleStyle: {
                    color: 'white',
                  },
                  headerTintColor: 'white',
                }}
              />
            </>
          ) : (
            // User is signed in
            <>
              <Stack.Screen
                name="MainBottomTab"
                component={MainBottomTab}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="TopUp"
                component={TopUpScreen}
                options={{
                  title: 'Top Up',
                  headerBackTitleVisible: false,
                  headerStyle: {
                    backgroundColor: '#005690',
                  },
                  headerTitleStyle: {
                    color: 'white',
                  },
                  headerTintColor: 'white',
                }}
              />
              <Stack.Screen
                name="TopUpSucces"
                component={TopUpSuccesScrenn}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="QrPaymentScreen"
                component={QrPaymentScreen}
                options={{
                  title: 'QR Payment',
                  headerBackTitleVisible: false,
                  headerStyle: {
                    backgroundColor: '#005690',
                  },
                  headerTitleStyle: {
                    color: 'white',
                  },
                  headerTintColor: 'white',
                }}
              />
              <Stack.Screen
                name="KonfirmasiBayarScreen"
                component={KonfirmasiBayarScreen}
              />
              <Stack.Screen
                name="PaySuccessScreen"
                component={PaySuccessScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen name="TransferScreen" component={TransferScreen} 
                 options={{
                  title: 'Transfer',
                  headerBackTitleVisible: false,
                  headerStyle: {
                    backgroundColor: '#005690',
                  },
                  headerTitleStyle: {
                    color: 'white',
                  },
                  headerTintColor: 'white',
                }}/>
              <Stack.Screen
                name="TransferNominalScreen"
                component={TransferNominalScreen}
              />
              <Stack.Screen
                name="TransferSuccessScreen"
                component={TransferSuccessScreen}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
