import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import { jobApiSlice } from './slices/jobsApiSlice';
import { applicationApiSlice } from './slices/applicationApiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [jobApiSlice.reducerPath]: jobApiSlice.reducer,
    [applicationApiSlice.reducerPath]: applicationApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
