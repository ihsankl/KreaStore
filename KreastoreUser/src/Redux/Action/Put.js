import firestore from '@react-native-firebase/firestore';

const userRef = firestore().collection('users');

export const putPhone = (id, data) => {
  return {
    type: 'PUT_PHONE',
    payload: userRef.doc(id).update(data),
  };
};

export const verifikasi = (id, data) => {
  return {
    type: 'PUT_VERIFIKASI_PROFILE',
    payload: userRef.doc(id).update(data),
  };
};
