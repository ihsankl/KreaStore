import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import Header from '../../Components/Header';
import {color} from '../../Theme/Color';
import KreaButton from '../../Components/KreaButton';
import {connect} from 'react-redux';
import {getUserData, isAnonymous} from '../../Redux/Action/userData';
import {setAlert} from '../../Redux/Action/alert';

const Index = ({dispatch, navigation, ...props}) => {
  const [modal, setModal] = useState(false);
  const dataUser = props?.getUserData?.data;
  console.log({dataUser});

  const onAnonlogout = async () => {
    await dispatch(isAnonymous({state: false}));
  };

  useEffect(() => {
    initGetUser();
    return () => {};
  }, []);

  const initGetUser = async () => {
    try {
      await dispatch(setAlert({...props.alert, isLoading: true}));
      await dispatch(getUserData(props.inputUserData?.user?.id));
      await dispatch(setAlert({...props.alert, isLoading: false}));
    } catch (error) {
      console.log(error.message);
      await dispatch(setAlert({...props.alert, isLoading: false}));
      await dispatch(
        setAlert({
          ...props.alert,
          isError: true,
          msg: error.message,
          status: 'error',
        }),
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        display: 'flex',
        flexGrow: 1,
        backgroundColor: color.accent3,
      }}>
      <Header title={'Profile'} noArrow right={<></>} />
      <View style={styles.container}>
        <KreaButton
          btnStyle={styles.button}
          text={'Profile'}
          onPress={() =>
            !!dataUser ? navigation.navigate('Profile Info') : onAnonlogout()
          }
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
            dataUser?.isVerified === true
              ? navigation.navigate('Post Item')
              : dataUser === undefined
              ? onAnonlogout()
              : navigation.navigate('Verfy')
          }
        />
        <KreaButton
          btnStyle={styles.button}
          text={'Buat Penjualan'}
          onPress={() =>
            dataUser?.isVerified === true
              ? navigation.navigate('Post Item')
              : dataUser === undefined
              ? onAnonlogout()
              : navigation.navigate('Verfy')
          }
        />
        <KreaButton
          btnStyle={styles.button}
          text={'Buat Artikel'}
          onPress={() =>
            dataUser?.isVerified === true
              ? navigation.navigate('Post Item')
              : dataUser === undefined
              ? onAnonlogout()
              : navigation.navigate('Verfy')
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
