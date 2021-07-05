import React from 'react';
import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import KreaButton from '../../../Components/KreaButton';
import SearchInput from '../../../Components/SearchInput';
import { color } from '../../../Theme/Color';

export default function ListSearch(props) {
  const { data, onChange, value } = props;
  return (
    <View style={{ backgroundColor: color.accent3, flex: 1, marginHorizontal: 8 }}>
      <View style={{ marginHorizontal: 8 }}>
        <SearchInput onChangeText={onChange} onSubmitEditing={onChange} placeholder='Cari . . .' value={value} />
      </View>
      <View style={{ flexDirection: 'row', marginVertical: 16, marginHorizontal: 8 }}>
        <KreaButton btnStyle={{ marginRight: 8 }} text='Teknologi' />
        <KreaButton btnStyle={{ marginRight: 8 }} text='Rumah Tangga' />
        <KreaButton btnStyle={{ marginRight: 8 }} text='Buku' />
      </View>
      <ScrollView>
        <RenderItems data={data} />
      </ScrollView>
    </View>
  );
}

const RenderItems = ({ data }) => {
  return data.map((item, index) => {
    return (
      <TouchableOpacity key={index}>
        <View
          style={styles.container}>
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
          <View style={{ justifyContent: 'center', margin: 10 }}>
            <Text style={{ fontSize: 20, color: color.secondary }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 10, color: color.text }}>
              {item.desciption}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  })
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 8,
    backgroundColor: color.white,
    padding: 8,
    elevation: 5,
    borderRadius: 8,
  }
})