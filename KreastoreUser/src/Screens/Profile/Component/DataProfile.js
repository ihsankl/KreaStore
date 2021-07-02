import React, {useState} from 'react';
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
import Entypo from 'react-native-vector-icons/Entypo';
import {ParsedDate} from '../../../Utils/ParseDate';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    opacity: 100,
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
  } = props;

  return (
    <ScrollView style={{backgroundColor: '#F0FFFE', flex: 1}}>
      <View style={{height: 250}}>
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
            <Entypo
              name="camera"
              style={{
                color: 'black',
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
          style={{
            alignSelf: 'stretch',
            marginLeft: 30,
            marginRight: 30,
            color: 'gray',
            fontSize: 10,
          }}>
          Nama Lengkap
        </Text>
        <TextInput
          style={{
            alignSelf: 'stretch',
            padding: 2,
            marginLeft: 30,
            borderBottomColor: '#000',
            marginRight: 30,
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
          }}
          value={data.name}
          editable={false}
        />
      </View>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            alignSelf: 'stretch',
            marginLeft: 30,
            marginRight: 30,
            color: 'gray',
            fontSize: 10,
          }}>
          Email
        </Text>
        <TextInput
          style={{
            alignSelf: 'stretch',
            padding: 2,
            marginLeft: 30,
            borderBottomColor: '#000',
            marginRight: 30,
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
          }}
          value={data.email}
          editable={flagEdit}
          onChangeText={e => {
            onChange({email: e});
          }}
        />
      </View>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            alignSelf: 'stretch',
            marginLeft: 30,
            marginRight: 30,
            color: 'gray',
            fontSize: 10,
          }}>
          Tanggal Lahir
        </Text>
        <TextInput
          style={{
            alignSelf: 'stretch',
            padding: 2,
            marginLeft: 30,
            borderBottomColor: '#000',
            marginRight: 30,
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
          }}
          value={ParsedDate(data.birthday)}
          editable={flagEdit}
          onChangeText={e => {
            onChange({birthday: e});
          }}
        />
      </View>
      <View style={{marginTop: 20}}>
        <Text
          style={{
            alignSelf: 'stretch',
            marginLeft: 30,
            marginRight: 30,
            color: 'gray',
            fontSize: 10,
          }}>
          Bio Singkat
        </Text>
        <TextInput
          style={{
            alignSelf: 'stretch',
            padding: 2,
            marginLeft: 30,
            borderBottomColor: '#000',
            marginRight: 30,
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
          }}
          multiline={true}
          numberOfLines={4}
          value={data.bio}
          editable={flagEdit}
          onChangeText={e => {
            onChange({bio: e});
          }}
        />
      </View>
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

      {flagEdit ? (
        <View
          style={{
            marginTop: 50,
            marginBottom: 30,
            backgroundColor: '#38B6FF',
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              changeFlag(false);
              save('save');
            }}>
            <Text
              style={{
                alignSelf: 'stretch',
                padding: 10,
                color: 'white',
                alignSelf: 'center',
              }}>
              Simpan
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
            <Text style={styles.modalText}>Kamu yakin batal ubah profil ?</Text>
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
  );
}
