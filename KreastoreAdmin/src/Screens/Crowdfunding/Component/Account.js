import React from 'react';
import {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {color} from '../../../Theme/Color';
import TableCustom from '../../Component/TableCustom';
import Detail from './Detail';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Account({back}) {
  const [flagDetail, setFlagDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const tableHead = [
    {
      row1: 'Nama',
      row2: 'Email',
      row3: 'Status',
    },
  ];
  const tableData = [
    {
      id: '1',
      index: '1',
      nama: 'Alghi',
      email: 'alghi7733@gmail.com',
      nik: '11222',
      status: 'Pending',
    },
    {
      id: '2',
      index: '2',
      nama: 'Fikri',
      email: 'fikri7733@gmail.com',
      nik: '11222',
      status: 'Verified',
    },
    {
      id: '3',
      index: '3',
      nama: 'Riki',
      email: 'Riki7733@gmail.com',
      nik: '11222',
      status: 'Pending',
    },
    {
      id: '4',
      index: '4',
      nama: 'Hanafi',
      email: 'Hanafi7733@gmail.com',
      nik: '11222',
      status: 'Pending',
    },
    {
      id: '5',
      index: '5',
      nama: 'Uzumaki',
      email: 'Uzumaki7733@gmail.com',
      nik: '11222',
      status: 'Verified',
    },
  ];

  const getDetail = e => {
    const filter = tableData.filter(v => {
      return v.id === e;
    });
    setDataDetail(filter[0]);
    setModalVisible(true);
    console.log({filter});
  };

  return (
    <View style={{backgroundColor: '#F0FFFE', flex: 1}}>
      <View>
        <View style={{margin: 20, flexDirection: 'row'}}>
          <View style={{marginRight: 10}}>
            <TouchableOpacity onPress={() => back()}>
              <Entypo
                name="back"
                style={{
                  color: color.text,
                  fontSize: 25,
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text>Data User</Text>
          </View>
        </View>
        <TableCustom
          tableHead={tableHead}
          tableData={tableData}
          detail={e => getDetail(e)}
          keys={['nama', 'email', 'status']}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Data User Kreastore</Text>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <View>
                <Text>Nama : </Text>
              </View>
              <View>
                <Text>{dataDetail.nama}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <View>
                <Text>Email : </Text>
              </View>
              <View>
                <Text>{dataDetail.email}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <View>
                <Text>NIK : </Text>
              </View>
              <View>
                <Text>{dataDetail.nik}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <View>
                <Text>Status : </Text>
              </View>
              <View>
                <Text>{dataDetail.status}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: 200,
                marginTop: 100,
              }}>
              <View style={[styles.buttonYes]}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setDataDetail({});
                  }}>
                  <Text style={styles.textStyle}>
                    {dataDetail.status === 'Pending' ? 'Verifikasi' : 'Back'}
                  </Text>
                </TouchableOpacity>
              </View>
              {dataDetail.status === 'Pending' ? (
                <View style={[styles.buttonClose]}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setDataDetail({});
                    }}>
                    <Text style={styles.textStyle}>Reject</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
    width: 90,
    backgroundColor: '#2196F3',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 90,
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
    fontFamily: 'Poppins-Regular',
  },
});
