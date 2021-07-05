import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import KreaButton from '../../Component/KreaButton'

export default function Detail({data, back=()=>{}}) {
  return (
    <View>
      <Text>Ini Halaman Detail</Text>
      <KreaButton onPress={() => { 
        back() 
      }} text={'Back'}/>
    </View>
  )
}
