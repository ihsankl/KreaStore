import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import ReadMore from 'react-native-read-more-text';

import Header from '../../Components/Header';
import {color} from '../../Theme/Color';

const data = [
  {
    id: 1,
    image: 'https://i.imgur.com/UYiroysl.jpg',
    tittle: 'Berita Terkini',
    konten:
      'In mollit nulla voluptate laboris reprehenderit. Commodo reprehenderit sint proident proident duis duis laboris ad aliquip ad dolor. Laborum cupidatat adipisicing in magna est non excepteur elit sunt dolore nisi. Occaecat elit consectetur ea laboris elit magna officia magna ipsum do nisi enim qui. Ea laborum pariatur velit incididunt veniam nisi tempor enim ad commodo.',
    creator: 'Vildan',
    date: '2021-06-20',
    comment: [
      {
        id_user: 1,
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        user_name: 'Ihsan',
        comment: 'hello',
        isDeleted: false,
      },
      {
        id_user: 2,
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        user_name: 'Alghi',
        comment: 'nihao',
        isDeleted: false,
      },
      {
        id_user: 3,
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        user_name: 'Vildan',
        comment: 'Hallo',
        isDeleted: false,
      },
    ],
  },
  {
    id: 2,
    image: 'https://i.imgur.com/2nCt3Sbl.jpg',
    tittle: 'Berita Terkini',
    konten:
      'In mollit nulla voluptate laboris reprehenderit. Commodo reprehenderit sint proident proident duis duis laboris ad aliquip ad dolor. Laborum cupidatat adipisicing in magna est non excepteur elit sunt dolore nisi. Occaecat elit consectetur ea laboris elit magna officia magna ipsum do nisi enim qui. Ea laborum pariatur velit incididunt veniam nisi tempor enim ad commodo.',
    creator: 'Vildan',
    date: '2021-06-20',
    comment: [
      {
        id_user: 1,
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        user_name: 'Ihsan',
        comment: 'hello',
        isDeleted: false,
      },
      {
        id_user: 2,
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        user_name: 'Alghi',
        comment: 'nihao',
        isDeleted: false,
      },
      {
        id_user: 3,
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        user_name: 'Vildan',
        comment: 'Hallo',
        isDeleted: false,
      },
    ],
  },
  {
    id: 3,
    image: 'https://i.imgur.com/2nCt3Sbl.jpg',
    tittle: 'Berita Terkini',
    konten:
      'In mollit nulla voluptate laboris reprehenderit. Commodo reprehenderit sint proident proident duis duis laboris ad aliquip ad dolor. Laborum cupidatat adipisicing in magna est non excepteur elit sunt dolore nisi. Occaecat elit consectetur ea laboris elit magna officia magna ipsum do nisi enim qui. Ea laborum pariatur velit incididunt veniam nisi tempor enim ad commodo.',
    creator: 'Vildan',
    date: '2021-06-20',
    comment: [
      {
        id_user: 1,
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        user_name: 'Ihsan',
        comment: 'hello',
        isDeleted: false,
      },
      {
        id_user: 2,
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        user_name: 'Alghi',
        comment: 'nihao',
        isDeleted: false,
      },
      {
        id_user: 3,
        image: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        user_name: 'Vildan',
        comment: 'Hallo',
        isDeleted: false,
      },
    ],
  },
];

const Index = props => {
  const renderList = ({item}) => {
    return (
      <TouchableOpacity
        style={{width: '100%'}}
        key={item.id}
        onPress={() => props.navigation.navigate('News Detail')}>
        <View style={styles.card}>
          <Text style={{textAlign: 'center', marginBottom: 10}}>
            {item.tittle}
          </Text>
          <ReadMore
            numberOfLines={2}
            // renderTruncatedFooter={_renderTruncatedFooter}
            // renderRevealedFooter={_renderRevealedFooter}
            // onReady={_handleTextReady}
          >
            <Text>{item.konten}</Text>
          </ReadMore>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Berita'} noArrow right={<></>} />
      <View style={styles.containerList}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={renderList}
        />
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  containerList: {
    padding: 16,
    backgroundColor: color.accent3,
    flex: 1,
    borderRadius: 5,
    elevation: 5,
  },
  card: {
    width: '95%',
    height: 100,
    backgroundColor: color.white,
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    margin: 5,
  },
});
