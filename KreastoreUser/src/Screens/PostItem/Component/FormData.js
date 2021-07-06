import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import KreaButton from '../../../Components/KreaButton';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-datepicker';
import {color} from '../../../Theme/Color';
import {connect} from 'react-redux';
import {putUserData} from '../../../Redux/Action/userData';
import {insertPostData} from '../../../Redux/Action/post';
import {setAlert} from '../../../Redux/Action/alert';
import storage from '@react-native-firebase/storage';

const regex = /^.*[\\\/]/;

function FormData({
  data,
  handleChoosePhoto = () => {},
  onChange = () => {},
  navigation,
  dispatch,
  ...props
}) {
  const {isSignedIn} = props.putUserData;
  const userData = props.putUserData?.data;

  // deskripsi: "a"
  // feedBack: "asdadasdasd"
  // kategori: "Design"
  // namaProduk: "a"
  // photoUrl: "file:///data/user/0/com.kreastoreuser/cache/rn_image_picker_lib_temp_4b0144b3-7695-4a7a-af19-d8426fdb23ea.jpg"
  // tanggalAkhir: "2021-07-05"
  // total: 123123123123123120

  const isDisabled = () => {
    if (
      !data.description ||
      !data.feedback ||
      !data.category ||
      !data.product_name ||
      !data.photoUrl ||
      !data.funding_end_date ||
      !data.funding_goal
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async () => {
    try {
      await dispatch(setAlert({...props.alert, isLoading: true}));
      if (!userData) {
        await dispatch(putUserData({data: null, isAnonymous: false}));
      } else {
        const photoToUpload = data.photoUrl.replace(regex, '');
        const reference = storage().ref(photoToUpload);
        await reference.putFile(data.photoUrl);
        const url = await storage().ref(photoToUpload).getDownloadURL();
        const dataToUpload = {
          ...data,
          photoUrl: url,
          favorite: [],
        };
        await dispatch(insertPostData(dataToUpload));
        await dispatch(setAlert({...props.alert, isLoading: false}));
        await dispatch(
          setAlert({
            ...props.alert,
            isSuccess: true,
            msg: 'Permintaan Penggalangan Dana Berhasil Dilakukan.',
            status: 'Sukses',
          }),
        );
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error.message);
      await dispatch(setAlert({...props.alert, isLoading: false}));
      await dispatch(
        setAlert({...props.alert, isSuccess: true, msg: error.message}),
      );
    }
  };

  return (
    <ScrollView>
      {!isSignedIn && (
        <Text
          style={{marginVertical: 16, textAlign: 'center', color: color.red}}>
          Anda harus login terlebih dahulu untuk memulai penggalangan dana.
        </Text>
      )}
      <View style={{marginBottom: 30, marginTop: 10}}>
        <Text style={styles.title}>Nama Produk</Text>
        <TextInput
          editable={isSignedIn == undefined ? false : true}
          style={styles.textInput}
          onChangeText={e => {
            onChange({product_name: e});
          }}
          value={data.product_name}
          // editable={false}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <Text style={styles.title}>Pilih Kategori</Text>
        <View style={styles.textInput}>
          <Picker
            enabled={isSignedIn == undefined ? false : true}
            selectedValue={data.category}
            onValueChange={(itemValue, itemIndex) => {
              onChange({category: itemValue});
            }}>
            <Picker.Item label="-- Pilih Kategori --" value="" />
            <Picker.Item label="Comics" value="Comics" />
            <Picker.Item label="Craft" value="Craft" />
            <Picker.Item label="Dance" value="Dance" />
            <Picker.Item label="Design" value="Design" />
            <Picker.Item label="Fashion" value="Fashion" />
            <Picker.Item label="Film & Video" value="Film & Video" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Games" value="Games" />
            <Picker.Item label="Journalism" value="Journalism" />
            <Picker.Item label="Music" value="Music" />
            <Picker.Item label="Photography" value="Photography" />
            <Picker.Item label="Publishing" value="Publishing" />
            <Picker.Item label="Technology" value="Technology" />
            <Picker.Item label="Theater" value="Theater" />
          </Picker>
        </View>
      </View>
      <View style={{marginBottom: 30}}>
        <Text style={styles.title}>Deskripsi</Text>
        <TextInput
          editable={isSignedIn == undefined ? false : true}
          style={styles.textInput}
          multiline={true}
          numberOfLines={4}
          value={data.description}
          onChangeText={e => {
            onChange({description: e});
          }}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <Text style={styles.title}>Foto Produk</Text>
        {data.photoUrl ? (
          <Image
            source={{uri: data.photoUrl}}
            style={{
              width: 300,
              height: 300,
              margin: '1%',
              alignSelf: 'stretch',
              padding: 2,
              marginLeft: 30,
              marginRight: 30,
              borderRadius: 5,
            }}
          />
        ) : (
          <TouchableOpacity
            disabled={isSignedIn == undefined ? true : false}
            onPress={handleChoosePhoto}>
            <View
              style={[
                styles.textInput,
                {backgroundColor: color.grey, height: 150},
              ]}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: 2,
                  height: 40,
                  marginLeft: 30,
                  marginRight: 30,
                  marginTop: 10,
                  marginBottom: 10,
                  backgroundColor: '#DFDFDF',
                  borderRadius: 5,
                }}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <View style={{marginRight: 5}}>
                    <Entypo
                      name="camera"
                      style={{
                        color: 'white',
                        fontSize: 20,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: 15,
                      }}>
                      Tambah Foto
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginBottom: 30}}>
        <Text style={styles.title}>Target Dana Terkumpul</Text>
        <TextInput
          editable={isSignedIn == undefined ? false : true}
          keyboardType="numeric"
          style={styles.textInput}
          value={data.funding_goal ? data.funding_goal : ''}
          onChangeText={e => {
            onChange({funding_goal: e.replace(/[^0-9]/g, '')});
          }}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <Text style={styles.title}>Tanggal Akhir Pengumpulan Dana</Text>
        <DatePicker
          disabled={isSignedIn == undefined ? true : false}
          style={[
            styles.textInput,
            {width: Dimensions.get('window').width - 32},
          ]}
          date={data.funding_end_date}
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
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            onChange({funding_end_date: date});
          }}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <Text style={styles.title}>Jelaskan Keuntungan Bagi Donatur</Text>
        <TextInput
          editable={isSignedIn == undefined ? false : true}
          style={styles.textInput}
          multiline={true}
          numberOfLines={4}
          value={data.feedback}
          onChangeText={e => {
            onChange({feedback: e});
          }}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <KreaButton
          onPress={onSubmit}
          disabled={isDisabled()}
          btnStyle={styles.btnStyle}
          text={'Kirim'}
        />
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {
    putUserData: state.putUserData,
    alert: state.alert,
    getUserData: state.getUserData,
  };
};
export default connect(mapStateToProps)(FormData);

const styles = StyleSheet.create({
  title: {
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginBottom: 5,
    color: color.text,
    fontSize: 12,
  },
  textInput: {
    fontFamily: 'Poppins-Regular',
    paddingHorizontal: 8,
    alignSelf: 'stretch',
    padding: 2,
    marginHorizontal: 16,
    borderColor: color.text,
    borderWidth: 1,
    backgroundColor: color.white,
    borderRadius: 8,
  },
  btnStyle: {
    marginBottom: 50,
    marginHorizontal: 16,
  },
});
