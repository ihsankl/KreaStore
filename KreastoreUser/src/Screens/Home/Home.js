import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const postRef = firestore().collection('post');

const Home = props => {
  const [data, setData] = useState([]);

  console.log('props', {props});
  useEffect(() => {
    onInit();
    return () => {};
  }, []);

  const onInit = async () => {
    try {
      const data = [];
      const x = await postRef.get();
      x.forEach(docs => {
        let currentId = docs.id;
        let appObj = {...docs.data(), ['id']: currentId};
        data.push(appObj);
        setData(data);
      });
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      {data.map((v, i) => {
        return <Text>{v?.title}</Text>;
      })}
      <TouchableOpacity>
        <Button
          title="Go to History"
          onPress={() => props.navigation.navigate('History')}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Button
          title="Detail"
          onPress={() => props.navigation.navigate('Detail')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
