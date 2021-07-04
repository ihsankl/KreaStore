import React from 'react';
import {View, Text} from 'react-native';
import { color } from '../../Theme/Color';
import Method from './Component/Method';

const Right = () => {
  return <View></View>;
};

export default function Index() {
  return (
    <View style={{backgroundColor: color.accent3, flex: 1}}>
      <Method label={'Isi Saldo'} right={Right()} />
    </View>
  );
}
