import { apiSlice } from "./apiSlice";
const COMPANY_URL = "/api/company/";

export const companyInfoApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCompanyInfo: builder.query({
			query: (id) => `${COMPANY_URL}/${id}`,
		}),
	}),
});

export const { useGetCompanyInfoQuery } = companyInfoApiSlice;
