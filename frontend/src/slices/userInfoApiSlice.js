import { apiSlice } from "./apiSlice";
const USER_URL = "/api/users/profile/";

export const userInfoApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserInfo: builder.query({
			query: (id) => `${USER_URL}/${id}`,
		}),
	}),
});

export const { useGetUserInfoQuery } = userInfoApiSlice;
