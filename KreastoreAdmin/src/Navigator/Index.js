import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import auth from '@react-native-firebase/auth';

// SCREENS HERE
import Crowdfunding from '../Screens/Crowdfunding/AdminData/Index';
import Marketplace from '../Screens/Marketplace/AdminData/Index';
import InformationSystem from '../Screens/InformationSystem/AdminData/Index';
import {TabBar} from '../Screens/Component/TabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Index = ({dispatch, ...props}) => {
  const [initializing, setInitializing] = useState(true);

  return <MainStack {...props} />;
};
// const [user, setUser] = useState();
// const isLogin = props.putUserData.isSignedIn || props.putUserData.isAnonymous;

//   useEffect(() => {
//     onLogin();
//     return () => {
//       logoutAnon();
//     };
//   }, [user]);

//   useEffect(() => {
//     console.log('ONMOUNT', props.putUserData);
//     return () => {};
//   }, []);

//   const onLogin = async () => {
//     try {
//       if (user) {
//         await dispatch(
//           putUserData({user, isAnonymous: false, isSignedIn: true}),
//         );
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   const logoutAnon = async () => {
//     console.log('ON UNMOUNT');
//     if (user) {
//       await dispatch(putUserData({user, isAnonymous: false, isSignedIn: true}));
//     } else {
//       await dispatch(
//         putUserData({data: null, isAnonymous: false, isSignedIn: false}),
//       );
//     }
//   };

//   if (isLogin) {
//     return <MainStack {...props} />;
//   }

//   return <LoginStack />;
// };

const BottomTab = ({...props}) => {
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name="Crowdfunding" component={CrowdfundingStack} />
      <Tab.Screen name="Marketplace" component={MarketplaceStack} />
      <Tab.Screen name="InformationSystem" component={InformationSystemStack} />
    </Tab.Navigator>
  );
};

const MainStack = ({...props}) => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen options={{headerShown: false}} name="Home">
        {() => <BottomTab {...props} />}
      </Stack.Screen>
      {/* <Stack.Screen
          options={{headerShown: false}}
          name="Detail"
          component={Detail}
        /> */}

      {/* <Stack.Screen
          options={{headerShown: false}}
          name="History"
          component={HistoryStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Profile"
          component={ProfileStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Search"
          component={SearchStack}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="News"
          component={NewsStack}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="News Detail"
          component={NewsDetailStack}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Market"
          component={MarketStack}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="MarketDetail"
          component={MarketDetailStack}
        /> */}
    </Stack.Navigator>
  );
};

const CrowdfundingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Crowdfunding"
        component={Crowdfunding}
      />
    </Stack.Navigator>
  );
};

const MarketplaceStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      options={{headerShown: false}}
      name="Marketplace"
      component={Marketplace}
    />
  </Stack.Navigator>
);

const InformationSystemStack = () => (
  <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
    <Stack.Screen
      options={{headerShown: false}}
      name="InformationSystem"
      component={InformationSystem}
    />
  </Stack.Navigator>
);

// const ProfileStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="Profile"
//         component={Profile}
//       />
//     </Stack.Navigator>
//   );
// };

// const PostItemStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="PostItem"
//         component={PostItem}
//       />
//     </Stack.Navigator>
//   );
// };

// const TopUpStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="TopUp"
//         component={TopUp}
//       />
//     </Stack.Navigator>
//   );
// };

// const PaymentStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="Payment"
//         component={Payment}
//       />
//     </Stack.Navigator>
//   );
// };

// const NewsStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="News"
//         component={News}
//       />
//     </Stack.Navigator>
//   );
// };

// const NewsDetailStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="News"
//         component={NewsDetail}
//       />
//     </Stack.Navigator>
//   );
// };

// const MarketStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="Market"
//         component={Market}
//       />
//     </Stack.Navigator>
//   );
// };

// const MarketDetailStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
//       <Stack.Screen
//         options={{headerShown: false}}
//         name="MarketDetail"
//         component={MarketDetail}
//       />
//     </Stack.Navigator>
//   );
// };

// const mapStateToProps = state => {
//   return {
//     putUserData: state.putUserData,
//     alert: state.alert,
//   };
// };
export default Index;
