import { combineReducers } from 'redux'
import { alert } from './alert'
import { getUserData, putUserData } from './userData'
import { allPost, detailPost, insertPost, updatePost, allPostByFav } from './post'

const appReducers = combineReducers({
    alert,
    getUserData,
    putUserData,
    allPost, 
    detailPost, 
    insertPost, 
    updatePost, 
    allPostByFav,
})

export default appReducers