import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useGetJobByIdQuery } from '../slices/jobsApiSlice';
import '../components/styles/JobDetail.css';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetJobByIdQuery(jobId);
  const job = data?.job;

  const handleApply = () => {
    if (job) {
      // Corrected the navigate path by adding quotes around the string
      navigate(`/apply/${jobId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div className="error-message alert alert-danger text-center my-5">{error?.message || 'Failed to load job details'}</div>;
  }

  if (!job) {
    return <div className="no-job-message alert alert-warning text-center my-5">No job details found.</div>;
  }

  return (
    <div className="job-detail-container">
      {/* Left Section */}
      <div className="left-container">
        {/* Job Description */}
        <div className="job-content">
          <h2>{job.title}</h2>
          <div className="job-info">
            <h5>Company:</h5>
            <p>{job.company}</p>
          </div>
          <div className="job-info">
            <h5>Location:</h5>
            <p>{job.location}</p>
          </div>
          <div className="job-info">
            <h5>Job Description:</h5>
            <p>{job.description}</p>
          </div>
          <div className="job-info">
            <h5>Requirements:</h5>
            <ul>
              {job.requirements?.length > 0 ? (
                job.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))
              ) : (
                <p>No specific requirements listed.</p>
              )}
            </ul>
          </div>
        </div>

        {/* Company Info */}
        <div className="company-info">
          <img src={job.companyLogo || '/placeholder-logo.png'} alt="Company Logo" className="company-logo" />
          <div className="company-details">
            <h3>{job.company}</h3>
            <p>{job.title}</p>
          </div>
        </div>
      </div>

      <div className="right-container">
        <p>Click here to apply</p>
        <button className="apply-button" onClick={handleApply}>Enroll</button>
        <div className="eligibility">Eligible ✅</div>
        <div className="badges-container required-badges">
          <h4>Required Badges:</h4>
          <span className="badge-placeholder"></span>
          <span className="badge-placeholder"></span>
          <span className="badge-placeholder"></span>
        </div>
        <div className="badges-container earned-badges">
          <h4>Your Badges:</h4>
          <span className="badge-placeholder"></span>
          <span className="badge-placeholder"></span>
        </div>
      </div>

    </div>
  );
};

export default JobDetailPage;
