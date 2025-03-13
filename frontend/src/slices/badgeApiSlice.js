
import { apiSlice } from './apiSlice';

const COURSE_URL = '/api/badges';

export const badgeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBadgeToUser: builder.mutation({
      query: (courseData) => ({
        url: COURSE_URL,
        method: 'POST',
        body: courseData,
      }),
    })
  })
});