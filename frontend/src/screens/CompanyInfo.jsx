import { useSelector } from "react-redux";
import { useGetUserInfoQuery } from "../slices/userInfoApiSlice";
const CompanyInfo = () => {
	let { userInfo: tempData } = useSelector((state) => state.auth);
	let { data: userInfo, isLoading } = useGetUserInfoQuery(tempData._id);

	if (isLoading || !userInfo) return <p>Loading...</p>;
	const companyData = userInfo.company;

  if (!companyData) {
    return <>Company Not Found</>
  }

	return (
		<section>
			<p>{JSON.stringify(companyData)}</p>
			<h1>{companyData.name}</h1>
			<p>{companyData.description}</p>
      <a href={`${companyData.website}`}>{companyData.name}</a>
      <p>Location: {companyData.location}</p>
		</section>
	);
};

export default CompanyInfo;
