import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://skillpact.onrender.com' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Job', 'Application'],
  endpoints: (builder) => ({}),
});
