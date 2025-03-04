import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetApplicantDetailsQuery } from "../slices/applicantsApiSlice";
import "../components/styles/Applicants.css";

const Applicants = () => {
  const { jobId } = useParams();
  const { data, isLoading, isError } = useGetApplicantDetailsQuery(jobId);
  const [applicants, setApplicants] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (data && data.success) {
      setApplicants(data.application);
    } else {
      setApplicants([]);
    }
  }, [data]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading || !applicants) {
    return <p className="loading-message">Loading...</p>;
  }

  if (isError) {
    return <p className="error-message">Some Error occurred</p>;
  }

  if (applicants.length === 0) {
    return <p className="empty-message">No applicants</p>;
  }

  return (
    <div className="applicants-container">
      <h2 className="applicants-title">Applicants</h2>

      <div className="applicants-list">
        {applicants.map((data) => (
          <div key={data.applicant.email} className="applicant-item">
            {/* Basic Info Row - Always Visible */}
            <div 
              className="applicant-header"
              onClick={() => toggleExpand(data.applicant.email)}
            >
              <div className="applicant-main-info">
                {/* Profile Initial Circle */}
                <div className="applicant-initial">
                  {data.applicant.name.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <div className="applicant-name">
                  {data.applicant.name}
                </div>

                {/* Status Badge */}
                <div className={`applicant-status ${data.status}`}>
                  {data.status}
                </div>
              </div>

              {/* Expand/Collapse Button */}
              <button className="expand-btn">
                {expandedId === data.applicant.email ? "▲" : "▼"}
              </button>
            </div>

            {/* Expanded Details */}
            {expandedId === data.applicant.email && (
              <div className="applicant-details">
                <div className="details-grid">
                  <div className="detail-label">Email:</div>
                  <div className="detail-value">{data.applicant.email}</div>

                  {data.applicant.phone && (
                    <>
                      <div className="detail-label">Phone:</div>
                      <div className="detail-value">{data.applicant.phone}</div>
                    </>
                  )}

                  {data.applicant.location && (
                    <>
                      <div className="detail-label">Location:</div>
                      <div className="detail-value">{data.applicant.location}</div>
                    </>
                  )}

                  {data.resume && (
                    <>
                      <div className="detail-label">Resume:</div>
                      <div className="detail-value">
                        <a href={data.resume} target="_blank" rel="noopener noreferrer" className="resume-link">
                          View Resume
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applicants;