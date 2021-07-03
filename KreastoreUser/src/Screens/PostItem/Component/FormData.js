import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  DatePickerAndroid,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import KreaButton from '../../../Components/KreaButton';
import Entypo from 'react-native-vector-icons/Entypo';
import {category} from '../../../Utils/Data';
import DatePicker from 'react-native-datepicker';
import {Formatter} from '../../../Utils/Formatter';

export default function FormData({
  data,
  handleChoosePhoto = () => {},
  onChange = () => {},
}) {
  console.log('data', {data});
  return (
    <ScrollView style={{marginTop: 10}}>
      <View style={{marginBottom: 30}}>
        <Text
          style={{
            alignSelf: 'stretch',
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 5,
            color: 'gray',
            fontSize: 12,
          }}>
          Nama Produk
        </Text>
        <TextInput
          style={{
            alignSelf: 'stretch',
            padding: 2,
            marginLeft: 30,
            marginRight: 30,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
          }}
          onChangeText={e => {
            onChange({namaProduk: e});
          }}
          value={data.namaProduk}
          // editable={false}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <Text
          style={{
            alignSelf: 'stretch',
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 5,
            color: 'gray',
            fontSize: 12,
          }}>
          Pilih Kategori
        </Text>
        <View
          style={{
            alignSelf: 'stretch',
            marginLeft: 30,
            marginRight: 30,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
          }}>
          <Picker
            selectedValue={data.kategori}
            onValueChange={(itemValue, itemIndex) => {
              onChange({kategori: itemValue});
            }}>
            <Picker.Item label="-- Pilih Kategori --" value="" />
            <Picker.Item label="Comics" value="Comics" />
            <Picker.Item label="Craft" value="Craft" />
            <Picker.Item label="Dance" value="Dance" />
            <Picker.Item label="Design" value="Design" />
            <Picker.Item label="Fashion" value="Fashion" />
            <Picker.Item label="Film & Video" value="Film & Video" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Games" value="Games" />
            <Picker.Item label="Journalism" value="Journalism" />
            <Picker.Item label="Music" value="Music" />
            <Picker.Item label="Photography" value="Photography" />
            <Picker.Item label="Publishing" value="Publishing" />
            <Picker.Item label="Technology" value="Technology" />
            <Picker.Item label="Theater" value="Theater" />
          </Picker>
        </View>
      </View>
      <View style={{marginBottom: 30}}>
        <Text
          style={{
            alignSelf: 'stretch',
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 5,
            color: 'gray',
            fontSize: 12,
          }}>
          Deskripsi
        </Text>
        <TextInput
          style={{
            alignSelf: 'stretch',
            padding: 2,
            marginLeft: 30,
            marginRight: 30,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
          }}
          multiline={true}
          numberOfLines={4}
          value={data.deskripsi}
          onChangeText={e => {
            onChange({deskripsi: e});
          }}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <Text
          style={{
            alignSelf: 'stretch',
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 5,
            color: 'gray',
            fontSize: 12,
          }}>
          Foto Produk
        </Text>
        {data.photoUrl ? (
          <Image
            source={{uri: data.photoUrl}}
            style={{
              width: 300,
              height: 300,
              margin: '1%',
              alignSelf: 'stretch',
              padding: 2,
              marginLeft: 30,
              marginRight: 30,
              borderRadius: 5,
            }}
          />
        ) : (
          <TouchableOpacity onPress={handleChoosePhoto}>
            <View
              style={{
                alignSelf: 'stretch',
                padding: 2,
                height: 70,
                marginLeft: 30,
                marginRight: 30,
                borderColor: 'gray',
                borderWidth: 1,
                backgroundColor: '#C4C4C4',
                borderRadius: 5,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  padding: 2,
                  height: 40,
                  marginLeft: 30,
                  marginRight: 30,
                  marginTop: 10,
                  marginBottom: 10,
                  backgroundColor: '#DFDFDF',
                  borderRadius: 5,
                }}>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <View style={{marginRight: 5}}>
                    <Entypo
                      name="camera"
                      style={{
                        color: 'white',
                        fontSize: 20,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: 15,
                      }}>
                      Tambah Foto
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginBottom: 30}}>
        <Text
          style={{
            alignSelf: 'stretch',
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 5,
            color: 'gray',
            fontSize: 12,
          }}>
          Target Dana Terkumpul
        </Text>
        <TextInput
          style={{
            alignSelf: 'stretch',
            padding: 2,
            marginLeft: 30,
            marginRight: 30,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
          }}
          value={data.total ? data.total : ''}
          onChangeText={e => {
            onChange({total: Number(e.replace(/[^0-9]/g, ''))});
          }}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <Text
          style={{
            alignSelf: 'stretch',
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 5,
            color: 'gray',
            fontSize: 12,
          }}>
          Tanggal Akhir Pengumpulan Dana
        </Text>
        <DatePicker
          style={{
            alignSelf: 'stretch',
            padding: 2,
            marginLeft: 30,
            marginRight: 30,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
            width: 300,
          }}
          date={data.tanggalAkhir}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            onChange({tanggalAkhir: date});
          }}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <Text
          style={{
            alignSelf: 'stretch',
            marginLeft: 30,
            marginRight: 30,
            marginBottom: 5,
            color: 'gray',
            fontSize: 12,
          }}>
          Keuntungan Donatur
        </Text>
        <TextInput
          style={{
            alignSelf: 'stretch',
            padding: 2,
            marginLeft: 30,
            marginRight: 30,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
          }}
          multiline={true}
          numberOfLines={4}
          value={data.feedBack}
          onChangeText={e => {
            onChange({feedBack: e});
          }}
        />
      </View>
      <View style={{marginBottom: 30}}>
        <KreaButton
          btnStyle={{
            marginBottom: 30,
            backgroundColor: '#38B6FF',
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 10,
          }}
          text={'Submit'}
        />
      </View>
    </ScrollView>
  );
}
