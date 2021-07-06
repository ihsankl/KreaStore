import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import KreaButton from '../../Component/KreaButton';
import Entypo from 'react-native-vector-icons/Entypo';
import {color} from '../../../Theme/Color';

export default function Detail({data, keys = [], back = () => {}}) {
  const RenderItems = ({data}) => {
    return data.map((e, index) => {
      return (
        <>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 10,
              marginHorizontal: 8,
              padding: 8,
              elevation: 5,
              borderRadius: 8,
            }}>
            <View
              style={{
                paddingHorizontal: 16,
                backgroundColor: 'white',
                flexDirection: 'column',
              }}>
              <View style={{paddingTop: 15}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {e.username}
                </Text>
              </View>
              <View style={{paddingBottom: 15}}>
                <Text>{e.reported}</Text>
              </View>
            </View>
          </View>
        </>
      );
    });
  };
  return (
    <View style={{height: '100%', flexDirection: 'column'}}>
      <View>
        <View>
          <ImageBackground
            style={{
              width: '100%',
              height: 200,
            }}
            source={{uri: data.pictureUrl}}>
            <TouchableOpacity
              onPress={() => {
                back();
              }}>
              <Entypo
                name="back"
                style={{
                  color: color.text,
                  marginLeft: 10,
                  marginTop: 10,
                  fontSize: 25,
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <ScrollView style={{height: '100%'}}>
          <View style={{margin: 10, width: '100%'}}>
            <Text
              style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
              {data.judul}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginBottom: 20,
            }}>
            <View style={{marginLeft: 'auto', marginRight: 20}}>
              <Text>Posted By {data.nama}</Text>
            </View>
          </View>
          <View style={{width: '100%'}}>
            <Text style={{textAlign: 'center'}}>
              {data.thread.slice(0, 170)}
            </Text>
          </View>
          <ScrollView style={{marginTop: 20, height: 270}}>
            <RenderItems data={data?.[keys[0]]} />
          </ScrollView>
        </ScrollView>
      </View>
      <View style={{marginTop: 'auto'}}>
        <KreaButton
          btnColor={'red'}
          textStyle={{color: 'white'}}
          onPress={() => {
            console.log('banned');
          }}
          text={'Banned'}
        />
      </View>
    </View>
  );
}
