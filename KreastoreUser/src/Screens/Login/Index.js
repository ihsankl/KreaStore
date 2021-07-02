import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { color } from '../../Theme/Color';
import logo2 from '../../assets/images/logo2.png'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { getUserData } from '../../Redux/Action/getUserData';
import { connect } from 'react-redux'
import KreaButton from '../../Components/KreaButton';
import Icon from 'react-native-vector-icons/dist/Feather';
import logo_google from '../../assets/images/logo_google.png'

const Index = ({ ...props }) => {

    const onLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            await props.dispatch(getUserData({ user, isAnonymous: false }))
        } catch (error) {
            console.log(error.message)
        }
    }

    const onAnonLogin = async () => {
        try {
            await props.dispatch(getUserData({ ...props.userData.data, isAnonymous: true }))
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={logo2} style={styles.logo} resizeMode="cover" />
            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 36, color: '#474747' }}>KreaStore</Text>
            <Text style={{ textAlign: 'center' }}>Selamat datang di KreaStore, yuk cari donatur untuk mendanai karyamu.</Text>

            <KreaButton onPress={onAnonLogin} btnStyle={{marginTop:35}} text="Masuk Tanpa Login" btnColor={color.secondary}/>
            <KreaButton onPress={onLogin} textStyle={{marginLeft:4}} text="Masuk Dengan Google" btnStyle={{marginTop:15}} btnColor={color.secondary}>
                <Image source={logo_google} style={{height:20, width:20}} resizeMode="cover" />
            </KreaButton>

        </ScrollView>
    );
}

const mapStateToProps = state => {
    return {
        userData: state.userData,
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