import { apiSlice } from './apiSlice';

const JOB_URL = '/api/jobs';

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => `${JOB_URL}/`
    }),
    getJobById: builder.query({
      query: (id) => `${JOB_URL}/${id}`,
    }),
    postJob: builder.mutation({
      query: (jobData) => ({
        url: `${JOB_URL}/`,
        method: 'POST',
        body: jobData,
      }),
    }),
    adminJobs: builder.query({
      query: () => `${JOB_URL}/admin-jobs`,
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  usePostJobMutation,
  useAdminJobsQuery,
} = jobApiSlice;
