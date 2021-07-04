import React, {useState} from 'react';
import {View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../../Components/Header';
import { color } from '../../Theme/Color';
import ListSearch from './Component/ListSearch';

const dummy = [
  {
    pictureUrl:
      'https://pbs.twimg.com/profile_images/378800000835028198/a3f8de1c80ed0ef8282aef5ade55db74.jpeg',
    title: 'Kantong Ajaib',
    desciption: 'Kantong yang memuat segala hal',
  },
  {
    pictureUrl:
      'https://pbs.twimg.com/profile_images/378800000835028198/a3f8de1c80ed0ef8282aef5ade55db74.jpeg',
    title: 'Pemotong Bawang',
    desciption: 'Kantong yang memuat segala hal',
  },
  {
    pictureUrl:
      'https://pbs.twimg.com/profile_images/378800000835028198/a3f8de1c80ed0ef8282aef5ade55db74.jpeg',
    title: 'Komputer Geming',
    desciption: 'Kantong yang memuat segala hal',
  },
  {
    pictureUrl:
      'https://pbs.twimg.com/profile_images/378800000835028198/a3f8de1c80ed0ef8282aef5ade55db74.jpeg',
    title: 'Pensil Ajaib',
    desciption: 'Kantong yang memuat segala hal',
  },
  {
    pictureUrl:
      'https://pbs.twimg.com/profile_images/378800000835028198/a3f8de1c80ed0ef8282aef5ade55db74.jpeg',
    title: 'Robot',
    desciption: 'Kantong yang memuat segala hal',
  },
  {
    pictureUrl:
      'https://pbs.twimg.com/profile_images/378800000835028198/a3f8de1c80ed0ef8282aef5ade55db74.jpeg',
    title: 'Pendingin Makanan',
    desciption: 'Kantong yang memuat segala hal',
  },
];

export default function Index() {
  const [dataList, setDataList] = useState(dummy);
  const [val, setVal] = useState({});

  const changeHandler = (e, i) => {
    if (i === 'search') {
      const filter = dataList.filter(v => {
        return e === v.title;
      });
      setVal(e);
      console.log({filter, e, dataList});
      setDataList(filter);
    } else {
      setVal(e);
      console.log({e, dataList});
    }
  };

  const Right = () => {
    return <View></View>;
  };

  return (
    <View style={{backgroundColor: color.accent3, flex: 1}}>
      <Header title={'Pencarian'} right={Right()} />
      <ListSearch
        data={dataList}
        onChange={(e, i) => changeHandler(e, i)}
        value={val}
      />
    </View>
  );
}
