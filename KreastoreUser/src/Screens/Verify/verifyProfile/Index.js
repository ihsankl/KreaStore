import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/dist/Feather';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import DatePicker from 'react-native-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {connect} from 'react-redux';

import Header from '../../../Components/Header';
import KreaButton from '../../../Components/KreaButton';
import {color} from '../../../Theme/Color';
import {setAlert} from '../../../Redux/Action/alert';
import {verifikasi} from '../../../Redux/Action/Put';

const Index = props => {
  const [open, setOpen] = useState(false);
  const [photoKTP, setPhotoKTP] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [ktp, setKTP] = useState('');
  const [birth, setBirth] = useState('');
  const [place, setPlace] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [items, setItems] = useState([
    {label: 'Laki-laki', value: 'Laki-laki'},
    {label: 'Perempuan', value: 'Perempuan'},
  ]);

  const handleChoosePhoto = () => {
    // ambil dari galery
    // launchImageLibrary({noData: true}, response => {
    //   console.log('respon', {response});
    //   if (response.didCancel === true) {
    //     setPhoto(null);
    //   } else {
    //     onChangeText({photo: response?.assets?.[0]?.uri});
    //   }
    // });

    // ambil dari camera langsung
    launchCamera({noData: true}, response => {
      console.log({response});
      if (response.didCancel === true) {
        setPhoto(null);
      } else {
        setPhoto(response?.assets?.[0]?.uri);
      }
    });
  };

  const handleChoosePhotoKTP = () => {
    // ambil dari camera langsung
    launchCamera({noData: true}, response => {
      console.log({response});
      if (response.didCancel === true) {
        setPhotoKTP(null);
      } else {
        setPhotoKTP(response?.assets?.[0]?.uri);
      }
    });
  };

  const konfirmasi = async () => {
    const NewData = {
      photoSelfie: photo,
      photoKTP: photoKTP,
      fullname: name,
      ktp: ktp,
      place: place,
      date: birth,
      gender: gender,
      address: address,
    };

    try {
      const data = await props.getUserData.data;
      const id = await props.getUserData.data.id;
      await props.dispatch(
        setAlert({
          ...props.alert,
          isLoading: true,
        }),
      );
      await props.dispatch(verifikasi(id, {...data, ...NewData}));
    } catch (error) {
      setAlert({
        ...props.alert,
        isError: true,
        msg: error.message,
        status: 'error',
      });
    }
    await props.dispatch(
      setAlert({
        ...props.alert,
        isLoading: false,
      }),
    );
  };

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: color.accent2,
        minHeight: '100%',
      }}>
      <Header title={'Verifikasi'} />
      <ScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: color.white,
            padding: 16,
            marginBottom: 16,
          }}>
          <Text style={{color: color.text, fontSize: 24}}>Verifikasi KTP</Text>
        </View>
        <View
          style={{
            backgroundColor: color.white,
            width: '100%',
            display: 'flex',
            flex: 1,
            padding: 16,
          }}>
          <View style={styles.hr} />
          <Text
            style={{textAlign: 'center', color: color.grey, marginBottom: 16}}>
            Upload foto KTP & foto diri beserta KTP. Wajah dan KTP harus
            terlihat jelas
          </Text>
          <Text style={styles.title}>Foto KTP</Text>
          <TouchableOpacity onPress={handleChoosePhotoKTP}>
            <Image
              style={{
                backgroundColor: color.grey,
                width: '100%',
                height: 100,
                alignSelf: 'center',
                marginTop: 30,
                borderRadius: 10,
              }}
              source={{
                uri: photoKTP,
              }}
            />
            <View
              style={{
                position: 'absolute',
                paddingHorizontal: 50,
                paddingTop: '20%',
                width: '100%',
              }}>
              <Feather
                name="camera"
                style={{
                  color: color.text,
                  alignSelf: 'center',
                  fontSize: 25,
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.hr} />
          <Text style={styles.title}>Foto Diri Beserta KTP</Text>
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Image
              style={{
                backgroundColor: color.grey,
                width: '100%',
                height: 100,
                alignSelf: 'center',
                marginTop: 30,
                borderRadius: 10,
              }}
              source={{
                uri: photo,
              }}
            />
            <View
              style={{
                position: 'absolute',
                paddingHorizontal: 50,
                paddingTop: '20%',
                width: '100%',
              }}>
              <Feather
                name="camera"
                style={{
                  color: color.text,
                  alignSelf: 'center',
                  fontSize: 25,
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.hr} />
          <View>
            <Text style={styles.title}>Nama Lengkap</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={e => setName(e)}
            />
          </View>
          <View style={styles.hr} />
          <View>
            <Text style={styles.title}>No. KTP</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="phone-pad"
              value={ktp}
              onChangeText={e => {
                setKTP(e.replace(/[^0-9]/g, ''));
              }}
            />
          </View>
          <View style={styles.hr} />
          <View>
            <Text style={styles.title}>Tempat Lahir</Text>
            <TextInput
              style={styles.textInput}
              value={place}
              onChangeText={e => setPlace(e)}
            />
          </View>
          <View style={styles.hr} />
          <View>
            <Text style={styles.title}>Tanggal Lahir</Text>
            <DatePicker
              style={[
                styles.textInput,
                {width: Dimensions.get('window').width - 32},
              ]}
              date={birth}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={date => {
                setBirth(date);
              }}
            />
          </View>
          <View style={styles.hr} />
          <View>
            <Text style={styles.title}>Jenis Kelamin</Text>
            <DropDownPicker
              open={open}
              value={gender}
              items={items}
              setOpen={setOpen}
              setValue={setGender}
              setItems={setItems}
            />
            {/* <TextInput
              style={styles.textInput}
              value={gender}
              onChangeText={e => setGender(e)}
            /> */}
          </View>
          <View style={styles.hr} />
          <View>
            <Text style={styles.title}>Alamat (Seseuai KTP)</Text>
            <View
              style={{
                backgroundColor: '#FFEAEA',
                minHeight: 50,
                borderRadius: 10,
                padding: 24,
                flexDirection: 'row',
              }}>
              <Ionicons
                name="alert-circle-outline"
                style={{
                  color: color.red,
                  alignSelf: 'center',
                  fontSize: 25,
                }}
              />
              <Text
                style={{
                  color: color.grey,
                  textAlign: 'justify',
                }}>
                Masukkan alamat sesuai KTP. Kreastore berhak menolak pengajuan
                jika alamat tidak sesuai.
              </Text>
            </View>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.textInput}
              value={address}
              onChangeText={e => setAddress(e)}
            />
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flex: 1,
            backgroundColor: color.white,
            marginTop: 8,
            padding: 16,
          }}>
          <KreaButton
            btnStyle={{margin: 24}}
            text={'Konfirmasi'}
            onPress={() => konfirmasi()}
            disabled={
              !(
                photo &&
                photoKTP &&
                name &&
                ktp &&
                place &&
                birth &&
                gender &&
                address
              )
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    putPhone: state.putPhone,
    alert: state.alert,
    getUserData: state.getUserData,
  };
};

export default connect(mapStateToProps)(Index);

const styles = StyleSheet.create({
  hr: {
    borderWidth: 1,
    borderColor: color.grey,
    marginVertical: 20,
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 2,
    marginHorizontal: 16,
    borderBottomColor: color.text,
    borderBottomColor: color.grey,
    borderBottomWidth: 1,
    fontFamily: 'Poppins-Regular',
  },
  title: {
    fontSize: 16,
  },
});
