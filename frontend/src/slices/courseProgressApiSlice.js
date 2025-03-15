import { apiSlice } from "./apiSlice";

const COURSE_PROGRESS_URL = "/api/course-progress";

export const courseProgressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => `${COURSE_PROGRESS_URL}/${courseId}`,
    }),

    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `${COURSE_PROGRESS_URL}/${courseId}/lecture/${lectureId}/view`,
        method: "POST",
      }),
    }),

    markAsCompleted: builder.mutation({
      query: (courseId) => ({
        url: `${COURSE_PROGRESS_URL}/${courseId}/complete`,
        method: "POST",
      }),
    }),

    markAsIncomplete: builder.mutation({
      query: (courseId) => ({
        url: `${COURSE_PROGRESS_URL}/${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});

export const { 
  useGetCourseProgressQuery, 
  useUpdateLectureProgressMutation, 
  useMarkAsCompletedMutation, 
  useMarkAsIncompleteMutation 
} = courseProgressApiSlice;
