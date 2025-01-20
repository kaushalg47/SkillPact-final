import { apiSlice } from './apiSlice';

const COURSE_URL = '/api/courses';

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch published courses
    getCourses: builder.query({
      query: () => `${COURSE_URL}`,
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
  useCreateCourseMutation, // Hook to create a new course
} = courseApiSlice;

