import { combineReducers } from 'redux'
import { alert } from './alert'
import { getUserData, putUserData } from './userData'

const appReducers = combineReducers({
    alert,
    getUserData,
    putUserData
})

export default appReducers