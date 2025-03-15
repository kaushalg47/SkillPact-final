import { apiSlice } from "./apiSlice";
const APPLICATION_URL = "/api/apply/";

export const applicantsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getApplicantDetails: builder.query({
      query: (id) => `${APPLICATION_URL}/reg-applicants/${id}`,
    }),

    // New endpoint to update the application status
    updateApplicationStatus: builder.mutation({
      query: ({ applicationId, status }) => ({
        url: `${APPLICATION_URL}/status-update-app/${applicationId}`,
        method: "POST",  // Use POST or PUT depending on your backend setup
        body: { status },
      }),
    }),
  }),
});

export const { useGetApplicantDetailsQuery, useUpdateApplicationStatusMutation } = applicantsApiSlice;
