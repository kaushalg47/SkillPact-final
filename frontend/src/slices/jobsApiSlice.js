import { apiSlice } from './apiSlice';
const JOB_URL = '/api/jobs';

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => `${JOB_URL}/get-jobs`
    }),
  }),
});

export const {
  useGetJobsQuery,
} = jobApiSlice;
