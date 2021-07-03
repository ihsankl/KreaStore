import React from 'react';
import {View, Text} from 'react-native';
import Method from './Component/Method';

const Right = () => {
  return <View></View>;
};

export default function Index() {
  return (
    <View style={{backgroundColor: '#F0FFFE', flex: 1}}>
      <Method label={'Isi Saldo'} right={Right()} />
    </View>
  );
}
