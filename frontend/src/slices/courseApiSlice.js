import { apiSlice } from './apiSlice';

const COURSE_URL = '/api/course';

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourseQuery: builder.query({
      query: () => `${COURSE_URL}/`,
    }),
    // Endpoint to fetch all user job applications
    getCoursesQuery: builder.query({
      query: () => `${COURSE_URL}/published-courses`,
    }),
  }),
});

export const {
  useCreateCourseQuery,
  useGetCoursesQuery,
} = courseApiSlice;
