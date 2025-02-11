import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetApplicantDetailsQuery } from "../slices/applicantsApiSlice";

const Applicants = () => {
	const { jobId } = useParams();
	const { data, isLoading, isError } = useGetApplicantDetailsQuery(jobId);
	const [applicants, setApplicants] = useState(null);

	useEffect(() => {
		if (data && data.success) {
			setApplicants(data.application);
		} else {
			setApplicants([]);
		}
	}, [data]);

	if (isLoading || !applicants) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Some Error occurred</p>;
	}

	if (applicants.length == 0) {
		return <p>No applicants</p>;
	}

	return (
		<div>
			{JSON.stringify(applicants)}
			<table>
				<tr>
					<th>Sr. No.</th>
					<th>Applicant Name</th>
					<th>Applicant Email</th>
					<th>Status</th>
				</tr>
				{applicants.map((data, i) => (
					<tr key={data.emil}>
						<td>{i + 1}</td>
						<td>{data.applicant.name}</td>
						<td>{data.applicant.email}</td>
						<td>{data.status}</td>
					</tr>
				))}
			</table>
		</div>
	);
};

export default Applicants;
