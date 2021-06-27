import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storage from './src/Redux/store';
const {store, persistor} = storage();
const Stack = createStackNavigator();

// SCREENS HERE
import Home from './src/Screens/Home/Home';
import Index from './src/Screens/History/Index';
import Detail from './src/Screens/Detail/Index';

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="History"
        component={Index}
        options={{
          title: 'Riwayat',
          headerStyle: {
            backgroundColor: '#F0FFFE',
          },
        }}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Detail"
        component={Detail}
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
