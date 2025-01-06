import { apiSlice } from './apiSlice';

const APPLICATION_URL = '/api/apply';

export const applicationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobApplication: builder.query({
      query: (id) => `${APPLICATION_URL}/apply-job/${id}`,
    }),
    // Endpoint to fetch all user job applications
    getUserApplications: builder.query({
      query: () => `${APPLICATION_URL}/user-applications`,
    }),
  }),
});

export const {
  useGetJobApplicationQuery,
  useGetUserApplicationsQuery,
} = applicationApiSlice;
