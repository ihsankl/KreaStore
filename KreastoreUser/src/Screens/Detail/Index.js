import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';

import {ParsedDate} from '../../Utils/ParseDate';
import {color} from '../../Theme/Color';

const dummy = [
  {
    id: '1',
    image: require('../../assets/images/kantong-ajaib.png'),
    label: 'Kantong Ajaib',
    funding_goal: '720.000',
    funding_total: '240.000',
    funding_start_date: '2021-06-20',
    funding_end_date: '2021-07-01',
    images: [
      {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
      },
      {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
      },
      {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg',
      },
      {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
      },
      {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
      },
    ],
    description:
      'Enim amet ipsum aliqua ex reprehenderit fugiat labore ut sunt irure occaecat. Voluptate voluptate magna excepteur non quis nulla eiusmod ex consequat amet labore. Aute occaecat exercitation labore et. Ex laborum sit culpa aliquip minim pariatur aliqua irure do fugiat. Occaecat dolor mollit commodo nulla duis. Veniam ex enim eiusmod nulla ex excepteur esse irure adipisicing labore.',
    funder: [
      {
        user_id: '1',
        username: 'Ihsan Kurniawan',
        total: '30',
        image: require('../../assets/images/kantong-ajaib.png'),
      },
      {
        user_id: '2',
        username: 'Alghi',
        total: '10',
        image: require('../../assets/images/kantong-ajaib.png'),
      },
      {
        user_id: '3',
        username: 'Vildan Romli Afriansyah Putra',
        total: '1.000.000',
        image: require('../../assets/images/kantong-ajaib.png'),
      },
      {
        user_id: '4',
        username: 'Ocra',
        total: '20',
        image: require('../../assets/images/kantong-ajaib.png'),
      },
      {
        user_id: '5',
        username: 'Rafli',
        total: '50',
        image: require('../../assets/images/kantong-ajaib.png'),
      },
    ],
  },
];

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Index = ({...props}) => {
  const [data, setData] = useState(dummy);
  const [tab, setTab] = useState(1);
  const [animated, setAnimated] = useState(new Animated.Value(0));
  const carouselRef = useRef(null);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: color.primary,
    color: color.white,
  };

  const onTab = tab => {
    setTab(tab);
    if (tab == 2) {
      Animated.timing(animated, {
        toValue: 300,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animated, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }
  };

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.carousel}>
        <ParallaxImage
          source={{uri: item.illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  // const slider = {
  //   height: animated,
  // };

  return (
    <View style={{backgroundColor: color.white, display: 'flex'}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Ionic
              name="chevron-back-outline"
              style={[
                styles.back,
                {color: tab == 2 ? color.white : color.grey},
              ]}
              onPress={() => props.navigation.navigate('Home')}
            />
            <Animated.Image
              style={[styles.image, {height: animated}]}
              source={item.image}
            />
            {/* </Animated.View> */}
            <View
              style={[
                styles.card,
                tab != 2 && {
                  paddingTop: 30,
                },
              ]}>
              <Text style={styles.label}>{item.label}</Text>
              {tab != 1 && (
                <>
                  <View style={styles.funding}>
                    <Text style={{fontSize: 18}}>{`${Math.trunc(
                      (item.funding_total / item.funding_goal) * 100,
                    )}%`}</Text>
                    <Text
                      style={{
                        fontSize: 12,
                      }}>{`Rp. ${item.funding_total} dari Rp. ${item.funding_goal}`}</Text>
                  </View>
                  <ProgressBar
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={
                      ((item.funding_total / item.funding_goal) * 100) / 100
                    }
                    color={color.primary}
                  />
                  <View style={styles.funding}>
                    <Text style={styles.text}>
                      {ParsedDate(item.funding_start_date, 'years')}
                    </Text>
                    <Text style={styles.text}>
                      {Math.trunc(
                        Math.floor(
                          (new Date(item.funding_end_date).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        ),
                      ) <= 0
                        ? 'Donasi sudah ditutup'
                        : Math.trunc(
                            Math.floor(
                              (new Date(item.funding_end_date).getTime() -
                                new Date().getTime()) /
                                (1000 * 60 * 60 * 24),
                            ),
                          ) + 'hari tersisa'}
                    </Text>
                    <Text style={styles.text}>
                      {data[0].funder.length} Pendukung
                    </Text>
                  </View>
                </>
              )}
              <View style={styles.tab}>
                <TouchableHighlight
                  style={tab == '1' ? styles.buttonActive : styles.button}
                  onPress={() => onTab(1)}
                  {...touchProps}>
                  <Text
                    style={
                      tab == '1' ? styles.buttonTextActive : styles.buttonText
                    }>
                    Tentang Produk
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={tab == '2' ? styles.buttonActive : styles.button}
                  onPress={() => onTab(2)}
                  {...touchProps}>
                  <Text
                    style={
                      tab == '2' ? styles.buttonTextActive : styles.buttonText
                    }>
                    Pendukung
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={tab == '3' ? styles.buttonActive : styles.button}
                  onPress={() => onTab(3)}
                  {...touchProps}>
                  <Text
                    style={
                      tab == '3' ? styles.buttonTextActive : styles.buttonText
                    }>
                    Berita
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.hr} />

              <View style={{flex: 1, marginBottom: 10}}>
                {tab == '1' ? (
                  <>
                    <FlatList
                      data={data}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => (
                        <View>
                          <Text>{item.description}</Text>
                        </View>
                      )}
                    />

                    <Carousel
                      ref={carouselRef}
                      sliderWidth={300}
                      sliderHeight={300}
                      itemWidth={300 - 60}
                      data={dummy[0].images}
                      renderItem={renderItem}
                      hasParallaxImages={true}
                    />
                  </>
                ) : tab == '2' ? (
                  <FlatList
                    contentContainerStyle={styles.supportContainer}
                    data={data[0].funder}
                    keyExtractor={user => user.user_id}
                    onEndReachedThreshold={0.5}
                    renderItem={({item}) => (
                      <>
                        <View style={styles.support}>
                          <Image style={styles.imgUser} source={item.image} />
                          <View style={styles.supportData}>
                            <Text style={styles.userSupport}>
                              {item.username}
                            </Text>
                            <Text style={styles.totalSupport}>
                              {`Mendonasikan ${item.total} kreapoin`}
                            </Text>
                          </View>
                        </View>
                      </>
                    )}
                  />
                ) : (
                  <Text>3</Text>
                )}
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.buttonFloating}>
        <TouchableOpacity style={styles.btnReport}>
          <Feather name="alert-triangle" style={styles.alertIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDonate}>
          <Text style={styles.tittleBtnDonate}>Donasi</Text>
          {/* <Feather name="arrow-right" style={styles.rowIcon} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  back: {
    fontSize: 25,
    position: 'absolute',
    top: 0,
    zIndex: 99999,
    margin: 10,
  },
  image: {
    width: '100%',
    // height: 300,
  },
  card: {
    display: 'flex',
    width: '100%',
    minHeight: deviceHeight,
    top: '-3%',
    backgroundColor: color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
  },
  funding: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  text: {
    fontSize: 16,
  },
  button: {
    backgroundColor: color.white,
    borderRadius: 10,
    padding: 5,
    height: deviceHeight / 20,
    borderColor: color.primary,
    borderWidth: 1,
    marginRight: 10,
  },
  buttonActive: {
    backgroundColor: color.primary,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    height: deviceHeight / 20,
    marginRight: 10,
  },
  buttonText: {
    color: '#B9B8B8',
  },
  buttonTextActive: {
    color: color.white,
  },
  tab: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  hr: {
    borderWidth: 1,
    borderColor: color.grey,
    marginBottom: 10,
  },
  buttonFloating: {
    // display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: color.accent3,
    position: 'absolute',
    bottom: 0,
    padding: 10,
    elevation: 20,
  },
  supportContainer: {
    flexGrow: 1,
  },
  support: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  supportData: {
    justifyContent: 'center',
    margin: 5,
  },
  userSupport: {
    fontSize: 16,
  },
  totalSupport: {
    fontSize: 8,
    color: '#5E5E5E',
  },
  imgUser: {
    width: deviceWidth / 6,
    height: deviceHeight / 10,
    borderRadius: 5,
  },
  btnReport: {
    width: deviceWidth / 11,
    height: deviceHeight / 22,
    backgroundColor: 'red',
    borderRadius: 5,
    // marginHorizontal: 10,
    justifyContent: 'center',
  },
  alertIcon: {
    fontSize: 20,
    textAlign: 'center',
    color: color.white,
  },
  rowIcon: {
    fontSize: 25,
    textAlign: 'center',
    color: color.white,
  },
  btnDonate: {
    width: deviceWidth / 1.3,
    height: deviceHeight / 22,
    backgroundColor: color.primary,
    borderRadius: 5,
    marginHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tittleBtnDonate: {
    color: color.white,
    textAlign: 'center',
    fontSize: 20,
  },
  carousel: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  imageContainer: {
    flex: 1,
    // marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: color.white,
    borderRadius: 8,
  },
  imageCarousel: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
