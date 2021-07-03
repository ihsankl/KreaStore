import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// SCREENS HERE
import Login from '../Screens/Login/Index';
import Home from '../Screens/Home/Index';
import Detail from '../Screens/Detail/Index';
import History from '../Screens/History/Index';
import Profile from '../Screens/Profile/Index';
import Search from '../Screens/Search/Index';
import PostItem from '../Screens/PostItem/Index';
import TopUp from '../Screens/TopUp/Index';
import Payment from '../Screens/Payment/Index';
import { TabBar } from '../Components/TabBar';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Index = ({ ...props }) => {
  const isLogin = props.userData.data || props.userData.isAnonymous;
  if (isLogin) {
    return <MainStack />;
  }

  return <LoginStack />;
};

const BottomTab = () => {
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Top Up" component={TopUpStack} />
      <Tab.Screen name="Post Item" component={PostItemStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  )
}

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={BottomTab}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Detail"
        component={Detail}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="History"
        component={HistoryStack}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileStack}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Search"
        component={SearchStack}
      />
    </Stack.Navigator>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={MainStack}
      />
    </Stack.Navigator>
  );
};

const HistoryStack = () => (
  <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="History"
      component={History}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Search"
      component={Search}
    />
  </Stack.Navigator>
);

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
    </Stack.Navigator>
  );
};

const PostItemStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="PostItem"
        component={PostItem}
      />
    </Stack.Navigator>
  );
};

const TopUpStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="TopUp"
        component={TopUp}
      />
    </Stack.Navigator>
  );
};

const PaymentStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
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
