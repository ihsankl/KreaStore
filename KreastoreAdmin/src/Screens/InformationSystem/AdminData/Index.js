import React from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import KreaButton from '../../Component/KreaButton';
import News from '../Component/News';

export default function Index() {
  const [thread, setThread] = useState(false);
  const [hide, setHide] = useState(false);
  console.log({hide, thread});
  return (
    <>
      {hide && thread ? (
        <News
          back={() => {
            setThread(false);
            setHide(false);
          }}
        />
      ) : (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#F0FFFE',
            flex: 1,
          }}>
          <View style={{margin: 30}}>
            <Text style={{textAlign: 'center'}}>
              Selamat Datang di Laman Information System
            </Text>
          </View>
          <View style={{margin: 30}}>
            <KreaButton
              textStyle={{color: 'white'}}
              onPress={() => {
                setThread(true);
                setHide(true);
              }}
              text={'Thread News'}
            />
          </View>
        </View>
      )}
    </>
  );
}
