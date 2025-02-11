import { apiSlice } from "./apiSlice";
const APPLICATION_URL = "/api/apply/";

export const applicantsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getApplicantDetails: builder.query({
			query: (id) => `${APPLICATION_URL}/reg-applicants/${id}`,
		}),
	}),
});

export const { useGetApplicantDetailsQuery } = applicantsApiSlice;
