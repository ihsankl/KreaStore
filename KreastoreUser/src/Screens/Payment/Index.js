import React from 'react';
import {View} from 'react-native';
import { color } from '../../Theme/Color';
import Method from '../TopUp/Component/Method';

const Right = () => {
  return <View></View>;
};

export default function Index() {
  return (
    <View style={{backgroundColor: color.accent3, flex: 1}}>
      <Method label={'Pilih Metode Pembayaran'} right={Right()} />
    </View>
  );
}
