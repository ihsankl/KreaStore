import { combineReducers } from 'redux'
import { alert } from './alert'
import { userData } from './userData'

const appReducers = combineReducers({
    alert,
    userData,
})

export default appReducers