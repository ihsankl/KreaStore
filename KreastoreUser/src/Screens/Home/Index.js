import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert, BackHandler, ScrollView, Image, FlatList, TextInput, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import Feather from 'react-native-vector-icons/dist/Feather';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { color } from '../../Theme/Color';
import img1 from '../../assets/images/kantong-ajaib.png'
import text_logo from '../../assets/images/text_logo.png'
import { Formatter } from '../../Utils/Formatter'
import { ProgressBar } from '@react-native-community/progress-bar-android';
import KreaButton from '../../Components/KreaButton';
import SearchInput from '../../Components/SearchInput';
import { getAllPost, getAllPostByFav } from '../../Redux/Action/post';
import { setAlert } from '../../Redux/Action/alert';
import { insertUserData } from '../../Redux/Action/userData';

const usersRef = firestore().collection('users');

const dummyItems = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const dummyCategories = [
  {
    id: 'uuidv41',
    category: 'Film & Video'
  },
  {
    id: 'uuidv42',
    category: 'Teknologi'
  },
  {
    id: 'uuidv43',
    category: 'Buku'
  },
  {
    id: 'uuidv44',
    category: 'Drama'
  },
  {
    id: 'uuidv45',
    category: 'Peralatan'
  },
]

const Index = ({ dispatch, navigation, ...props }) => {

  useEffect(() => {
    onInit()
    return () => {

    }
  }, [])

  const onInit = async () => {
    try {
      await dispatch(setAlert({ ...props.alert, isLoading: true }))
      getUsers()
      await dispatch(getAllPostByFav())
      await dispatch(getAllPost())
      await dispatch(setAlert({ ...props.alert, isLoading: false }))
    } catch (error) {
      console.log(error.message);
      await dispatch(setAlert({ ...props.alert, isLoading: false }))
      await dispatch(setAlert({ ...props.alert, isError: true, msg: error.message, status: "error" }))
    }
  };

  const getUsers = async () => {
    try {
      const x = await usersRef.doc(props.inputUserData?.user?.id).get()
      if (!x.exists) {
        if (props.inputUserData?.user) {
          await dispatch(insertUserData(props.inputUserData.user.id, props.inputUserData.user));
        }
      }
    } catch (error) {
      console.log(error.message)
      // await dispatch(setAlert({ ...props.alert, isLoading: false }))
      // await dispatch(setAlert({ ...props.alert, isError: true, msg: error.message, status: "error" }))
    }
  }

  const RenderFavorites = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.navigate('Detail')}>
        <Image style={styles.img} source={{ uri: item?.photoUrl }} resizeMode="cover" />
        <Text style={styles.imgText}>{item?.product_name}</Text>
        <Feather name="star" size={24} style={styles.starIcon} color={color.white} />
        <View style={styles.layer} />
      </TouchableOpacity>
    )
  }

  const EmptyFavorites = () => {
    return (
      <View style={{ height: 180, width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ups! Belum ada Item disini</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Image source={text_logo} style={{ height: 24, width: 150 }} resizeMode="contain" />
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Feather name="rotate-ccw" size={24} color={color.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[styles.popularText, styles.padding16]}>Pilihan untuk mu</Text>
          <TouchableOpacity style={{ flex: 1, margin: 8 }} onPress={() => navigation.navigate('Search')}>
            <SearchInput editable={false} placeholder="Cari . . ." />
          </TouchableOpacity>
        </View>
        <View style={[styles.itemRelative, styles.padding16]}>
          <FlatList
            data={props.allPostByFav?.data}
            renderItem={RenderFavorites}
            ListEmptyComponent={EmptyFavorites}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={[styles.padding16, { flexDirection: 'row', alignItems: 'center', marginTop: 16 }]}>
          <FlatList
            style={{ flex: 1 }}
            data={dummyCategories}
            renderItem={RenderCategories}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={[styles.itemRelative, styles.padding16, { width: '100%', minWidth: 300, maxWidth: 400 }]}>
          <RenderContents data={props.allPost?.data} />
        </View>

      </ScrollView>
    </View>
  );
};

const RenderContents = ({ data }) => {
  if (data.length == 0) {
    return (
      <View style={{ height: 225, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ups! Belum ada Item disini</Text>
      </View>
    )
  }
  return data.map((v, i) => {
    return (
      <TouchableOpacity style={{ width: '100%' }} key={i}>
        <Image style={{ borderRadius: 8, marginTop: 16, height: 225, width: '100%', minWidth: 300, maxWidth: 400, }} source={{ uri: v?.photoUrl }} resizeMode="cover" />
        <View style={{ position: 'absolute', bottom: 0, backgroundColor: `${color.white}50`, left: 0, right: 0, padding: 8 }}>
          <Text style={{ color: color.text, fontSize: 18 }}>{v?.product_name}</Text>
          <Text style={{ color: color.text, fontSize: 12 }}>{v?.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
            <Text style={{ color: color.text, fontSize: 16 }}>{Formatter(Number(v?.funding_goal))}</Text>
          </View>
          <ProgressBar styleAttr="Horizontal" color={color.primary} progress={.78} indeterminate={false} />
        </View>
      </TouchableOpacity>
    )
  })
}

const RenderCategories = ({ item }) => {
  return <KreaButton btnStyle={{ marginRight: 8 }} text={item.category} />
}

const mapStateToProps = state => {
  return {
    inputUserData: state.inputUserData,
    alert: state.alert,
    allPostByFav: state.allPostByFav,
    allPost: state.allPost,
  }
}

export default connect(mapStateToProps)(Index);

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.accent3,
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 50
  },
  popularText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: color.text
  },
  itemRelative: {
    position: 'relative'
  },
  imgContainer: {
    marginTop: 16,
    marginRight: 16,
  },
  img: {
    width: 300,
    height: 180,
    borderRadius: 8,
  },
  imgText: {
    position: 'absolute',
    bottom: 0,
    margin: 8,
    color: color.white,
    fontSize: 18,
    zIndex: 1
  },
  starIcon: {
    position: 'absolute',
    right: 0,
    margin: 8,
    zIndex: 1
  },
  layer: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: `${color.text}30`,
    borderRadius: 8
  },
  padding16: {
    paddingHorizontal: 16,
  },
});
