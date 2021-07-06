import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import Header from '../../Components/Header';
import FormData from './Component/FormData';
import { launchImageLibrary } from 'react-native-image-picker';
import { color } from '../../Theme/Color';
import { useEffect } from 'react';
import { connect } from 'react-redux'
import storage from '@react-native-firebase/storage';

const Right = () => {
  return <View></View>;
};

function Index({...props}) {
  const [photo, setPhoto] = useState(null);
  const [userData, setUserData] = useState(null);
  const [body, setBody] = useState({});

  useEffect(() => {
    setUserData(props.getUserData.data)
    return () => {
      
    }
  }, [props.getUserData])

  // POST
  //   - user_id (USER string id)
  //   - status_acc (bool)
  //   - photoUrl (string id)
  //   - funding_goal
  //   - funding_start_date
  //   - funding_end_date
  //   - funder (map => total, user_id) 
  //   - description (string)
  //   - report_status (map/obj => reported (bool), report_acc (bool), reasons (REPORTS string id)
  //   - favorite (map/obj => )
  //   - funding_completed (bool)
  //   - category (string)
  //   - product_name (string)
  //   - feedback


  useMemo(() => setBody({}), []);

  const handleChoosePhoto = () => {
    // ambil dari galery
    launchImageLibrary({ noData: true }, response => {
      console.log('respon', { response });
      if (response.didCancel === true) {
        setPhoto(null);
      } else {
        const temp = { ...body, photoUrl: response?.assets?.[0]?.uri };
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
    const temp = { ...body, ...e };
    setBody(temp);
  };

  return (
    <View style={{ backgroundColor: color.accent3 }}>
      <Header
        title={'Mulai Penggalangan Dana'}
        right={Right()}
        callBack={useCallback(() => {
          setBody({});
        }, [])}
      />
      <FormData
        photo={photo}
        handleChoosePhoto={handleChoosePhoto}
        onChange={e => changeHandler(e)}
        data={body}
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
