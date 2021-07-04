import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Header from '../../../Components/Header';
import { color } from '../../../Theme/Color';

export default function Method({ label, right = () => { } }) {
  return (
    <View>
      <Header title={label} right={right} />
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity>
          <View style={[styles.padding16, styles.providerContainer]}>
            <View style={[styles.padding15]}>
              <Image
                style={[styles.img]}
                source={{
                  uri: 'https://1.bp.blogspot.com/-NwSMFZdU8l4/XZxj8FxN6II/AAAAAAAABdM/oTjizwstkRIqQZ7LOZSPMsUG3EYXF3E4wCEwYBhgL/s1600/logo-gopay-vector.png',
                }}
              />
            </View>
            <View style={{ paddingTop: 15, paddingBottom: 15 }}>
              <Text>Gopay</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={[styles.divider]}
        />
        <TouchableOpacity>
          <View style={[styles.providerContainer, styles.padding16]}>
            <View style={[styles.padding15]}>
              <Image
                style={[styles.img]}
                source={{
                  uri: 'https://1.bp.blogspot.com/-Iq0Ztu117_8/XzNYaM4ABdI/AAAAAAAAHA0/MabT7B02ErIzty8g26JvnC6cPeBZtATNgCLcBGAsYHQ/s1000/logo-ovo.png',
                }}
              />
            </View>
            <View style={{ paddingTop: 15, paddingBottom: 15 }}>
              <Text>OVO</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={[styles.divider]}
        />
        <TouchableOpacity>
          <View style={[styles.providerContainer, styles.padding16]}>
            <View style={[styles.padding15]}>
              <Image
                style={[styles.img]}
                source={{
                  uri: 'https://1.bp.blogspot.com/-fvIxf9jrXBQ/Xytve_Yq_uI/AAAAAAAAClw/31J-RhOBi5Qc5oCmP8-UUhgZE-oSoeJWwCLcBGAsYHQ/s1600/Logo%2BDana%2BBackground%2BBiru.jpg',
                }}
              />
            </View>
            <View style={{ paddingTop: 15, paddingBottom: 15 }}>
              <Text>Dana</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  padding16: {
    paddingHorizontal: 16
  },
  padding15: {
    padding: 15
  },
  providerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  img: {
    width: 55,
    height: 20,
  },
  divider: {
    height: 1,
    backgroundColor: color.text,
    marginHorizontal:10
  }
});
