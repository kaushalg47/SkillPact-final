import { apiSlice } from './apiSlice';

const JOB_URL = '/api/jobs';

export const jobApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all jobs
    getJobs: builder.query({
      query: () => `${JOB_URL}/`,
    }),

    // Get job by ID
    getJobById: builder.query({
      query: (id) => `${JOB_URL}/${id}`,
    }),

    // Post a new job
    postJob: builder.mutation({
      query: (jobData) => ({
        url: `${JOB_URL}/`,
        method: 'POST',
        body: jobData,
      }),
    }),

    // Admin fetch jobs
    adminJobs: builder.query({
      query: () => `${JOB_URL}/admin-jobs`,
    }),

    // Delete job
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `${JOB_URL}/${id}`,
        method: 'DELETE',
      }),
    }),

    // Toggle job active status
    toggleJobStatus: builder.mutation({
      query: (id) => ({
        url: `${JOB_URL}/${id}`,
        method: 'PUT',
      }),
    }),
  }),
});

// Export hooks for each query/mutation
export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  usePostJobMutation,
  useAdminJobsQuery,
  useDeleteJobMutation,
  useToggleJobStatusMutation,
} = jobApiSlice;
