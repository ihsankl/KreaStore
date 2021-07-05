import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { color } from '../../Theme/Color'

const KreaButton = ({ btnColor = color.primary, text, disabled, children, onPress, textStyle, btnStyle, ...props }) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[btnStyle, styles.container, { backgroundColor: disabled ? color.grey : btnColor }]}>
            {children}
            <Text style={[textStyle, styles.text]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default KreaButton

const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderRadius: 8,
        minWidth: 50,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    text: {
        color: color.white,
        textAlign: 'center',
        textAlignVertical:'bottom'
    }
})
