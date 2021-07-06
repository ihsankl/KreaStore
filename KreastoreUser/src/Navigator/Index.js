import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

// SCREENS HERE
import Login from '../Screens/Login/Index';
import Home from '../Screens/Home/Index';
import Detail from '../Screens/Detail/Index';
import History from '../Screens/History/Index';
import Profile from '../Screens/Profile/Index';
import Profiles from '../Screens/ProfileStack/Index';
import Verfy from '../Screens/Verfy/Index';
import Search from '../Screens/Search/Index';
import PostItem from '../Screens/PostItem/Index';
import TopUp from '../Screens/TopUp/Index';
import Payment from '../Screens/Payment/Index';
import News from '../Screens/News/Index';
import NewsDetail from '../Screens/News/NewsDetail/Index';
import Market from '../Screens/Market/Index';
import MarketDetail from '../Screens/Market/MarketDetail/Index';
import { TabBar } from '../Components/TabBar';
import Loading from '../Components/Loading';
import {
  isAnonymous,
} from '../Redux/Action/userData';
import ModalInformation from '../Components/ModalInformation';
import { setAlert } from '../Redux/Action/alert';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Index = ({ dispatch, ...props }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const isLogin = user || props.isAnonData.state;

  const logoutAnon = async () => {
    await dispatch(isAnonymous({ state: false }))
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return ()=>{ 
      subscriber;
      logoutAnon();
    }; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const onCloseModal = async () => {
    await dispatch(
      setAlert({ ...props.alert, isSuccess: false, isError: false }),
    );
  };

  if (isLogin) {
    return (
      <>
        <Loading visible={props.alert.isLoading} />
        <ModalInformation
          visible={props.alert.isSuccess || props.alert.isError}
          msg={props.alert.msg}
          status={props.alert.status}
          onDismiss={onCloseModal}
        />
        <MainStack user={user} {...props} />
      </>
    );
  }
  return (
    <>
      <Loading visible={props.alert.isLoading} />
      <LoginStack {...props} />
    </>
  );
};

const BottomTab = ({ ...props }) => {
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Top Up" component={props.putUserData.isSignedIn ? TopUpStack : LoginStack} />
      <Tab.Screen name="Post Item" component={props.putUserData.isSignedIn ? PostItemStack : LoginStack} /> */}
      <Tab.Screen name="Store" component={MarketStack} />
      <Tab.Screen name="News" component={NewsStack} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
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
        name="Top Up"
        component={TopUpStack}
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
        name="Profile Info"
      >
        {() => <ProfileInfoStack user={props.user} />}
      </Stack.Screen>

      <Stack.Screen
        options={{ headerShown: false }}
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

      <Stack.Screen
        options={{ headerShown: false }}
        name="Verfy"
        component={VerfyStack}
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

const ProfileInfoStack = ({ user, ...props }) => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Profile Info"
        component={user ? Profile : LoginStack}
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

const VerfyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Verfy"
        component={Verfy}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => {
  return {
    getUserData: state.getUserData,
    alert: state.alert,
    isAnonData: state.isAnonData
  };
};
export default connect(mapStateToProps)(Index);
