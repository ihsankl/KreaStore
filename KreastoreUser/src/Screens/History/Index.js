import React from 'react';
import {View} from 'react-native';
import ListHistory from './Component/ListHistory';

const dummy = [
  {
    day: 'Minggu',
    date: '2021-06-20',
    total: '300000',
    time: '14.00',
    type: 'Donasi',
    description: 'Donasi Kantong Ajaib',
    id:'abc'
  },
  {
    day: 'Senin',
    date: '2021-06-21',
    total: '350000',
    time: '12.00',
    type: 'Topup',
    description: 'Top Up KreaPoin',
    id:'abcd'
  },
  {
    day: 'Rabu',
    date: '2021-06-23',
    total: '10000',
    time: '14.00',
    type: 'Donasi',
    description: 'Donasi Pemotong Bawang',
    id:'abce'
  },
];
const Index = () => {
  return (
    <View style={{backgroundColor: '#F0FFFE', flex: 1}}>
      <ListHistory data={dummy} />
    </View>
  );
};

export default Index;
