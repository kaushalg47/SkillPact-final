import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateCompanyMutation, useGetUserCompanyInfoQuery } from "../slices/companyApiSlice";

const checkAuthentication = (tempData, navigate) => {
	if (!tempData) {
		toast.error("Login Required");
		navigate("/login");
		return false;
	}
	return true;
};

const EditCompany = () => {
	const [companyInfo, setCompanyInfo] = useState(null);
	
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		website: "",
		location: "",
		logo: "",
	});

	const [updateCompany] = useUpdateCompanyMutation();

	// Getting the information of user from current authentication
	let { userInfo: tempData } = useSelector((state) => state.auth);

	// Manage authentication
	const navigate = useNavigate();
	useEffect(() => {
		checkAuthentication(tempData, navigate);
	}, [tempData, navigate]);

	// Fetching user and company info
	const { data, isLoading } = useGetUserCompanyInfoQuery(tempData?._id, { skip: !tempData });
	useEffect(() => {
		if (data) {
			setCompanyInfo(data.company);
		}
	}, [data]);

	if (isLoading || !companyInfo) return <p>Loading...</p>;

	if (!companyInfo) return <p>Company Not Found</p>;

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await updateCompany({
				compId: companyInfo._id,
				data: { companyInfo: formData },
			}).unwrap();
			console.log(res);
			toast.success("Company updated successfully");
			navigate("/profile"); // redirect to home page after update
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}

		console.log(formData);
	};

	return (
		<div>
			<h2>Edit Company</h2>
			<form onSubmit={handleSubmit}>
				{/* Name: required, minLength 2, maxLength 100 */}
				<div>
					<label>Name</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						minLength={2}
						maxLength={100}
						required
						onChange={handleChange}
					/>
				</div>
				{/* Description: optional, maxLength 500 */}
				<div>
					<label>Description</label>
					<textarea
						name="description"
						value={formData.description}
						maxLength={500}
						onChange={handleChange}
					/>
				</div>
				{/* Website */}
				<div>
					<label>Website</label>
					<input type="text" name="website" value={formData.website} onChange={handleChange} />
				</div>
				{/* Location */}
				<div>
					<label>Location</label>
					<input type="text" name="location" value={formData.location} onChange={handleChange} />
				</div>
				{/* Logo */}
				<div>
					<label>Logo URL</label>
					<input type="text" name="logo" value={formData.logo} onChange={handleChange} />
				</div>
				<button type="submit">Save Company</button>
			</form>
		</div>
	);
};

export default EditCompany;
