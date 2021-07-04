import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { color } from '../Theme/Color'
import Feather from 'react-native-vector-icons/dist/Feather';


const SearchInput = ({ onSubmitEditing, onPress, value, placeholder, onChangeText, editable, ...props }) => {
    return (
            <View
                {...props}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 8,
                }}>
                <Feather
                    name="search"
                    size={20}
                    color={color.grey}
                    style={{
                        padding: 5,
                        marginLeft: 5,
                    }}
                />
                <TextInput
                    style={{
                        flex: 1,
                        paddingTop: 5,
                        paddingRight: 5,
                        paddingBottom: 5,
                        paddingLeft: 0,
                        marginLeft: 5,
                        fontFamily: 'Poppins-Regular'
                    }}
                    onSubmitEditing={e => onChangeText(e.nativeEvent.text, 'search')}
                    clearButtonMode="always"
                    onChangeText={e => onChangeText(e)}
                    value={value}
                    placeholder="Cari ..."
                    editable={editable}
                />
            </View>

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
    }
})
