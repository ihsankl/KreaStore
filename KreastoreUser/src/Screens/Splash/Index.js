import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Image } from 'react-native'
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';

import logo from '../../assets/images/logo.png'
import { color } from '../../Theme/Color'
import { putUserData } from '../../Redux/Action/userData';

const Index = ({ ...props }) => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        if (user) initUser()
        return () => {

        }
    }, [user])

    const initUser = async () => {
        await props.dispatch(putUserData({data:user, isAnonymous:false, ...props.putUserData}))
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode="cover" />
        </ScrollView>
    )
}

const mapStateToProps = state => {
  return {
    putUserData: state.putUserData,
    alert: state.alert,
  };
};
export default connect(mapStateToProps)(Index);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 300,
        height: 400,
    }
})
