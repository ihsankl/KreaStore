import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert, BackHandler, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { getUserData } from '../../Redux/Action/getUserData';
import { color } from '../../Theme/Color';
import Header from '../../Components/Header';

const postRef = firestore().collection('post');

const Index = ({ ...props }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // onInit();
    const backAction = () => {
      Alert.alert("Tunggu!", "Apakah kamu yakin ingin keluar?", [
        {
          text: "Tidak Jadi",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Ya", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => { backHandler.remove() };
  }, []);

  const onInit = async () => {
    try {
      const data = [];
      const x = await postRef.get();
      x.forEach(docs => {
        let currentId = docs.id;
        let appObj = { ...docs.data(), ['id']: currentId };
        data.push(appObj);
        setData(data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onTryLogin = async () => {
    try {

      await props.dispatch(getUserData({ ...props.userData.data, isAnonymous: false }))
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow:1,backgroundColor:color.accent3}} >
      <Header noArrow noRight={false} />
      
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.userData,
    alert: state.alert,
  }
}

export default connect(mapStateToProps)(Index);

const styles = StyleSheet.create({});
