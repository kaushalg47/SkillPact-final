import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetApplicantDetailsQuery } from "../slices/applicantsApiSlice";
import { useGetUserCompanyInfoQuery } from "../slices/companyApiSlice";
import { useUpdateApplicationStatusMutation } from "../slices/applicantsApiSlice";
import "../components/styles/Applicants.css";

const Applicants = () => {
  const { jobId } = useParams();
  const { data, isLoading, isError } = useGetApplicantDetailsQuery(jobId);
  const { data: companyInfo } = useGetUserCompanyInfoQuery();
  const [updateStatus] = useUpdateApplicationStatusMutation();
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

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      await updateStatus({ applicationId, status: newStatus }).unwrap();
      // Update local state after successful status update
      setApplicants(prevApplicants => 
        prevApplicants.map(application => 
          application._id === applicationId 
            ? { ...application, status: newStatus }
            : application
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    }
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

                  {/* Status Update Buttons for Company Admin */}
                  {companyInfo && (
                    <div className="status-update-buttons">
                      <div className="detail-label">Update Status:</div>
                      <div className="detail-value">
                        <div className="btn-group">
                          <button
                            className={`btn btn-sm ${data.status === 'accepted' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => handleStatusUpdate(data._id, 'accepted')}
                          >
                            Accept
                          </button>
                          <button
                            className={`btn btn-sm ${data.status === 'rejected' ? 'btn-danger' : 'btn-outline-danger'}`}
                            onClick={() => handleStatusUpdate(data._id, 'rejected')}
                          >
                            Reject
                          </button>
                          <button
                            className={`btn btn-sm ${data.status === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
                            onClick={() => handleStatusUpdate(data._id, 'pending')}
                          >
                            Pending
                          </button>
                        </div>
                      </div>
                    </div>
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