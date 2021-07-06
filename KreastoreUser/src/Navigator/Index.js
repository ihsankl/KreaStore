import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

// SCREENS HERE
import Login from '../Screens/Login/Index';
import Home from '../Screens/Home/Index';
import Detail from '../Screens/Detail/Index';
import History from '../Screens/History/Index';
import Profile from '../Screens/Profile/Index';
import Profiles from '../Screens/ProfileStack/Index';
import Search from '../Screens/Search/Index';
import PostItem from '../Screens/PostItem/Index';
import TopUp from '../Screens/TopUp/Index';
import Payment from '../Screens/Payment/Index';
import News from '../Screens/News/Index';
import NewsDetail from '../Screens/News/NewsDetail/Index';
import Market from '../Screens/Market/Index';
import MarketDetail from '../Screens/Market/MarketDetail/Index';
import { TabBar } from '../Components/TabBar';
import { getUserData, insertUserData, putUserData } from '../Redux/Action/userData';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Index = ({ dispatch, ...props }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const isLogin = props.putUserData.isSignedIn || props.putUserData.isAnonymous;

  useEffect(() => {
    onLogin();
    return () => {
      logoutAnon();
    };
  }, [user]);

  const onLogin = async () => {
    try {
      if (user) {
        const x = await dispatch(
          putUserData({ user, isAnonymous: false, isSignedIn: true }),
        );
        const y = await dispatch(getUserData(x.value.user?._user?.uid))
        if (!y?.value?.exists) {
          const dataToInsert = {
            id: x.value.user?._user?.uid,
            posts: [],
            photo: x.value.user?._user?.photoURL,
            name: x.value.user?._user?.displayName,
            email: x.value.user?._user?.email,
            isVerified: false,
          }
          const z = await dispatch(insertUserData(dataToInsert.id, dataToInsert))
          console.log(z)
        }
      } else {
        await dispatch(
          putUserData({ data: null, isAnonymous: false, isSignedIn: false }),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logoutAnon = async () => {
    console.log('ON UNMOUNT');
    if (user) {
      await dispatch(putUserData({ user, isAnonymous: false, isSignedIn: true }));
    } else {
      await dispatch(
        putUserData({ data: null, isAnonymous: false, isSignedIn: false }),
      );
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (isLogin) {
    return <MainStack {...props} />;
  }

  return <LoginStack />;
};

const BottomTab = ({ ...props }) => {
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Top Up" component={props.putUserData.isSignedIn ? TopUpStack : LoginStack} />
      <Tab.Screen name="Post Item" component={props.putUserData.isSignedIn ? PostItemStack : LoginStack} /> */}
      <Tab.Screen
        name="Store"
        component={MarketStack}
      />
      <Tab.Screen
        name="News"
        component={NewsStack}
      />
      <Tab.Screen
        name="Profile"
        component={props.putUserData.isSignedIn ? ProfileStack : LoginStack}
      />
    </Tab.Navigator>
  );
};

const MainStack = ({ ...props }) => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen options={{ headerShown: false }} name="Home">
        {() => <BottomTab {...props} />}
      </Stack.Screen>
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
        options={{headerShown: false}}
        name="Profile Info"
        component={ProfileInfoStack}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="Post Item"
        component={PostItemStack}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Search"
        component={SearchStack}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="News"
        component={NewsStack}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="News Detail"
        component={NewsDetailStack}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Market"
        component={MarketStack}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="MarketDetail"
        component={MarketDetailStack}
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
        component={Profiles}
      />
    </Stack.Navigator>
  );
};

const ProfileInfoStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile Info"
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

const NewsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="News"
        component={News}
      />
    </Stack.Navigator>
  );
};

const NewsDetailStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="News"
        component={NewsDetail}
      />
    </Stack.Navigator>
  );
};

const MarketStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Market"
        component={Market}
      />
    </Stack.Navigator>
  );
};

const MarketDetailStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="MarketDetail"
        component={MarketDetail}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => {
  return {
    putUserData: state.putUserData,
    alert: state.alert,
  };
};
export default connect(mapStateToProps)(Index);
