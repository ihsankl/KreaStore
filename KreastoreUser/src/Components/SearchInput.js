import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { color } from '../Theme/Color'
import Feather from 'react-native-vector-icons/dist/Feather';


const SearchInput = ({ onPress, value, placeholder, onChangeText, editable, ...props }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ flex: 1, position: 'relative' }}>
            <TextInput
                style={styles.input}
                editable={editable}
                onChangeText={onChangeText}
                value={value}
                placeholder="Cari . . ."
                {...props}
            />
            <Feather name="search" size={20} style={{ position: 'absolute', top: '25%', left: 14 }} color={color.text} />
        </TouchableOpacity>

    )
}

export default SearchInput

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        marginHorizontal: 8,
        borderRadius: 8,
        paddingLeft: 28,
        fontFamily: 'Poppins-Regular',
        backgroundColor: 'salmon'
    }
})
