import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAdminJobsQuery } from "../slices/jobsApiSlice";
import { toast } from "react-toastify";
import "../components/styles/CompanyJobs.css";

const checkAuthentication = (tempData, navigate) => {
  if (!tempData) {
    toast.error("Login Required");
    navigate("/login");
    return false;
  }
  return true;
};

const CompanyJobs = () => {
  const [adminJobs, setAdminJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { userInfo: tempData } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useAdminJobsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication(tempData, navigate);
  }, [tempData, navigate]);

  useEffect(() => {
    if (data && data.success) {
      setAdminJobs(data.jobs);
    }
  }, [data]);

  const filteredJobs = adminJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p className="loading-text">Loading jobs...</p>;
  if (isError) return <p className="error-text">Some error occurred</p>;
  if (!adminJobs.length) return <p className="no-jobs-text">No jobs found</p>;

  return (
    <section className="jobs-container">
      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for jobs..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Job Listings */}
      <div className="jobs-list">
        {filteredJobs.map((job) => (
          <div key={job._id} className="job-item">
            <div className="job-details">
              <h2 className="job-title">{job.title}</h2>
              <p className="company-name">{job.company || "Unknown Company"}</p>
              <p className="job-location">{job.location || "Location not available"}</p>
              <div className="job-meta">
                <span className="job-date">🕒 {new Date(job.createdAt).toDateString()}</span>
                <span className="job-type">⚡ Full-time</span>
              </div>
              <div className="job-badges">
                {job.badges && job.badges.map((badge, index) => (
                  <span key={index} className="badge">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <Link to={`/company-jobs/${job._id}`} className="view-details-btn">
              View Applicants
            </Link>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && searchTerm && (
        <div className="no-results">
          <p>No jobs matching &quot;{searchTerm}&quot; found</p>
          <button onClick={() => setSearchTerm("")} className="clear-search-btn">
            Clear Search
          </button>
        </div>
      )}
    </section>
  );
};

export default CompanyJobs;