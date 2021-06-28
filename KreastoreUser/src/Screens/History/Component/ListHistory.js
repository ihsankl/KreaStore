import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {ParsedDate} from '../../../Utils/ParseDate';
import Feather from 'react-native-vector-icons/Feather';

export default function ListHistory(props) {
  return (
    <View>
      <FlatList
        data={props.data}
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
}
