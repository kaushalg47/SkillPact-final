import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePostJobMutation } from "../slices/jobsApiSlice";

const checkAuthentication = (tempData, navigate) => {
	if (!tempData) {
		toast.error("Login Required");
		navigate("/login");
		return false;
	}
	return true;
};

const PostJobs = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "",
		minqualification: "",
		position: "",
		location: "",
		duration: "",
		startsOn: "",
		stipend: "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const [postJob] = usePostJobMutation();
	const navigate = useNavigate();
	let { userInfo: tempData } = useSelector((state) => state.auth);

	useEffect(() => {
		checkAuthentication(tempData, navigate);
	}, [tempData, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await postJob(formData).unwrap();
			console.log(res);
			toast.success("Job Posted successfully");
			navigate("/company-jobs"); // redirect to home page after update
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}

		console.log(formData);
	};

	return (
		<div>
			{/* Job Posting Form */}
			<form onSubmit={handleSubmit}>
				<div>
					<label>Title</label>
					<input
						type="text"
						name="title"
						required
						placeholder="Enter job title"
						value={formData.title}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Description</label>
					<textarea
						name="description"
						placeholder="Enter job description"
						value={formData.description}
						onChange={handleChange}></textarea>
				</div>
				<div>
					<label>Category</label>
					<select name="category" required value={formData.category} onChange={handleChange}>
						<option value="">Select Category</option>
						<option value="Software">Software</option>
						<option value="AI/ML">AI/ML</option>
						<option value="Data Science">Data Science</option>
						<option value="Cloud">Cloud</option>
						<option value="DevOps">DevOps</option>
						<option value="Security">Security</option>
						<option value="Frontend">Frontend</option>
						<option value="Backend">Backend</option>
					</select>
				</div>
				<div>
					<label>Minimum Qualification</label>
					<input
						type="text"
						name="minqualification"
						placeholder="Enter minimum qualifications"
						value={formData.minqualification}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Position</label>
					<input
						type="text"
						name="position"
						placeholder="Enter job position"
						value={formData.position}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Location</label>
					<input
						type="text"
						name="location"
						placeholder="Enter job location"
						value={formData.location}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Duration</label>
					<input
						type="text"
						name="duration"
						placeholder="Enter job duration"
						value={formData.duration}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Starts On</label>
					<input
						type="date"
						name="startsOn"
						required
						value={formData.startsOn}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label>Stipend</label>
					<input
						type="number"
						name="stipend"
						min="0"
						placeholder="Enter stipend amount"
						value={formData.stipend}
						onChange={handleChange}
					/>
				</div>
				{/* Additional fields (e.g., createdby, company) can be managed via context or hidden inputs */}
				<button type="submit">Post Job</button>
			</form>
		</div>
	);
};

export default PostJobs;
