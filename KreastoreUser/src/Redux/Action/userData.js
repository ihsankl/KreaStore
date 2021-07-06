import firestore from '@react-native-firebase/firestore';

const usersRef = firestore().collection('users');

export const getUserData = (id) => {
    return {
        type: 'GET_USER_DATA',
        payload: usersRef.doc(id).get(),
    }
}

export const inputUserData = (data) => {
    return {
        type: 'INPUT_USER_DATA',
        payload: Promise.resolve(data),
    }
}

export const isAnonymous = (data) => {
    return {
        type: 'IS_ANONYMOUS',
        payload: Promise.resolve(data),
    }
}

export const insertUserData = (id, data) => {
    return {
        type: 'INSERT_USER_DATA',
        payload: usersRef.doc(id).set(data),
    }
}

export const updateUser = (id, data) => {
    return {
        type: 'UPDATE_USER_DATA',
        payload: usersRef.doc(id).update(data),
    }
}
