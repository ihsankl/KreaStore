import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { connect } from 'react-redux'
import { color } from '../Theme/Color';

const Loading = ({ visible, ...props }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={null}
        >
            <View style={styles.centeredView}>
                <ProgressBar color={color.primary} />
            </View>
        </Modal>
    )
}

const mapStateToProps = state => {
    return {
        putUserData: state.putUserData,
        alert: state.alert,
        getUserData: state.getUserData,
    }
}

export default connect(mapStateToProps)(Loading);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor:`${color.accent3}70`
    },
})
