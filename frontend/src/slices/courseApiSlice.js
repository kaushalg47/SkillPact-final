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
    // Search courses
    searchCourse: builder.query({
      query: (searchParams) => ({
        url: `${COURSE_URL}/search`,
        params: searchParams,
      }),
    }),
    // Get courses created by a specific user
    getCreatorCourses: builder.query({
      query: () => COURSE_URL,
    }),
    // Edit a course by its ID
    editCourse: builder.mutation({
      query: ({ courseId, courseData }) => ({
        url: `${COURSE_URL}/${courseId}`,
        method: 'PUT',
        body: courseData,
      }),
    }),
    // Create a new lecture for a specific course
    createLecture: builder.mutation({
      query: ({ courseId, lectureData }) => ({
        url: `${COURSE_URL}/${courseId}/lecture`,
        method: 'POST',
        body: lectureData,
      }),
    }),
    // Get lectures for a specific course
    getCourseLecture: builder.query({
      query: (courseId) => `${COURSE_URL}/${courseId}/lecture`,
    }),
    // Edit a specific lecture by its ID
    editLecture: builder.mutation({
      query: ({ courseId, lectureId, lectureData }) => ({
        url: `${COURSE_URL}/${courseId}/lecture/${lectureId}`,
        method: 'PUT',
        body: lectureData,
      }),
    }),
    // Remove a specific lecture by its ID
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `${COURSE_URL}/lecture/${lectureId}`,
        method: 'DELETE',
      }),
    }),
    // Get a specific lecture by its ID
    getLectureById: builder.query({
      query: (lectureId) => `${COURSE_URL}/lecture/${lectureId}`,
    }),
    // Toggle the publication status of a course
    togglePublishCourse: builder.mutation({
      query: (courseId) => ({
        url: `${COURSE_URL}/${courseId}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useSearchCourseQuery,
  useGetCreatorCoursesQuery,
  useEditCourseMutation,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  useTogglePublishCourseMutation,
} = courseApiSlice;
