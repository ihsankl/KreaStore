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
  console.log({data});

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
      <View style={{margin: 10, width: '100%'}}>
        <Text style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>
          {data.item}
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginLeft: 20}}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row', width: 200}}>
            <View>
              <Text>Konten Tidak Senonoh</Text>
            </View>
            <View style={{marginLeft: 'auto'}}>
              <Text>{data.reportIndecent}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', width: 200, marginTop: 10}}>
            <View>
              <Text>Konten Tidak Sesuai</Text>
            </View>
            <View style={{marginLeft: 'auto'}}>
              <Text>{data.reportInappropriate}</Text>
            </View>
          </View>
        </View>
        <View style={{marginLeft: 20}}>
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
      <ScrollView style={{marginTop: 30, marginBottom: 300}}>
        <RenderItems data={data?.[keys[0]]} />
      </ScrollView>
    </View>
  );
}
