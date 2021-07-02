import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storage from './src/Redux/store';
import {Text, TouchableOpacity} from 'react-native';
const {store, persistor} = storage();
const Stack = createStackNavigator();

// SCREENS HERE
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
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
