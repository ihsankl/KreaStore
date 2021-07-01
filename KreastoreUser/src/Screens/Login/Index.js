import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Button } from 'react-native';
import { color } from '../../Theme/Color';
import logo2 from '../../assets/images/logo2.png'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';


const Index = () => {

    const onLogin = async() => {
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={logo2} style={styles.logo} resizeMode="cover" />
            <Text>KreaStore</Text>
            <Text>Selamat datang di KreaStore, yuk cari donatur untuk mendanai karyamu.</Text>

            <Button onPress={onLogin} title="Login" />
        </ScrollView>
    );
}

export default Index

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: color.accent2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo:{
        height:200,
        width:200,
    }
})