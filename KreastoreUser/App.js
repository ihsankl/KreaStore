import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storage from './src/Redux/store';
import {Text, TouchableOpacity, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {typography} from './src/Utils/Typography';
import firestore from '@react-native-firebase/firestore';
const {store, persistor} = storage();
// const db = firestore();
// db.settings({host: 'localhost:8080', ssl: false});
typography();

// SCREENS HERE
import Splash from './src/Screens/Splash/Index';
import Navigator from './src/Navigator/Index';

const App = () => {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1007046595469-4pse8scohg8a8p7imo535avmmri560dr.apps.googleusercontent.com',
    });
    return () => {};
  }, []);

  setTimeout(() => {
    setIsSplash(false);
  }, 3000);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          {isSplash ? <Splash /> : <Navigator />}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App
