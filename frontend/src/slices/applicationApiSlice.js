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
    applyForJob: builder.mutation({
      query: (jobId) => ({
        url: `${APPLICATION_URL}/apply-job/${jobId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetJobApplicationQuery,
  useGetUserApplicationsQuery,
  useApplyForJobMutation
} = applicationApiSlice;
