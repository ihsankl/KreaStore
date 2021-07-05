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
} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../../Components/Header';
import KreaButton from '../../../Components/KreaButton';
import { color } from '../../../Theme/Color';
import { ParsedDate } from '../../../Utils/ParseDate';

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
    color: 'white',
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

export default function DataProfile(props) {
  const {
    flagEdit,
    changeFlag,
    data,
    onChange,
    save,
    modalVisible,
    setModalVisible,
    right,
  } = props;

  return (
    <>
      <Header title={'Profil Pengguna'} right={right()} />
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={{ height: 250 }}>
          <TouchableOpacity
            onPress={() => null}
            disabled={flagEdit ? false : true}>
            <Image
              style={{
                backgroundColor: 'grey',
                width: 150,
                height: 150,
                borderRadius: 100,
                alignSelf: 'center',
                marginTop: 30,
              }}
              source={{
                uri: data.pictureUrl,
              }}
            />
            {flagEdit ? (
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
            ) : null}
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={styles.title}>
            Nama Lengkap
          </Text>
          <TextInput
            style={styles.textInput}
            value={data.name}
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
            value={data.email}
            editable={flagEdit}
            onChangeText={e => {
              onChange({ email: e });
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={styles.title}>
            Tanggal Lahir
          </Text>
          <TextInput
            style={styles.textInput}
            value={ParsedDate(data.birthday)}
            editable={flagEdit}
            onChangeText={e => {
              onChange({ birthday: e });
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
            value={data.bio}
            editable={flagEdit}
            onChangeText={e => {
              onChange({ bio: e });
            }}
          />
        </View>
        <KreaButton text="Logout" btnStyle={{marginHorizontal:16, marginVertical:16}} btnColor={color.red} />
        <View
          style={{
            marginTop: 50,
            backgroundColor: 'gray',
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 10,
          }}>
          <Text
            style={{
              alignSelf: 'stretch',
              padding: 10,
              color: 'white',
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
              backgroundColor: '#38B6FF',
              borderRadius: 10,
              marginHorizontal:16,
            }}>
            <KreaButton text="Simpan" onPress={() => { changeFlag(false); save('save'); }} />
          </View>
        )}
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