import { combineReducers } from 'redux'
import { alert } from './alert'
import { getUserData, isAnonData, inputUserData } from './userData'
import { allPost, detailPost, insertPost, updatePost, allPostByFav, searchPost } from './post'

const appReducers = combineReducers({
    alert,
    getUserData,
    allPost,
    detailPost,
    insertPost,
    updatePost,
    allPostByFav,
    searchPost,
    isAnonData,
    inputUserData,
})

export default appReducers