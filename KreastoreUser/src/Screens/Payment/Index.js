import React from 'react';
import {View} from 'react-native';
import Method from '../TopUp/Component/Method';

const Right = () => {
  return <View></View>;
};

export default function Index() {
  return (
    <View style={{backgroundColor: '#F0FFFE', flex: 1}}>
      <Method label={'Pilih Metode Pembayaran'} right={Right()} />
    </View>
  );
}
