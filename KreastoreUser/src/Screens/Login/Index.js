import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { color } from '../../Theme/Color';
import logo2 from '../../assets/images/logo2.png'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { putUserData, getUserData, insertUserData } from '../../Redux/Action/userData';
import { setAlert } from '../../Redux/Action/alert';
import { connect } from 'react-redux'
import KreaButton from '../../Components/KreaButton';
import logo_google from '../../assets/images/logo_google.png'

const Index = ({ dispatch, navigation, ...props }) => {

    const onLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            await dispatch(setAlert({ ...props.alert, isLoading: true }))
            const user = await GoogleSignin.signIn();
            const { idToken } = user
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.log(error.message)
        } finally {
            await dispatch(setAlert({ ...props.alert, isLoading: false }))
        }
    }

    const onAnonLogin = async () => {
        try {
            if (navigation.canGoBack()) {
                navigation.pop()
            } else {
                await dispatch(putUserData({ ...props.putUserData.data, isAnonymous: true }))
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={logo2} style={styles.logo} resizeMode="cover" />
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 36, color: color.text }}>KreaStore</Text>
            <Text style={{ textAlign: 'center' }}>Selamat datang di KreaStore. Tempatnya Kreator untuk ber-Kreasi</Text>

            <KreaButton onPress={onAnonLogin} btnStyle={{ marginTop: 35 }} text="Saya hanya ingin melihat - lihat" btnColor={color.secondary} />
            <KreaButton onPress={onLogin} textStyle={{ marginLeft: 4 }} text="Masuk Dengan Google" btnStyle={{ marginTop: 15 }} btnColor={color.secondary}>
                <Image source={logo_google} style={{ height: 20, width: 20 }} resizeMode="cover" />
            </KreaButton>

        </ScrollView>
    );
}

const mapStateToProps = state => {
    return {
        putUserData: state.putUserData,
        alert: state.alert,
    }
}

export default connect(mapStateToProps)(Index);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: color.accent3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: 200,
        width: 200,
    }
})