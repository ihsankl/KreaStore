import { combineReducers } from 'redux'
import { alert } from './alert'
import { getUserData, putUserData } from './userData'
import { allPost, detailPost, insertPost, updatePost } from './post'

const appReducers = combineReducers({
    alert,
    getUserData,
    putUserData,
    allPost, detailPost, insertPost, updatePost
})

export default appReducers