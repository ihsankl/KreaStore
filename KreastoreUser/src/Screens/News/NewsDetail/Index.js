import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Input,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

import {color} from '../../../Theme/Color';
import KreaButton from '../../../Components/KreaButton';

const data = {
  id: 1,
  tittle:
    'Cupidatat culpa excepteur irure non exercitation ipsum consectetur qui ad laborum deserunt.',
  creator: 'Vildan',
  isBanned: false,
  image: 'https://i.imgur.com/2nCt3Sbl.jpg',
  content:
    'Nulla Lorem dolor ipsum occaecat amet laboris. Magna consequat consequat laborum aute excepteur cupidatat voluptate et. Duis laborum enim consectetur fugiat occaecat elit excepteur sint culpa laborum ullamco ad. Cillum sint veniam non ex nulla id.',
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
};

const users = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
];

const Index = props => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Ionic
          name="chevron-back-outline"
          style={styles.back}
          onPress={() => props.navigation.navigate('Home')}
        />
        <Image style={styles.image} source={{uri: data.image}} />
        <View style={styles.containerContent}>
          <Text style={styles.tittle}>{data.tittle}</Text>
          <Text style={styles.creator}>Publish by {data.creator}</Text>
          <Text style={styles.content}>{data.content}</Text>
          <KreaButton
            btnStyle={{btnColor: color.red}}
            text={'Report'}
            // onPress={() => setModal(!modal)}
          />
        </View>
        <View style={styles.hr} />
        <View style={styles.containerComment}>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>Comment :</Text>
          <Input />
          {data.comment.map(item => (
            <View style={styles.card} key={item.id}>
              <Image style={styles.imgUser} source={{uri: item.image}} />
              <Text style={{fontSize: 16}}>{item.user_name}</Text>
              <Text style={{fontSize: 16, paddingLeft: 20}}>
                {item.comment}
              </Text>
            </View>
          ))}
          {/* <FlatList
            scrollEnabled={true}
            data={data.comment}
            keyExtractor={item => item.id_user}
            renderItem={renderComment}
            showsVerticalScrollIndicator={false}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  back: {
    fontSize: 25,
    position: 'absolute',
    top: 0,
    zIndex: 99999,
    margin: 10,
    color: color.white,
  },
  image: {
    width: '100%',
    height: 200,
  },
  container: {
    display: 'flex',
  },
  containerContent: {
    padding: 16,
  },
  tittle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  creator: {
    textAlign: 'right',
    margin: 10,
  },
  content: {
    textAlign: 'justify',
    fontSize: 16,
  },
  hr: {
    borderWidth: 1,
    borderColor: color.grey,
    marginBottom: 10,
  },
  containerComment: {
    padding: 16,
    minHeight: 300,
    flex: 1,
  },
  card: {
    width: '90%',
    padding: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
});
