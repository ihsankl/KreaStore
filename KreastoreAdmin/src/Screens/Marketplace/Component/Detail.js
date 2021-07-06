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

export default function Detail({data, back = () => {}}) {
  console.log({data});

  return (
    <View style={{flexDirection: 'column', height: '100%'}}>
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
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 20,
            marginBottom: 20,
          }}>
          <View style={{marginLeft: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{data.item}</Text>
          </View>
          <View style={{marginLeft: 'auto', marginRight: 20}}>
            <Text>
              Rp. {String(data.harga).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Text>
          </View>
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
          <Text style={{textAlign: 'center'}}>{data.description}</Text>
        </View>
      </View>
      <View style={{marginTop: 'auto'}}>
        <KreaButton
          textStyle={{color: 'white'}}
          btnStyle={{margin: 20}}
          btnColor={'red'}
          onPress={() => {
            console.log('banned');
          }}
          text={'Banned'}
        />
      </View>
    </View>
  );
}
