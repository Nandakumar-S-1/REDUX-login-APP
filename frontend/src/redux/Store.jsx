import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {persistStore,persistReducer} from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit";

import { authSlice } from "./slice/UserSlice";
import { AdminSlice } from "./slice/AdminSlice";

const authPersistConfig ={
    key:'auth',
    storage
}

const adminPersistConfig ={
    key:'admin',
    storage
}

const rootReducer = combineReducers({
    auth:persistReducer(authPersistConfig,authSlice),
    admin:persistReducer(adminPersistConfig,AdminSlice)
})

const Store = configureStore({
    reducer:rootReducer
})

export const persistor = persistStore(Store)
export default Store