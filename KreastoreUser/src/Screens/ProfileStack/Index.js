import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Header from '../../Components/Header';
import { color } from '../../Theme/Color';
import KreaButton from '../../Components/KreaButton';
import {connect} from 'react-redux';

const Index = props => {
  const dataUser = props.getUserData.data;
  return (
    <ScrollView contentContainerStyle={{ display: 'flex', flexGrow: 1, backgroundColor: color.accent3 }}>
      <Header title={'Profile'} noArrow right={<></>} />
      <View style={styles.container}>
        <KreaButton
          btnStyle={styles.button}
          text={'Profile'}
          onPress={() => navigation.navigate('Profile Info')}
        />
        <KreaButton
          btnStyle={styles.button}
          text={'Verifikasi Account'}
          onPress={() => navigation.navigate('Verfy')}
        />
        <KreaButton
          btnStyle={styles.button}
          text={'History'}
          onPress={() => navigation.navigate('History')}
        />
        <KreaButton
          btnStyle={styles.button}
          text={'Top Up'}
          onPress={() => navigation.navigate('Top Up')}
        />
        <KreaButton
          btnStyle={styles.button}
          text={'Buat Donasi'}
          onPress={() =>
            dataUser?.isVerified === false
              ? props.navigation.navigate('Verfy')
              : props.navigation.navigate('Post Item')
          }
        />
        <KreaButton
          btnStyle={styles.button}
          text={'Buat Penjualan'}
          onPress={() =>
            dataUser?.isVerified === false
              ? props.navigation.navigate('Verfy')
              : props.navigation.navigate('Post Item')
          }
        />
        <KreaButton
          btnStyle={styles.button}
          text={'Buat Artikel'}
          onPress={() =>
            dataUser?.isVerified === false
              ? props.navigation.navigate('Verfy')
              : props.navigation.navigate('Post Item')
          }
        />
        <KreaButton
          btnStyle={styles.button}
          btnColor={color.red}
          text={'Keluar'}
          onPress={() => setModal(!modal)}
        />
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    putUserData: state.putUserData,
    alert: state.alert,
    getUserData: state.getUserData,
    inputUserData: state.inputUserData,
    allPostByFav: state.allPostByFav,
    allPost: state.allPost,
  };
};

export default connect(mapStateToProps)(Index);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: color.accent3,
    padding: 16,
  },
  button: {
    margin: 10,
  },
});
