import React from 'react';
import {useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput, Alert} from 'react-native';
import {color} from '../../Theme/Color';
import {superAdmin} from '../../Utils/DataAccount';
import KreaButton from '../Component/KreaButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginAdminSuper({setLogin}) {
  const [data, setData] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const user = username;
    const pw = password;
    const db = superAdmin;
    try {
      const verif = db.filter(v => {
        return v.username === user && v.password === pw;
      });
      if (verif.length === 0) {
        Alert.alert('Username atau Password Salah');
      } else {
        const data = {
          username: user,
          password: pw,
          role: verif?.[0]?.role,
        };
        await AsyncStorage.setItem('dataUser', JSON.stringify(data));
        setLogin(true);
      }
      console.log({user, pw, db, verif});
    } catch (e) {
      console.warn('error login', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{backgroundColor: '#F0FFFE', flex: 1}}>
      <View style={{height: 250}}>
        <Image
          style={{
            backgroundColor: 'grey',
            width: 150,
            height: 150,
            borderRadius: 100,
            alignSelf: 'center',
            marginTop: 30,
          }}
          source={{
            uri: 'https://banner2.cleanpng.com/20180426/lwq/kisspng-computer-icons-login-management-user-5ae155f3386149.6695613615247170432309.jpg',
          }}
        />
      </View>
      <View>
        <Text style={styles.title}>Username</Text>
        <TextInput
          style={styles.textInput}
          value={username}
          placeholder={'Username'}
          onChangeText={e => setUsername(e)}
        />
      </View>
      <View style={{marginTop: 20}}>
        <Text style={styles.title}>Password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          placeholder={'Password'}
          onChangeText={e => setPassword(e)}
        />
      </View>
      <View
        style={{
          marginTop: 50,
          marginBottom: 30,
          backgroundColor: color.primary,
          borderRadius: 10,
          marginHorizontal: 16,
        }}>
        <KreaButton
          text="Log In"
          disabled={loading}
          onPress={() => {
            handleLogin();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.grey,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonYes: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 70,
    backgroundColor: '#2196F3',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 70,
    backgroundColor: 'red',
    marginLeft: 'auto',
  },
  textStyle: {
    color: color.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalText2: {
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  title: {
    alignSelf: 'stretch',
    marginHorizontal: 16,
    color: color.text,
    fontSize: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 2,
    marginHorizontal: 16,
    borderBottomColor: color.text,
    borderBottomColor: color.grey,
    borderBottomWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
});
