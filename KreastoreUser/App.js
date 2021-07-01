import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storage from './src/Redux/store';
import { Text, TouchableOpacity, View } from 'react-native';
const { store, persistor } = storage();
const Stack = createStackNavigator();
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// SCREENS HERE
import Home from './src/Screens/Home/Home';
import History from './src/Screens/History/Index';
import Profile from './src/Screens/Profile/Index';
import Detail from './src/Screens/Detail/Index';
import Splash from './src/Screens/Splash/Index';
import Login from './src/Screens/Login/Index';

const MainApp = () => {
  const [isLogin, setIsLogin] = useState(false)

  if (isLogin) {
    return <MainStack/>
  }

  return <LoginStack/>
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />

      <Stack.Screen options={{ headerShown: false }} name="Detail" component={DetailStack} />
      <Stack.Screen options={{ headerShown: false }} name="History" component={HistoryStack} />
      <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileStack} />
    </Stack.Navigator>
  )
}

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  )
}

const DetailStack = () => (
  <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Detail"
      component={Detail}
    />
  </Stack.Navigator>
)

const HistoryStack = () => (
  <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
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
  </Stack.Navigator>
)

const ProfileStack = () => {
  const [edit, setEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (<Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
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
            style={{ marginRight: 20 }}>
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
  </Stack.Navigator>)
}

const App = () => {
  const [isSplash, setIsSplash] = useState(true)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1007046595469-4pse8scohg8a8p7imo535avmmri560dr.apps.googleusercontent.com',
    })
    return () => {
      
    }
  }, [])

  setTimeout(() => {
    setIsSplash(true)
  }, 3000);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          {isSplash ? <MainApp /> : <Splash />}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
