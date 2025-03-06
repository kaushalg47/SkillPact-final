import { apiSlice } from "./apiSlice";

export const purchaseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoursePurchaseStatus: builder.query({
      query: (courseId) => `/api/courses/${courseId}/detail-with-status`,
      providesTags: ["Purchase"],
    }),
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/api/checkout/create-checkout-session",
        method: "POST",
        body: { courseId },
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetCoursePurchaseStatusQuery, useCreateCheckoutSessionMutation } =
  purchaseApiSlice;
