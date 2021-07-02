import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storage from './src/Redux/store';
import {Text, TouchableOpacity, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {typography} from './src/Utils/Typography';
import firestore from '@react-native-firebase/firestore';
const {store, persistor} = storage();
const Stack = createStackNavigator();
const db = firestore();
const {store, persistor} = storage();
db.settings({host: 'localhost:8080', ssl: false});
typography();

// SCREENS HERE
import Splash from './src/Screens/Splash/Index';
import Navigator from './src/Navigator/Index';
import Home from './src/Screens/Home/Home';
import History from './src/Screens/History/Index';
import Profile from './src/Screens/Profile/Index';
import Detail from './src/Screens/Detail/Index';
import Search from './src/Screens/Search/Index';

const MainStackNavigator = () => {
  const [edit, setEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          title: 'Riwayat',
          headerStyle: {
            backgroundColor: '#F0FFFE',
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        options={{
          title: 'Profil Pengguna',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                if (edit === false) {
                  setEdit(!edit);
                } else {
                  setModalVisible(true);
                }
              }}
              style={{marginRight: 20}}>
              <Text>{edit ? 'Batal' : 'Ubah'}</Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#F0FFFE',
          },
        }}>
        {props => (
          <Profile
            {...props}
            flagEdit={edit}
            changeFlag={e => setEdit(e)}
            modalVisible={modalVisible}
            setModalVisible={e => setModalVisible(e)}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        options={{headerShown: false}}
        name="Detail"
        component={Detail}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Pencarian',
          headerStyle: {
            backgroundColor: '#F0FFFE',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isSplash, setIsSplash] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1007046595469-4pse8scohg8a8p7imo535avmmri560dr.apps.googleusercontent.com',
    });
    return () => {};
  }, []);

  setTimeout(() => {
    setIsSplash(true);
  }, 3000);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          {isSplash ? <Navigator /> : <Splash />}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
