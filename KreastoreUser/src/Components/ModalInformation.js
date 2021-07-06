import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { color } from '../Theme/Color'
import KreaButton from './KreaButton'

const ModalInformation = ({
    visible,
    msg,
    status,
    onDismiss,
    ...props
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onDismiss}
        >
            <View style={styles.centeredView}>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                        {!!status && <Text style={{ color: status == 'error' ? color.red : color.primary, fontSize: 24 }}>{status}!</Text>}
                        <Text>{msg}</Text>
                    </View>
                    <View>
                        <KreaButton text="OK" onPress={onDismiss} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalInformation

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: `${color.accent3}70`
    },
    container: {
        backgroundColor: color.white,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        minHeight: 250,
        minWidth: 250,
        alignItems: 'center',
        justifyContent: "space-evenly"
    }
})
