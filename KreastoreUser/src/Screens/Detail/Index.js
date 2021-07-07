import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  Modal,
} from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import CheckBox from '@react-native-community/checkbox';
import Feather from 'react-native-vector-icons/Feather';
import Ionic from 'react-native-vector-icons/Ionicons';

import { ParsedDate } from '../../Utils/ParseDate';
import { color } from '../../Theme/Color';
import KreaButton from '../../Components/KreaButton';
import _ from "underscore";
import { connect } from 'react-redux';

const dummy = [
  {
    id: '1',
    photoUrl: ["https://firebasestorage.googleapis.com/v0/b/kreastore-867f3.appspot.com/o/rn_image_picker_lib_temp_c1cdfb44-c560-40f7-b954-b4ad63d8bc7c.png?alt=media&token=9e448ebe-2412-4768-bdd5-a2dfebcc600d"],
    product_name: 'Kantong Ajaib',
    funding_goal: '720.000',
    funding_total: '240.000',
    funding_start_date: '2021-06-20',
    funding_end_date: '2021-07-01',

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

const Index = ({ route, navigation, ...props }) => {
  const [data, setData] = useState(dummy);
  const [tab, setTab] = useState(1);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(null);
  const [isReport, setReport] = useState(null);
  const [animated, setAnimated] = useState(new Animated.Value(0));
  const [isSelected, setSelection] = useState(false);
  const [reporting, setReporting] = useState([
    {
      id: 1,
      tittle: 'Item mengandung konten tidak senonoh',
      checked: false,
    },
    {
      id: 2,
      tittle: 'Item tidak sesuai deskripsi',
      checked: false,
    },
  ]);
  const allData = props.allPost.data
  const { id } = route.params;

  useEffect(() => {
    getDetail()
    return () => {

    }
  }, [])

  const getDetail = () => {
    const x = _.findWhere(allData, { id: id })
    setData([x])
    console.log([x])
  }

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

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.carousel}>
        <ParallaxImage
          source={{ uri: item.illustration }}
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

  const openModal = type => {
    setModal(true);
    setType(type);
  };

  const isCheck = id => {
    const newValue = reporting.map((checkbox, i) => {
      if (checkbox.id !== id)
        return {
          ...checkbox,
          checked: false,
        };
      if (checkbox.id === id) {
        setReport(checkbox.tittle);
        const item = {
          ...checkbox,
          checked: !checkbox.checked,
        };
        return item;
      }
      return checkbox;
    });
    setReporting(newValue);
  };

  const sendReport = () => {
    console.log(isReport);
  };

  const renderCheckbox = ({ item }) => {
    return (
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={item.checked}
          tintColors={{ true: color.primary }}
          onValueChange={() => isCheck(item.id)}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          {item.tittle}
        </Text>
      </View>
    );
  };

  return (
    <>
      <View style={{ backgroundColor: color.white, display: 'flex' }}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <Ionic
                name="chevron-back-outline"
                style={[
                  styles.back,
                  { color: tab == 2 ? color.white : color.grey },
                ]}
                onPress={() => navigation.navigate('Home')}
              />
              <Animated.Image
                style={[styles.image, { height: animated }]}
                source={{ uri: item?.photoUrl?.[0] }}
              />

              <View
                style={[
                  styles.card,
                  tab != 2 && {
                    paddingTop: 30,
                  },
                ]}>
                <Text style={styles.label}>{item?.product_name}</Text>
                {tab != 1 && (
                  <>
                    <View style={styles.funding}>
                      <Text style={{ fontSize: 18 }}>{`${Math.trunc(
                        (item?.funding_total / item?.funding_goal) * 100,
                      )}%`}</Text>
                      <Text
                        style={{
                          fontSize: 12,
                        }}>{`Rp. ${item?.funding_total} dari Rp. ${item?.funding_goal}`}</Text>
                    </View>
                    <ProgressBar
                      styleAttr="Horizontal"
                      indeterminate={false}
                      progress={
                        ((item?.funding_total / item?.funding_goal) * 100) / 100
                      }
                      color={color.primary}
                    />
                    <View style={styles.funding}>
                      <Text style={styles.text}>
                        {ParsedDate(item?.funding_start_date, 'years')}
                      </Text>
                      <Text style={styles.text}>
                        {Math.trunc(
                          Math.floor(
                            (new Date(item?.funding_end_date).getTime() -
                              new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                          ),
                        ) <= 0
                          ? 'Donasi sudah ditutup'
                          : Math.trunc(
                            Math.floor(
                              (new Date(item?.funding_end_date).getTime() -
                                new Date().getTime()) /
                              (1000 * 60 * 60 * 24),
                            ),
                          ) + 'hari tersisa'}
                      </Text>
                      <Text style={styles.text}>
                        {data[0]?.funder?.length} Pendukung
                      </Text>
                    </View>
                  </>
                )}

                {/* TAB */}

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
                </View>
                <View style={styles.hr} />

                {/* END TAB */}

                {/* TAB CONTENT */}

                <View style={{ flex: 1, marginBottom: 10 }}>
                  {tab == '1' ? (
                    <>
                      <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                          <View>
                            <Text>{item?.description}</Text>
                          </View>
                        )}
                      />

                      <Carousel
                        ref={carouselRef}
                        sliderWidth={300}
                        sliderHeight={300}
                        itemWidth={300 - 60}
                        data={data[0]?.photoUrl}
                        renderItem={renderItem}
                        hasParallaxImages={true}
                      />
                    </>
                  ) : tab == '2' && !!data[0].fund &&
                  <FlatList
                    contentContainerStyle={styles.supportContainer}
                    data={data[0]?.funder}
                    keyExtractor={user => user.user_id}
                    onEndReachedThreshold={0.5}
                    renderItem={({ item }) => (
                      <>
                        <View style={styles.support}>
                          <Image style={styles.imgUser} source={item.image} />
                          <View style={styles.supportData}>
                            <Text style={styles.userSupport}>
                              {item.username}
                            </Text>
                            <Text style={styles.totalSupport}>
                              {`Mendonasikan ${item?.total} kreapoin`}
                            </Text>
                          </View>
                        </View>
                      </>
                    )}
                  />
                  }
                </View>
              </View>
            </View>
          )}
        />

        {/* END TAB CONTENT */}

        {/* BUTTON FLOAT */}

        <View style={styles.buttonFloating}>
          <TouchableOpacity
            style={styles.btnReport}
            onPress={() => openModal('report')}>
            <Feather name="alert-triangle" style={styles.alertIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnDonate}
            onPress={() => openModal('donasi')}>
            <Text style={styles.tittleBtnDonate}>Donasi</Text>
            {/* <Feather name="arrow-right" style={styles.rowIcon} /> */}
          </TouchableOpacity>
        </View>

        {/* END BUTTON FLOAT */}
      </View>

      {/* MODAL REPORT */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModal(!modal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {type == 'report' ? (
              <>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                  Laporkan Item
                </Text>
                <Text style={{ fontSize: 18 }}>Kenapa melaporkan item ini ?</Text>
                <FlatList
                  data={reporting}
                  renderItem={renderCheckbox}
                  keyExtractor={item => item.id}
                />
              </>
            ) : (
              <>
                <Text>donasi</Text>
              </>
            )}
            <View style={{ flexDirection: 'row' }}>
              <KreaButton
                btnStyle={{ marginRight: 8 }}
                text={'Batal'}
                onPress={() => setModal(!modal)}
              />
              <KreaButton
                btnStyle={{ backgroundColor: color.red }}
                text={'Kirim'}
                onPress={sendReport}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* END MODAL REPORT */}
    </>
  );
};

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
    minHeight: 850,
    backgroundColor: color.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    top: -20,
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
    height: 40,
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
    height: 40,
    marginRight: 10,
  },
  buttonText: {
    color: '#B9B8B8',
    fontSize: 18,
  },
  buttonTextActive: {
    color: color.white,
    fontSize: 18,
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
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: color.accent3,
    position: 'absolute',
    bottom: 0,
    padding: 10,
    elevation: 5,
    // justifyContent: 'space-between',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalSupport: {
    fontSize: 16,
    color: '#5E5E5E',
  },
  imgUser: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  btnReport: {
    width: 50,
    height: 35,
    backgroundColor: color.red,
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
    flex: 1,
    width: '100%',
    height: 35,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: color.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 400,
  },
  checkboxContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
});
