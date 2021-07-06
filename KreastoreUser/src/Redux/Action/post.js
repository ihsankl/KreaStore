import firestore from '@react-native-firebase/firestore';

const postRef = firestore().collection('post');

export const getAllPost = () => {
    return {
        type: 'GET_ALL_POST_DATA',
        payload: postRef.where("status_acc", "==", true).get(),
    }
}

export const getAllPostByFav = () => {
    return {
        type: 'GET_ALL_POST_DATA_BY_FAV',
        payload: postRef.orderBy("favorite", "desc").where("status_acc", "==", true).get(),
    }
}

export const getDetailPost = (id) => {
    return {
        type: 'GET_DETAIL_POST_DATA',
        payload: postRef.doc(id).get(),
    }
}

export const insertPostData = (data) => {
    return {
        type: 'INSERT_POST_DATA',
        payload: postRef.doc().set(data),
    }
}

export const updatePostData = (id, data) => {
    return {
        type: 'UPDATE_POST_DATA',
        payload: postRef.doc(id).update(data),
    }
}