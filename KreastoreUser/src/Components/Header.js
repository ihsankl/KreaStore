import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Feather from 'react-native-vector-icons/dist/Feather';
import { color } from '../Theme/Color';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const Header = ({ title, elevation, noArrow, right = DefaultRightMenu(), noRight, ...props }) => {
    const navigation = useNavigation();
    return (
        <View style={{ padding: 16, width: '100%', minHeight: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
                {!noArrow &&
                    <TouchableOpacity onPress={navigation.goBack}>
                        <Feather name="chevron-left" size={24} color={color.text} />
                    </TouchableOpacity>
                }
            </View>
            <Text>{title}</Text>
            <View>{right}</View>
        </View>
    )
}

const DefaultRightMenu = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Feather name="menu" size={24} color={color.primary} />
        </TouchableOpacity>
    )
}

export default Header

const styles = StyleSheet.create({})
