import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Login from '../Screens/Login/Index';
import Home from '../Screens/Home/Index';
import Detail from '../Screens/Detail/Index';
import History from '../Screens/History/Index';
import Profile from '../Screens/Profile/Index';
import Search from '../Screens/Search/Index';
import PostItem from '../Screens/PostItem/Index';
import TopUp from '../Screens/TopUp/Index';
import Payment from '../Screens/Payment/Index';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Index = ({...props}) => {
  const isLogin = props.userData.data || props.userData.isAnonymous;
  if (isLogin) {
    return <DrawerNavigator />;
  }

  return <LoginStack />;
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerPosition={'left'}>
      <Drawer.Screen options={{}} name="Home" component={MainStack} />

      <Drawer.Screen options={{}} name="History" component={HistoryStack} />

      <Drawer.Screen options={{}} name="Search" component={SearchStack} />

      <Drawer.Screen options={{}} name="Post Item" component={PostItemStack} />

      <Drawer.Screen options={{}} name="Top Up" component={TopUpStack} />

      <Drawer.Screen options={{}} name="Payment" component={PaymentStack} />

      {/* <Drawer.Screen options={{

            }} name="Post" component={null} />

            <Drawer.Screen options={{
                
            }} name="Notification" component={null} /> */}

      <Drawer.Screen options={{}} name="Profile" component={ProfileStack} />
    </Drawer.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Detail"
        component={Detail}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="History"
        component={HistoryStack}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={ProfileStack}
      />
    </Stack.Navigator>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={MainStack}
      />
    </Stack.Navigator>
  );
};

const HistoryStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      options={{headerShown: false}}
      name="History"
      component={History}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      options={{headerShown: false}}
      name="Search"
      component={Search}
    />
  </Stack.Navigator>
);

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
};

const PostItemStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="PostItem"
        component={PostItem}
      />
    </Stack.Navigator>
  );
};

const TopUpStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="TopUp"
        component={TopUp}
      />
    </Stack.Navigator>
  );
};

const PaymentStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Payment"
        component={Payment}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.userData,
    alert: state.alert,
  };
};
export default connect(mapStateToProps)(Index);
