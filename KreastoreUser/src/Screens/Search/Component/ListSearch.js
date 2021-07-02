import React from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ListSearch(props) {
  const {data, onChange, value} = props;
  return (
    <View style={{backgroundColor: '#F0FFFE', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          margin: 10,
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <FontAwesome
          name="search"
          size={20}
          color="gray"
          style={{
            padding: 5,
            marginLeft: 5,
          }}
        />
        <TextInput
          style={{
            flex: 1,
            paddingTop: 5,
            paddingRight: 5,
            paddingBottom: 5,
            paddingLeft: 0,
            marginLeft: 5,
          }}
          onSubmitEditing={e => onChange(e.nativeEvent.text, 'search')}
          clearButtonMode="always"
          onChangeText={e => onChange(e)}
          value={value}
          placeholder="Cari ..."
        />
      </View>
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#38B6FF',
            padding: 5,
            marginLeft: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Teknologi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#38B6FF',
            padding: 5,
            marginLeft: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Rumah Tangga</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#38B6FF',
            padding: 5,
            marginLeft: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Buku</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={data}
          // keyExtractor={user => user.user_id}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  backgroundColor: 'white',
                  padding: 10,
                  elevation: 5,
                  borderRadius: 10,
                }}>
                <Image
                  style={{
                    width: 100,
                    height: 70,
                    borderRadius: 5,
                    padding: 10,
                  }}
                  source={{
                    uri: item.pictureUrl,
                  }}
                />
                <View style={{justifyContent: 'center', margin: 10}}>
                  <Text style={{fontSize: 20, color: '#ABDA40'}}>
                    {item.title}
                  </Text>
                  <Text style={{fontSize: 10, color: '#5E5E5E'}}>
                    {item.desciption}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
}
