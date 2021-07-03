import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert, BackHandler, ScrollView, Image, FlatList, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import Feather from 'react-native-vector-icons/dist/Feather';
import { color } from '../../Theme/Color';
import Header from '../../Components/Header';
import img1 from '../../assets/images/kantong-ajaib.png'
import text_logo from '../../assets/images/text_logo.png'
import { Formatter } from '../../Utils/Formatter'
import { ProgressBar } from '@react-native-community/progress-bar-android';
import KreaButton from '../../Components/KreaButton';
import { v4 as uuidv4 } from 'uuid';
import SearchInput from '../../Components/SearchInput';

const postRef = firestore().collection('post');

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

const Index = ({ navigation, ...props }) => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   // onInit();
  //   const backAction = () => {
  //     Alert.alert("Tunggu!", "Apakah kamu yakin ingin keluar?", [
  //       {
  //         text: "Tidak Jadi",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       { text: "Ya", onPress: () => BackHandler.exitApp() }
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => { backHandler.remove() };
  // }, []);

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

  const RenderFavorites = ({ item }) => {
    return (
      <TouchableOpacity style={styles.imgContainer} onPress={() => navigation.navigate('Detail')}>
        <Image style={styles.img} source={img1} resizeMode="cover" />
        <Text style={styles.imgText}>{item.title}</Text>
        <Feather name="star" size={24} style={styles.starIcon} color={color.white} />
        <View style={styles.layer} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Header noArrow children={<Image source={text_logo} style={{ height: 24, width: 200 }} resizeMode="contain" />} noRight={false} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.popularText, styles.padding16]}>Pilihan untuk mu</Text>
        <View style={[styles.itemAbsolute, styles.padding16]}>
          <FlatList
            data={dummyItems}
            renderItem={RenderFavorites}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
          <FlatList
            style={{ flex: 1 }}
            data={dummyCategories}
            renderItem={RenderCategories}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <SearchInput onPress={()=> navigation.navigate('Search')} editable={false} placeholder="Cari . . ." />
        </View>

        <View style={[styles.itemAbsolute, styles.padding16]}>
          <RenderContents data={dummyItems} />
        </View>

      </ScrollView>
    </View>
  );
};

const RenderContents = ({ data }) => {
  return data.map((v, i) => {
    return (
      <TouchableOpacity style={{ width: '100%' }} key={i}>
        <Image style={{ borderRadius: 8, marginTop: 16, height: 200, width: '100%', minWidth: 300, maxWidth: 350, }} source={img1} resizeMode="cover" />
        <View style={{ position: 'absolute', bottom: 0, backgroundColor: `${color.white}50`, left: 0, right: 0, padding: 8 }}>
          <Text style={{ color: color.text, fontSize: 18 }}>Kantong Ajaib</Text>
          <Text style={{ color: color.text, fontSize: 12 }}>kantong yang bisa menyimpan segala benda</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: color.text, fontSize: 16 }}>78%</Text>
            <Text style={{ color: color.text, fontSize: 16 }}>{Formatter(120000)}</Text>
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
    userData: state.userData,
    alert: state.alert,
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
  itemAbsolute: {
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
