import { apiSlice } from "./apiSlice";

const COURSE_PROGRESS_URL = "/api/course-progress";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => `${COURSE_PROGRESS_URL}/${courseId}`, // Accept courseId as a parameter
    }),
  }),
});

export const { useGetCourseProgressQuery } = courseApiSlice;
