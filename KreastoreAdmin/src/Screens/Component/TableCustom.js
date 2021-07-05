import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Button, FlatList } from 'react-native';
 
function TableCustom({tableHead, tableData, detail=()=>{}}) {

    return (
      <View>
        <FlatList
          data={tableHead}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row', padding: 10, backgroundColor: '#ABDA40', margin: 20, borderRadius: 10}}>
                <View style={{flex: 1}}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{item.row1}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{item.row2}</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{item.row3}</Text>
                </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
        <FlatList
          data={tableData}
          renderItem={({item}) => (
              <TouchableOpacity onPress={() => detail(item.id)}>
                <View style={{flexDirection: 'row', padding: 10, backgroundColor: '#F7FFD8', marginLeft: 20, marginRight: 20, borderRadius: 10}}>
                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center'}}>{item.nama}</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text>{item.item.substring(0, 10)}</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'center'}}>{item.total}</Text>
                  </View>
              </View>
              </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }

  export default TableCustom;
 