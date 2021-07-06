import React, { useEffect, useState } from 'react';
import DataProfile from './Component/DataProfile';
import { Text, TouchableOpacity, View, Alert, Modal, StyleSheet, Pressable } from 'react-native';
import { color } from '../../Theme/Color';
import { connect } from 'react-redux'
import { getUserData, updateUser } from '../../Redux/Action/userData';
import { setAlert } from '../../Redux/Action/alert';

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

  useEffect(() => {
    setDataOld(props.getUserData.data)
    setData(props.getUserData.data)
    return () => {

    }
  }, [props.getUserData])

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
        await dispatch(updateUser(props.getUserData.data?.id, data))
        await dispatch(getUserData(props.getUserData.data?.id))
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      await dispatch(setAlert({ ...props.alert, isLoading: false }))
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
        {...props}
      />
    </View>
  );
}

const mapStateToProps = state => {
  return {
    putUserData: state.putUserData,
    alert: state.alert,
    getUserData: state.getUserData,
  }
}

export default connect(mapStateToProps)(Index);

const styles = StyleSheet.create({

});