import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
 
const authPersistConfig = {
  key: 'auth',
  storage,
}

const blogPersistConfig = {
  key: 'blog',
  storage,
}
 
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedBlogReducer = persistReducer(blogPersistConfig, blogReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  blog: persistedBlogReducer,
});

const store = configureStore({
  reducer: rootReducer,
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