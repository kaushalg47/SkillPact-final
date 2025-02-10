import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserCompanyInfoQuery } from "../slices/companyApiSlice";

const CompanyInfo = () => {
	let { userInfo: tempData } = useSelector((state) => state.auth);
	const [companyInfo, setCompanyInfo] = useState(null);

	const navigate = useNavigate();
	useEffect(() => {
		if (!tempData) {
			navigate("/login");
			toast.error("Login Required");
		}
	}, [tempData, navigate]);

	const { data, isLoading } = useGetUserCompanyInfoQuery(tempData?._id, { skip: !tempData });

	useEffect(() => {
		if (data) {
			setCompanyInfo(data.company);
		}
	}, [data])

	if (isLoading || !companyInfo) return <p>Loading...</p>;

	if (!companyInfo) return <p>Company Not Found</p>;

	return (
		<section>
			<p>{JSON.stringify(companyInfo)}</p>
			<h1>{companyInfo.name}</h1>
			<p>{companyInfo.description}</p>
			<a href={`${companyInfo.website}`}>{companyInfo.name}</a>
			<p>Location: {companyInfo.location}</p>
			<Link to="edit">Edit Company Details</Link>
		</section>
	);
};

export default CompanyInfo;
