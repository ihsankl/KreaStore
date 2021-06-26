import React, {useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {ParsedDate} from '../../Utils/ParseDate';

const dummy = [
  {
    day: 'Minggu',
    date: '2021-06-20',
    total: '300000',
    time: '14.00',
    type: 'Donasi',
    description: 'Donasi Kantong Ajaib',
  },
  {
    day: 'Senin',
    date: '2021-06-21',
    total: '350000',
    time: '12.00',
    type: 'Topup',
    description: 'Top Up KreaPoin',
  },
  {
    day: 'Rabu',
    date: '2021-06-23',
    total: '10000',
    time: '14.00',
    type: 'Donasi',
    description: 'Donasi Pemotong Bawang',
  },
];
const Index = () => {
  const [data, setData] = useState(dummy);

  return (
    <View style={{backgroundColor: '#F0FFFE', flex: 1}}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View>
            <View
              style={{
                backgroundColor: '#ABDA3F',
                padding: 15,
                flexDirection: 'row',
              }}>
              <Text style={{color: 'white', fontSize: 16}}>
                {item.day}, {ParsedDate(item.date)}
              </Text>
              <Text style={{color: 'white', fontSize: 16, marginLeft: 'auto'}}>
                {item.type === 'Donasi' ? '-' : '+'} Rp.{' '}
                {String(item.total).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                padding: 12,
                flexDirection: 'row',
              }}>
              <Feather
                name="dollar-sign"
                style={{
                  color: '#DADADA',
                  marginLeft: 20,
                  fontSize: 25,
                  marginTop: 3,
                  marginRight: 2,
                }}
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={{color: '#DADADA', fontSize: 14}}>
                  {item.description}
                </Text>
                <Text style={{color: '#DADADA', fontSize: 12}}>
                  Jam {item.time}
                </Text>
              </View>
              <Text
                style={{color: '#DADADA', fontSize: 16, marginLeft: 'auto'}}>
                {item.type === 'Donasi' ? '-' : '+'} Rp.{' '}
                {String(item.total).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        // ListHeaderComponent={this.renderHeader}
        // onRefresh={() => this.onRefresh()}
        // refreshing={this.state.loading}
      />
    </View>
  );
};

export default Index;
