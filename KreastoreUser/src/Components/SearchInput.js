import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { color } from '../Theme/Color'
import Feather from 'react-native-vector-icons/dist/Feather';


const SearchInput = ({ onPress, value, placeholder, onChangeText, editable, ...props }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ flex: 1, position: 'relative' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    margin: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                }}>
                <Feather
                    name="search"
                    size={20}
                    color="gray"
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
                        fontFamily:'Poppins-Regular'
                    }}
                    // onSubmitEditing={e => onChange(e.nativeEvent.text, 'search')}
                    clearButtonMode="always"
                    onChangeText={e => onChangeText(e)}
                    value={value}
                    placeholder="Cari ..."
                    editable={editable}
                />
            </View>
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
    }
})
