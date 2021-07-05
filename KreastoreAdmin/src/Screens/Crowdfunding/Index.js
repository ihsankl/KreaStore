import React from 'react'
import { useState } from 'react';
import { View, Text } from 'react-native'
import TableCustom from '../Component/TableCustom'
import Detail from './Component/Detail'

export default function Index() {
  const [flagDetail, setFlagDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState({})
  const tableHead =  [{
    row1: 'Nama',
    row2: 'Item',
    row3: 'Total'
  }]
  const tableData = [
    {
      id: '1',
      index: '1',
      nama: 'Alghi',
      pictureUrl: 'https://tajdiidunnisaa.files.wordpress.com/2013/09/kompor-gas.jpg',
      item: 'Kompor Bahan Bakar Air',
      total: 1000000,
      tanggal: '2021-08-17',
      description: 'kompor dengan bahan bakar air',
      reportIndecent: 10,
      reportInappropriate: 20,
      userReport: [
        {
          username: 'Maman',
          reported: 'Ini Fiktif'
        },
        {
          username: 'Manto',
          reported: 'Ini Hoax'
        },
        {
          username: 'Yudi',
          reported: 'User Penipu'
        },
        {
          username: 'Jajang',
          reported: 'Konten Tidak Sesuai'
        },
        {
          username: 'Marzuqi',
          reported: 'Konten Tidak Senonoh'
        },
      ]
    },
    {
      id: '2',
      index: '2',
      nama: 'Fikri',
      pictureUrl: 'https://tajdiidunnisaa.files.wordpress.com/2013/09/kompor-gas.jpg',
      item: 'Kompor Bahan Bakar Air',
      total: 1000000,
      tanggal: '2021-08-17',
      description: 'kompor dengan bahan bakar air',
      reportIndecent: 10,
      reportInappropriate: 20,
      userReport: [
        {
          username: 'Maman',
          reported: 'Ini Fiktif'
        },
        {
          username: 'Manto',
          reported: 'Ini Hoax'
        },
        {
          username: 'Yudi',
          reported: 'User Penipu'
        },
        {
          username: 'Jajang',
          reported: 'Konten Tidak Sesuai'
        },
        {
          username: 'Marzuqi',
          reported: 'Konten Tidak Senonoh'
        },
      ]
    },
    {
      id: '3',
      index: '3',
      nama: 'Riki',
      pictureUrl: 'https://tajdiidunnisaa.files.wordpress.com/2013/09/kompor-gas.jpg',
      item: 'Kompor Bahan Bakar Air',
      total: 1000000,
      tanggal: '2021-08-17',
      description: 'kompor dengan bahan bakar air',
      reportIndecent: 10,
      reportInappropriate: 20,
      userReport: [
        {
          username: 'Maman',
          reported: 'Ini Fiktif'
        },
        {
          username: 'Manto',
          reported: 'Ini Hoax'
        },
        {
          username: 'Yudi',
          reported: 'User Penipu'
        },
        {
          username: 'Jajang',
          reported: 'Konten Tidak Sesuai'
        },
        {
          username: 'Marzuqi',
          reported: 'Konten Tidak Senonoh'
        },
      ]
    },
    {
      id: '4',
      index: '4',
      nama: 'Hanafi',
      pictureUrl: 'https://tajdiidunnisaa.files.wordpress.com/2013/09/kompor-gas.jpg',
      item: 'Kompor Bahan Bakar Air',
      total: 1000000,
      tanggal: '2021-08-17',
      description: 'kompor dengan bahan bakar air',
      reportIndecent: 10,
      reportInappropriate: 20,
      userReport: [
        {
          username: 'Maman',
          reported: 'Ini Fiktif'
        },
        {
          username: 'Manto',
          reported: 'Ini Hoax'
        },
        {
          username: 'Yudi',
          reported: 'User Penipu'
        },
        {
          username: 'Jajang',
          reported: 'Konten Tidak Sesuai'
        },
        {
          username: 'Marzuqi',
          reported: 'Konten Tidak Senonoh'
        },
      ]
    },
    {
      id: '5',
      index: '5',
      nama: 'Uzumaki',
      pictureUrl: 'https://tajdiidunnisaa.files.wordpress.com/2013/09/kompor-gas.jpg',
      item: 'Kompor Bahan Bakar Air',
      total: 1000000,
      tanggal: '2021-08-17',
      description: 'kompor dengan bahan bakar air',
      reportIndecent: 10,
      reportInappropriate: 20,
      userReport: [
        {
          username: 'Maman',
          reported: 'Ini Fiktif'
        },
        {
          username: 'Manto',
          reported: 'Ini Hoax'
        },
        {
          username: 'Yudi',
          reported: 'User Penipu'
        },
        {
          username: 'Jajang',
          reported: 'Konten Tidak Sesuai'
        },
        {
          username: 'Marzuqi',
          reported: 'Konten Tidak Senonoh'
        },
      ]
    },
  ]

  const getDetail = (e) => {
    const filter = tableData.filter(v => {return v.id === e})
    setDataDetail(filter[0])
    setFlagDetail(true)
    console.log({filter})
  }

  const backHandler = () => {
    setDataDetail({})
    setFlagDetail(false)
  }
  console.log({tableHead, tableData})
  return (
    <View style={{backgroundColor: '#F0FFFE', flex: 1}}>
      <View style={{margin: 20}}>
        <Text>Data Crowdfunding</Text>
      </View>
      {flagDetail ? (
        <Detail data={dataDetail} back={() => backHandler()}/>
      ) : (
        <TableCustom tableHead={tableHead} tableData={tableData} detail={(e) => getDetail(e)} />
      )}
    </View>
  )
}
