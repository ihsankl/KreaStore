import React, { useEffect, useState } from 'react';
import DataProfile from './Component/DataProfile';
import { Text, TouchableOpacity, View, Alert, Modal, StyleSheet, Pressable } from 'react-native';
import { color } from '../../Theme/Color';
import { connect } from 'react-redux'
import storage from '@react-native-firebase/storage';
import { getUserData, inputUserData, updateUser } from '../../Redux/Action/userData';
import { setAlert } from '../../Redux/Action/alert';
const regex = /^.*[\\\/]/

const dummy = {
  name: '-',
  email: '-',
  birthday: '-',
  bio: '-',
  photo:
    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
};

function Index({ navigation, dispatch, ...props }) {
  const [dataOld, setDataOld] = useState(dummy);
  const [data, setData] = useState(dummy);
  const [edit, setEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditPhoto, setisEditPhoto] = useState(false)

  useEffect(() => {
    setDataOld(props.getUserData.data)
    setData(props.getUserData.data)
    return () => {

    }
  }, [props.getUserData])

  useEffect(() => {
    onInit()
    return () => {

    }
  }, [])

  const onInit = async () => {
    try {
      await dispatch(setAlert({ ...props.alert, isLoading: true }))
      await dispatch(getUserData(props.inputUserData?.user?.id))
      // console.log(props.inputUserData.user.id)
      await dispatch(setAlert({ ...props.alert, isLoading: false }))
    } catch (error) {
      console.log(error.message);
      await dispatch(setAlert({ ...props.alert, isLoading: false }))
      await dispatch(setAlert({ ...props.alert, isError: true, msg: error.message, status: "error" }))
    }
  }

  const right = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (edit === false) {
            setEdit(!edit);
          } else {
            setModalVisible(true);
          }
        }}>
        <Text>{edit ? 'Batal' : 'Ubah'}</Text>
      </TouchableOpacity>
    );
  };

  const changeHandler = e => {
    const temp = { ...data, ...e };
    setData(temp);
  };

  const onSave = async (e) => {
    try {
      if (e === 'cancel') {
        setData(dataOld);
      } else {
        await dispatch(setAlert({ ...props.alert, isLoading: true }))
        if (isEditPhoto) {
          const photoToUpload = data.photo.replace(regex, "")
          const reference = storage().ref(photoToUpload);
          await reference.putFile(data.photo);
          const url = await storage().ref(photoToUpload).getDownloadURL();
          const dataToUpload = {
            ...data,
            photo: url,
          }
          await dispatch(updateUser(props.getUserData.data?.id, dataToUpload))
        } else {
          await dispatch(updateUser(props.getUserData.data?.id, data))
        }
        await dispatch(getUserData(props.getUserData.data?.id))
        await dispatch(setAlert({ ...props.alert, isLoading: false }))
        await dispatch(setAlert({ ...props.alert, isSuccess: true, msg: 'Berhasil Update Profile!', status: "Sukses" }))
      }
    } catch (error) {
      console.log(error.message)
      await dispatch(setAlert({ ...props.alert, isLoading: false }))
      await dispatch(setAlert({ ...props.alert, isError: true, msg: error.message, status: "error" }))
    }
  };

  return (
    <View style={{ backgroundColor: color.accent3, flex: 1 }}>
      <DataProfile
        flagEdit={edit}
        changeFlag={e => setEdit(e)}
        data={data}
        onChange={e => changeHandler(e)}
        save={e => onSave(e)}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        right={right}
        isEditPhoto={isEditPhoto}
        setisEditPhoto={setisEditPhoto}
        {...props}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return {
    // inputUserData.user.id
    inputUserData: state.inputUserData,
    alert: state.alert,
    getUserData: state.getUserData,
  }
}

export default connect(mapStateToProps)(Index);

const styles = StyleSheet.create({

});