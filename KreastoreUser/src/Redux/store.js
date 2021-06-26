import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import reducer from './Reducer/index'
import promiseMiddleware from 'redux-promise-middleware'
import storage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const logger = createLogger({})

export default () => {
    const store = createStore(
        persistedReducer,
        applyMiddleware(
            logger,
            promiseMiddleware
        )
    )
    const persistor = persistStore(store)
    return { store, persistor }
}
