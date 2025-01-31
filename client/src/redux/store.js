import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default to localStorage
import authReducer from "./slices/authSlice";
import dateSlice from './slices/date'

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Wrap authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedDateReducer = persistReducer(persistConfig,dateSlice)

// Configure the store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    date: persistedDateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
