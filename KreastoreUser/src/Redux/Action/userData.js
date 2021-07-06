import firestore from '@react-native-firebase/firestore';

const usersRef = firestore().collection('users');

export const putUserData = (data) => {
    return {
        type: 'PUT_USER_DATA',
        payload: Promise.resolve(data),
    }
}

export const getUserData = (id) => {
    return {
        type: 'GET_USER_DATA',
        payload: usersRef.doc(id).get(),
    }
}

export const insertUserData = (id, data) => {
//     USER
//   - post_id (POST string id)
//   - photo
//   - nickname
//   - isVerified (bool)
    return {
        type: 'INSERT_USER_DATA',
        payload: usersRef.doc(id).set(data),
    }
}