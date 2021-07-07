import React, {  } from 'react'
import { StyleSheet, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux';

import logo from '../../assets/images/logo.png'
import { color } from '../../Theme/Color'

const Index = ({ ...props }) => {

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
