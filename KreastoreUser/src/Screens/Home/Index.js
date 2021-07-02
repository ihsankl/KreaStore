import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const postRef = firestore().collection('post');

const Index = ({...props}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // onInit();
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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      {data.map((v, i) => {
        return <Text key={i}>{v?.title}</Text>;
      })}
      <TouchableOpacity>
        <Button
          title="Go to History"
          onPress={() => props.navigation.navigate('History')}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Button
          title="Go to Profile"
          onPress={() => props.navigation.navigate('Profile')}
        />
        <Button
          title="Detail"
          onPress={() => props.navigation.navigate('Detail')}
        />
        <Button
          title="Search"
          onPress={() => props.navigation.navigate('Search')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
