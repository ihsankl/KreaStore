import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  FlatList,
} from 'react-native';

function TableCustom({tableHead, tableData, detail = () => {}, keys = []}) {
  return (
    <View>
      <FlatList
        data={tableHead}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              backgroundColor: '#ABDA40',
              marginLeft: 20,
              marginRight: 20,
              borderRadius: 10,
            }}>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                {item.row1}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                {item.row2}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                {item.row3}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <ScrollView style={{marginBottom: 230}}>
        <FlatList
          data={tableData}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => detail(item.id)}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  backgroundColor: item.index % 2 === 0 ? '#9AF9FF' : '#F7FFD8',
                  marginLeft: 20,
                  marginRight: 20,
                  borderRadius: 10,
                }}>
                <View style={{flex: 1}}>
                  <Text style={{textAlign: 'center'}}>{item?.[keys[0]]}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text>{item?.[keys[1]].substring(0, 10)}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={{textAlign: 'center'}}>{item?.[keys[2]]}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
}

export default TableCustom;
