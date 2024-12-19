import { apiSlice } from './apiSlice';
const JOB_URL = '/api/jobs';

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => `${JOB_URL}/get-jobs`
    }),
    getJobById: builder.query({
      query: (id) => `${JOB_URL}/job-info/${id}`, // Replace with your endpoint to get a single job by ID
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery
} = jobApiSlice;
