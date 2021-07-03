import React, {useState} from 'react';
import DataProfile from './Component/DataProfile';
import {Text, TouchableOpacity, View} from 'react-native';

const dummy = {
  name: 'Alghifari Fikri',
  email: 'alghi7733@gmail.com',
  birthday: '1997-12-26',
  bio: 'Saya adalah seorang fullstack developer yang membutuhkan dana untuk membuat startup',
  pictureUrl:
    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
};
export default function Index(props) {
  const [dataOld, setDataOld] = useState(dummy);
  const [data, setData] = useState(dummy);
  const [edit, setEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
    const temp = {...data, ...e};
    setData(temp);
  };

  const onSave = e => {
    if (e === 'cancel') {
      setData(dataOld);
    } else {
      setData(data);
    }
  };

  return (
    <View style={{backgroundColor: '#F0FFFE', flex: 1}}>
      <DataProfile
        flagEdit={edit}
        changeFlag={e => setEdit(e)}
        data={data}
        onChange={e => changeHandler(e)}
        save={e => onSave(e)}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        right={right()}
      />
    </View>
  );
}
