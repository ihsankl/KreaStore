import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Header from '../../../Components/Header';
import KreaButton from '../../../Components/KreaButton';
import { color } from '../../../Theme/Color';
import { ParsedDate } from '../../../Utils/ParseDate';
import { inputUserData, getUserData } from '../../../Redux/Action/userData';
import { setAlert } from '../../../Redux/Action/alert';

import { connect } from 'react-redux'
import auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-datepicker';
import { launchImageLibrary } from 'react-native-image-picker';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.grey,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonYes: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 70,
    backgroundColor: '#2196F3',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 70,
    backgroundColor: 'red',
    marginLeft: 'auto',
  },
  textStyle: {
    color: color.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalText2: {
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  title: {
    alignSelf: 'stretch',
    marginHorizontal: 16,
    color: color.text,
    fontSize: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 2,
    marginHorizontal: 16,
    borderBottomColor: color.text,
    borderBottomColor: color.grey,
    borderBottomWidth: 1,
    fontFamily: 'Poppins-Regular'
  }
});

function DataProfile({
  data,
  onChange,
  save,
  modalVisible,
  setModalVisible,
  right,
  navigation,
  dispatch,
  changeFlag,
  flagEdit,
  ...props
}) {

  const onSignOut = async () => {
    try {
      await dispatch(setAlert({ ...props.alert, isLoading: true }))
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut()
      await dispatch(inputUserData({data:null}))
      await dispatch(getUserData(''))
    } catch (error) {
      console.log(error.message)
    } finally {
      await dispatch(setAlert({ ...props.alert, isLoading: false }))
    }
  }

  const handleChoosePhoto = () => {
    // ambil dari galery
    launchImageLibrary({ noData: true }, response => {
      console.log('respon', { response });
      if (response.didCancel === true) {
        setPhoto(null);
      } else {
        onChange({photo:response?.assets?.[0]?.uri})
      }
    });

    // ambil dari camera langsung
    // launchCamera({noData: true}, response => {
    //   console.log({response});
    //   if (response.didCancel === true) {
    //     setPhoto(null);
    //   } else {
    //     setPhoto(response);
    //   }
    // });
  };

  return (
    <>
      <Header title={'Profil Pengguna'} right={right()} />
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={{ height: 250 }}>
          <TouchableOpacity
            onPress={handleChoosePhoto}
            disabled={flagEdit ? false : true}>
            <Image
              style={{
                backgroundColor: color.grey,
                width: 150,
                height: 150,
                borderRadius: 100,
                alignSelf: 'center',
                marginTop: 30,
              }}
              source={{
                uri: data?.photo,
              }}
            />
            {flagEdit && (
              <Feather
                name="camera"
                style={{
                  color: color.text,
                  alignSelf: 'center',
                  marginLeft: 90,
                  marginTop: -40,
                  fontSize: 25,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={styles.title}>
            Nama Lengkap
          </Text>
          <TextInput
            style={styles.textInput}
            value={data?.name}
            editable={false}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={styles.title}>
            Email
          </Text>
          <TextInput
            style={styles.textInput}
            value={data?.email}
            editable={false}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={styles.title}>
            Tanggal Lahir
          </Text>
          <DatePicker
            disabled={!flagEdit}
            style={[styles.textInput, { width: (Dimensions.get('window').width) - 32 }]}
            date={data?.birthday}
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
              onChange({ birthday: date });
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={styles.title}>
            Bio Singkat
          </Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={4}
            value={data?.bio}
            editable={flagEdit}
            onChangeText={e => {
              onChange({ bio: e });
            }}
          />
        </View>

        <View
          style={{
            marginTop: 50,
            backgroundColor: color.grey,
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 10,
          }}>
          <Text
            style={{
              alignSelf: 'stretch',
              padding: 10,
              color: color.white,
              fontSize: 12,
            }}>
            Informasi berikut hanya dapat dilihat oleh kamu dan tidak akan kami
            publikasikan
          </Text>
        </View>

        {flagEdit && (
          <View
            style={{
              marginTop: 50,
              marginBottom: 30,
              backgroundColor: color.primary,
              borderRadius: 10,
              marginHorizontal: 16,
            }}>
            <KreaButton text="Simpan" onPress={() => { changeFlag(false); save('save'); }} />
          </View>
        )}
        <KreaButton text="Keluar" onPress={onSignOut} btnStyle={{ marginHorizontal: 16, marginVertical: 16 }} btnColor={color.red} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Kamu yakin batal ubah profil ?
              </Text>
              <Text style={styles.modalText2}>
                Data yang telah kamu ubah tidak akan kami simpan
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: 200,
                }}>
                <View style={[styles.buttonYes]}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      save('cancel');
                      changeFlag(false);
                    }}>
                    <Text style={styles.textStyle}>Ya</Text>
                  </TouchableOpacity>
                </View>
                <View style={[styles.buttonClose]}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>Tidak</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
}

const mapStateToProps = state => {
  return {
    putUserData: state.putUserData,
    alert: state.alert,
    getUserData: state.getUserData,
  }
}

export default connect(mapStateToProps)(DataProfile);