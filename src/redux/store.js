// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authStore';
import blastReducer from './blastStore';
const store = configureStore({
  reducer: {
    auth: authReducer,
    blast: blastReducer,
  },
});

export default store;
