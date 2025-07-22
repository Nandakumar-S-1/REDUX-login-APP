import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {persistStore,persistReducer} from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit";

// importing the entire slice object (authSlice, AdminSlice) where the reducer is expected by combineReducers. slices as per Redux Toolkit documentatis export the reducer by default and the slice object itself separately.

// import { authSlice } from "./slice/UserSlice";
// import { AdminSlice } from "./slice/AdminSlice";

import userReducer from "./slice/UserSlice";
import adminReducer from "./slice/AdminSlice";

const authPersistConfig ={
    key:'auth',
    storage
}

const adminPersistConfig ={
    key:'admin',
    storage
}




const rootReducer = combineReducers({
    auth:persistReducer(authPersistConfig,userReducer),
    admin:persistReducer(adminPersistConfig,adminReducer)
  })

// const Store = configureStore({
//     reducer:rootReducer,
// })
const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(Store)
export default Store