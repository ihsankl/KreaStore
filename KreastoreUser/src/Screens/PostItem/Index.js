import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import Header from '../../Components/Header';
import FormData from './Component/FormData';
import {launchImageLibrary} from 'react-native-image-picker';

const Right = () => {
  return <View></View>;
};

export default function Index() {
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState({});

  useMemo(() => setBody({}), []);

  const handleChoosePhoto = () => {
    // ambil dari galery
    launchImageLibrary({noData: true}, response => {
      console.log('respon', {response});
      if (response.didCancel === true) {
        setPhoto(null);
      } else {
        const temp = {...body, photoUrl: response?.assets?.[0]?.uri};
        setBody(temp);
        setPhoto(response);
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

  const changeHandler = e => {
    const temp = {...body, ...e};
    setBody(temp);
  };

  return (
    <View style={{backgroundColor: '#F0FFFE', flex: 1}}>
      <Header
        title={'Mulai Penggalangan Dana'}
        right={Right}
        callBack={useCallback(() => {
          setBody({});
        }, [])}
      />
      <FormData
        photo={photo}
        handleChoosePhoto={handleChoosePhoto}
        onChange={e => changeHandler(e)}
        data={body}
      />
    </View>
  );
}
