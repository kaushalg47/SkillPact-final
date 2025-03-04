import { apiSlice } from './apiSlice';

const COURSE_URL = '/api/courses';

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch published courses
    getCourses: builder.query({
      query: () => `${COURSE_URL}/published-courses`,
    }),
    getCourseById: builder.query({
      query: (courseId) => `${COURSE_URL}/${courseId}`,
    }),
    // Create a new course
    createCourse: builder.mutation({
      query: (courseData) => ({
        url: COURSE_URL,
        method: 'POST',
        body: courseData,
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery, // Hook to fetch published courses
  useGetCourseByIdQuery,
  useCreateCourseMutation, // Hook to create a new course
} = courseApiSlice;

