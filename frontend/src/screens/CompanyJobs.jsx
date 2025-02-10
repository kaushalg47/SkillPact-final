import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAdminJobsQuery } from "../slices/jobsApiSlice";
import { toast } from "react-toastify";

const checkAuthentication = (tempData, navigate) => {
	if (!tempData) {
		toast.error("Login Required");
		navigate("/login");
		return false;
	}
	return true;
};

const CompanyJobs = () => {
	const [adminJobs, setAdminJobs] = useState(null);
	let { userInfo: tempData } = useSelector((state) => state.auth);

	const { data, isLoading, isError } = useAdminJobsQuery();

	// Manage authentication
	const navigate = useNavigate();
	useEffect(() => {
		checkAuthentication(tempData, navigate);
	}, [tempData, navigate]);

	useEffect(() => {
		if (data && data.success) {
			setAdminJobs(data.jobs);
		}
	}, [data]);

	if (isLoading || !adminJobs) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Some error occurred</p>;
	}

	return <>
    {JSON.stringify(adminJobs)}
  
    <section>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Badges</th>
            <th>Created On</th>
            <th>Last Updated</th>
            <th>Applicants</th>
            <th>View Applicants</th>
          </tr>
        </thead>
        <tbody>
          {adminJobs.map((data) => (
            <tr key={adminJobs.id}>
              <td>{data.title}</td>
              <td>{data.description}</td>
              <td>{data.badges.toString()}</td>
              <td>{data.createdAt}</td>
              <td>{data.updatedAt}</td>
              <td>{data.application?.length}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

  </>;
};

export default CompanyJobs;
