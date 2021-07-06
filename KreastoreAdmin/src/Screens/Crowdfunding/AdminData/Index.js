import React from 'react';
import {useState} from 'react';
import {View, Text} from 'react-native';
import KreaButton from '../../Component/KreaButton';
import Thread from '../Component/Thread';
import Account from '../Component/Account';

export default function Index() {
  const [account, setAccount] = useState(false);
  const [thread, setThread] = useState(false);
  const [hide, setHide] = useState(false);

  return (
    <>
      {hide && thread ? (
        <Thread
          back={() => {
            setThread(false);
            setHide(false);
          }}
        />
      ) : hide && account ? (
        <Account
          back={() => {
            setAccount(false);
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
              Selamat Datang di Laman Crowdfunding
            </Text>
          </View>
          <View style={{margin: 30}}>
            <KreaButton
              textStyle={{color: 'white'}}
              onPress={() => {
                setAccount(true);
                setHide(true);
              }}
              text={'Account'}
            />
          </View>
          <View style={{margin: 30}}>
            <KreaButton
              textStyle={{color: 'white'}}
              onPress={() => {
                setThread(true);
                setHide(true);
              }}
              text={'Thread'}
            />
          </View>
        </View>
      )}
    </>
  );
}
