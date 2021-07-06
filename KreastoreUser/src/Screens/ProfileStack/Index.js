import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Header from '../../Components/Header';
import {color} from '../../Theme/Color';
import KreaButton from '../../Components/KreaButton';

const Index = props => {
  return (
    <View style={{display: 'flex', flex: 1}}>
      <Header title={'Profile'} noArrow right={<></>} />
      <View style={styles.container}>
        <KreaButton
          btnStyle={styles.button}
          text={'Profile'}
          onPress={() => props.navigation.navigate('Profile Info')}
        />
        <KreaButton
          btnStyle={styles.button}
          text={'Verifikasi Account'}
          onPress={() => props.navigation.navigate('Verfy')}
        />
        <KreaButton
          btnStyle={styles.button}
          text={'History'}
          onPress={() => props.navigation.navigate('History')}
        />
        <KreaButton
          btnStyle={styles.button}
          text={'Top Up'}
          onPress={() => props.navigation.navigate('Top Up')}
        />
        <KreaButton
          btnStyle={styles.button}
          text={'Buat Donasi'}
          onPress={() => props.navigation.navigate('Post Item')}
        />
        <KreaButton btnStyle={styles.button} text={'Buat Penjualan'} />
        <KreaButton
          btnStyle={styles.button}
          text={'Buat Artikel'}
          onPress={() => props.navigation.navigate('Post Item')}
        />
        <KreaButton
          btnStyle={styles.button}
          btnColor={color.red}
          text={'Keluar'}
          onPress={() => setModal(!modal)}
        />
      </View>
    </View>
  );
};

export default Index;

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
