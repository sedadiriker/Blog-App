import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auhtSlice";
import storage from 'redux-persist/lib/storage' //? defaults to LOCALSTORAGE for web
// import storage from 'redux-persist/lib/storage/session' //? defaults to SESSİON for web
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import blogReducer from "../features/blogSlice";
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, authReducer) //! Kalıcı olmasını istediklerimizi burda birleştirip yazabiliriz.
 
const store = configureStore({
  reducer: {
    auth: persistedReducer,
    blog:blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store)
export default store;