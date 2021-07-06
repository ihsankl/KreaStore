import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  BackHandler,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import Feather from 'react-native-vector-icons/dist/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';
import {color} from '../../Theme/Color';
import img1 from '../../assets/images/kantong-ajaib.png';
import text_logo from '../../assets/images/text_logo.png';
import {Formatter} from '../../Utils/Formatter';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import KreaButton from '../../Components/KreaButton';
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
    category: 'Film & Video',
  },
  {
    id: 'uuidv42',
    category: 'Teknologi',
  },
  {
    id: 'uuidv43',
    category: 'Buku',
  },
  {
    id: 'uuidv44',
    category: 'Drama',
  },
  {
    id: 'uuidv45',
    category: 'Peralatan',
  },
];

const Index = ({navigation, ...props}) => {
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
        let appObj = {...docs.data(), ['id']: currentId};
        data.push(appObj);
        setData(data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const RenderFavorites = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.imgContainer}
        onPress={() => navigation.navigate('Detail')}>
        <Image style={styles.img} source={img1} resizeMode="cover" />
        <Text style={styles.imgText}>{item.title}</Text>
        <Feather
          name="star"
          size={24}
          style={styles.starIcon}
          color={color.white}
        />
        <View style={styles.layer} />
      </TouchableOpacity>
    );
  };

  const EmptyFavorites = () => {
    return (
      <View
        style={{
          height: 180,
          width: Dimensions.get('window').width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Ups! Belum ada Item disini</Text>
      </View>
    );
  };

  const RenderContents = ({data}) => {
    if (data.length == 0) {
      return (
        <View
          style={{
            height: 225,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Ups! Belum ada Item disini</Text>
        </View>
      );
    }
    return data.map((v, i) => {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}} key={i}>
          <TouchableOpacity
            style={{width: '100%'}}
            key={i}
            onPress={() => navigation.navigate('MarketDetail')}>
            <Image
              style={{
                borderRadius: 8,
                marginTop: 16,
                height: 225,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={img1}
              resizeMode="cover"
            />
            <View
              style={{
                position: 'absolute',
                marginTop: 18,
                padding: 10,
                right: 0,
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('History')}>
                <Ionic name="heart-outline" size={24} color={color.white} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                backgroundColor: `${color.white}50`,
                left: 0,
                right: 0,
                padding: 8,
                width: '100%',
              }}>
              <Text style={{color: color.text, fontSize: 18}}>
                Kantong Ajaib
              </Text>
              <Text style={{color: color.text, fontSize: 12}}>
                kantong yang bisa menyimpan segala benda
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{color: color.text, fontSize: 16}}>
                  {Formatter(120000)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Image
          source={text_logo}
          style={{height: 24, width: 150}}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Ionic name="heart-outline" size={24} color={color.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View
          style={{
            display: 'flex',
            // padding: 16,
            margin: 16,
            backgroundColor: color.white,
            borderRadius: 10,
            elevation: 5,
            minHeight: 100,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={{flexDirection: 'column'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 50, height: 50, alignItems: 'center'}}
                  source={require('../../assets/images/ovo.png')}
                />
                <Text style={{color: color.text, fontWeight: 'bold'}}>
                  {Formatter(120000)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 31,
                    height: 31,
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}
                  source={require('../../assets/images/dana.png')}
                />
                <Text style={{color: color.text, fontWeight: 'bold'}}>
                  {Formatter(5000)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 31,
                    height: 31,
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginTop: 14,
                  }}
                  source={require('../../assets/images/shope.png')}
                />
                <Text style={{color: color.text, fontWeight: 'bold'}}>
                  {Formatter(5000)}
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('Top Up')}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: color.primary,
                      textDecorationLine: 'underline',
                    }}>
                    Top Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[styles.popularText, styles.padding16]}>
            Pilihan untuk mu
          </Text>
          <TouchableOpacity
            style={{flex: 1, margin: 8}}
            onPress={() => navigation.navigate('Search')}>
            <SearchInput editable={false} placeholder="Cari . . ." />
          </TouchableOpacity>
        </View>
        <View style={[styles.itemRelative, styles.padding16]}>
          <FlatList
            data={dummyItems}
            renderItem={RenderFavorites}
            ListEmptyComponent={EmptyFavorites}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View
          style={[
            styles.padding16,
            {flexDirection: 'row', alignItems: 'center', marginTop: 16},
          ]}>
          <FlatList
            style={{flex: 1}}
            data={dummyCategories}
            renderItem={RenderCategories}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View
          style={[
            styles.itemRelative,
            styles.padding16,
            {
              width: '100%',
            },
          ]}>
          <RenderContents data={dummyItems} />
        </View>
      </ScrollView>
    </View>
  );
};

const RenderCategories = ({item}) => {
  return <KreaButton btnStyle={{marginRight: 8}} text={item.category} />;
};

const mapStateToProps = state => {
  return {
    putUserData: state.putUserData,
    alert: state.alert,
  };
};

export default connect(mapStateToProps)(Index);

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.accent3,
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  popularText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: color.text,
  },
  itemRelative: {
    position: 'relative',
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
    zIndex: 1,
  },
  starIcon: {
    position: 'absolute',
    right: 0,
    margin: 8,
    zIndex: 1,
  },
  layer: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: `${color.text}30`,
    borderRadius: 8,
  },
  padding16: {
    paddingHorizontal: 16,
  },
});
