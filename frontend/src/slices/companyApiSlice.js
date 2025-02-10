import { apiSlice } from "./apiSlice";
const COMPANY_URL = "/api/company/";

export const companyInfoApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCompanyInfo: builder.query({
			query: (id) => `${COMPANY_URL}/${id}`,
		}),
		getUserCompanyInfo: builder.query({
			query: () => `${COMPANY_URL}`,
			providesTags: ["CompanyInfo"],
		}),
		updateCompany: builder.mutation({
			query: ({ compId, data }) => ({
				url: `${COMPANY_URL}/${compId}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["CompanyInfo"],
		}),
	}),
});

export const { useGetCompanyInfoQuery, useUpdateCompanyMutation, useGetUserCompanyInfoQuery } = companyInfoApiSlice;
