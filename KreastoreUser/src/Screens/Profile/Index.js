import React, {useState} from 'react';
import DataProfile from './Component/DataProfile';

const dummy = {
  name: 'Alghifari Fikri',
  email: 'alghi7733@gmail.com',
  birthday: '1997-12-26',
  bio: 'Saya adalah seorang fullstack developer yang membutuhkan dana untuk membuat startup',
  pictureUrl:
    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
};
export default function Index(props) {
  const {flagEdit, changeFlag, modalVisible, setModalVisible} = props;
  const [dataOld, setDataOld] = useState(dummy);
  const [data, setData] = useState(dummy);

  const changeHandler = e => {
    const temp = {...data, ...e};
    console.log({temp, e});
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
    <>
      <DataProfile
        flagEdit={flagEdit}
        changeFlag={changeFlag}
        data={data}
        onChange={e => changeHandler(e)}
        save={e => onSave(e)}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}
