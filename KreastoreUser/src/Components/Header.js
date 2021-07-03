import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import {color} from '../Theme/Color';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';

const Header = ({
  title,
  elevation,
  noArrow,
  right = DefaultRightMenu(),
  noRight,
  callBack = () => {},
  children,
  ...props
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        padding: 16,
        width: '100%',
        minHeight: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        {!noArrow && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              callBack();
            }}>
            <Feather name="chevron-left" size={24} color={color.text} />
          </TouchableOpacity>
        )}
      </View>
      {!!title && <Text>{title}</Text>}
      {children}
      <View>{right}</View>
    </View>
  );
};

const DefaultRightMenu = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => null}>
      <Feather name="menu" size={24} color={color.primary} />
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({});
