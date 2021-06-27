import React, {useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ProgressBarAndroid,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {ParsedDate} from '../../Utils/ParseDate';

const dummy = [
  {
    id: '1',
    image: require('../../assets/image/kantong-ajaib.png'),
    label: 'Kantong Ajaib',
    funding_goal: '720.000',
    funding_total: '240.000',
    funding_start_date: '6 juli',
    funding_end_date: '6 agustus',
    funder: [
      {
        user_id: '1',
        username: 'Ihsan Kurniawan',
        total: '30',
        image: require('../../assets/image/kantong-ajaib.png'),
      },
      {
        user_id: '2',
        username: 'Alghi',
        total: '10',
        image: require('../../assets/image/kantong-ajaib.png'),
      },
      {
        user_id: '3',
        username: 'Vildan Romli Afriansyah Putra',
        total: '1.000.000',
        image: require('../../assets/image/kantong-ajaib.png'),
      },
      {
        user_id: '4',
        username: 'Ocra',
        total: '20',
        image: require('../../assets/image/kantong-ajaib.png'),
      },
      {
        user_id: '5',
        username: 'Rafli',
        total: '50',
        image: require('../../assets/image/kantong-ajaib.png'),
      },
    ],
  },
];

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Index = props => {
  const [data, setData] = useState(dummy);
  const [tab, setTab] = useState(1);

  const touchProps = {
    activeOpacity: 1,
    underlayColor: '#38B6FF',
    color: '#FFF',
  };

  const onTab = tab => {
    setTab(tab);
  };

  return (
    <View style={{backgroundColor: '#FFF'}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <>
            <Image style={styles.image} source={item.image} />
            <View style={styles.card}>
              <Text style={styles.label}>{item.label}</Text>
              <View style={styles.funding}>
                <Text style={{fontSize: 18}}>{`${Math.trunc(
                  (item.funding_total / item.funding_goal) * 100,
                )}%`}</Text>
                <Text
                  style={{
                    fontSize: 12,
                  }}>{`Rp. ${item.funding_total} dari Rp. ${item.funding_goal}`}</Text>
              </View>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={
                  ((item.funding_total / item.funding_goal) * 100) / 100
                }
                color={'#38B6FF'}
              />
              <View style={styles.funding}>
                <Text style={styles.text}>{item.funding_start_date}</Text>
                <Text style={styles.text}>30 hari tersisa</Text>
                <Text style={styles.text}>30 pendukung</Text>
              </View>
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

              <View style={{flex: 1, marginBottom: 20}}>
                {tab == '1' ? (
                  <>
                    <Text>1</Text>
                  </>
                ) : tab == '2' ? (
                  <SafeAreaView>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}>
                      <FlatList
                        contentContainerStyle={styles.supportContainer}
                        data={data[0].funder}
                        keyExtractor={user => user.user_id}
                        onEndReachedThreshold={0.5}
                        renderItem={({item}) => (
                          <>
                            <View style={styles.support}>
                              <Image
                                style={styles.imgUser}
                                source={item.image}
                              />
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
                    </ScrollView>
                  </SafeAreaView>
                ) : (
                  <Text>3</Text>
                )}
              </View>
            </View>

            <View style={styles.buttonFloating}>
              <TouchableOpacity style={styles.btnReport}>
                <Feather name="alert-triangle" style={styles.alertIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnDonate}>
                <Text style={styles.tittleBtnDonate}>Donasi</Text>
                {/* <Feather name="arrow-right" style={styles.rowIcon} /> */}
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  image: {
    width: deviceWidth,
    height: deviceHeight / 3.5,
  },
  card: {
    display: 'flex',
    width: deviceWidth,
    height: deviceHeight / 1.5,
    top: '-3%',
    backgroundColor: '#FFF',
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
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 5,
    height: deviceHeight / 20,
    borderColor: '#38B6FF',
    borderWidth: 1,
    marginRight: 10,
  },
  buttonActive: {
    backgroundColor: '#38B6FF',
    borderColor: '#38B6FF',
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
    color: '#FFF',
  },
  tab: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  hr: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    marginBottom: 10,
  },
  buttonFloating: {
    display: 'flex',
    flexDirection: 'row',
    width: deviceWidth,
    height: deviceHeight / 15,
    backgroundColor: '#F0FFFE',
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
    color: '#FFF',
  },
  rowIcon: {
    fontSize: 25,
    textAlign: 'center',
    color: '#FFF',
  },
  btnDonate: {
    width: deviceWidth / 1.3,
    height: deviceHeight / 22,
    backgroundColor: '#38B6FF',
    borderRadius: 5,
    marginHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tittleBtnDonate: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
  },
});
