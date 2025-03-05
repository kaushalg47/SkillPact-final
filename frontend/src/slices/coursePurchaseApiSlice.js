import { apiSlice } from './apiSlice';

const COURSE_PURCHASE_URL = "/api/course-purchase";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (data) => ({
        url: `${COURSE_PURCHASE_URL}/checkout/create-checkout-session`,
        method: 'POST',
        body: data,
      }),
    }),
    getAllPurchasedCourses: builder.query({
      query: () => ({
        url: `${COURSE_PURCHASE_URL}/`,
        method: 'GET',
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `${COURSE_PURCHASE_URL}/${courseId}/detail-with-status`,
        method: 'GET',
      }),
    }),
    stripeWebhook: builder.mutation({
      query: (data) => ({
        url: `${COURSE_PURCHASE_URL}/webhook`,
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetAllPurchasedCoursesQuery,
  useGetCourseDetailWithStatusQuery,
  useStripeWebhookMutation,
} = courseApi;
