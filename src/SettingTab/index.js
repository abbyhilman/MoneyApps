import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../Context';

const SettingTab = () => {
  const {signOut} = React.useContext(AuthContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{width: '100%', height: 224, backgroundColor: '#005690'}}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: 29,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: 'white',
            marginTop: 23,
          }}>
          Abby
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: 'white',
            marginTop: 9,
          }}>
          081222
        </Text>
      </View>
      <View style={{marginTop: 35}}>
        <TouchableOpacity
          style={styles.btn_sigin}
          //onPress={signOut}
          activeOpacity={0.5}>
          <Text style={styles.txtLogin}>UBAH PROFIL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn_sigin}
          //onPress={signOut}
          activeOpacity={0.5}>
          <Text style={styles.txtLogin}>GANTI PASSWORD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn_sigin}
          onPress={signOut}
          activeOpacity={0.5}>
          <Text style={styles.txtLogin}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingTab;

const styles = StyleSheet.create({
  btn_sigin: {
    width: 280,
    height: 48,
    backgroundColor: '#4982C1',
    borderRadius: 4,
    alignItems: 'center',
    padding: 15,
    alignSelf: 'center',
    marginTop: 26,
  },
  txtLogin: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});
