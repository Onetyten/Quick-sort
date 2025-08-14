import {configureStore,combineReducers} from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cleanUpNameReducer from './state/cleanupName'
import groupOptionReducer from './state/groupOption'
import folderUrlReducer from './state/folderUrlSlice'
import historyReducer from './state/logSlice'
import sortingStateSlice from './state/sortingStateSlice'
import darkModeReducer from './state/setDarkMode'


const persistConfig = {
    key:'root',
    version:1,
    storage,
    whitelist:['history','darkMode']
}

const reducer = combineReducers({
    cleanName:cleanUpNameReducer,
    groupOption:groupOptionReducer,
    folderUrl:folderUrlReducer,
    history:historyReducer,
    sortingState:sortingStateSlice,
    darkMode:darkModeReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleWare)=> getDefaultMiddleWare({
        serializableCheck:false
    })
})

export const persitor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
