import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetApplicantDetailsQuery } from "../slices/applicantsApiSlice";
import { useGetUserCompanyInfoQuery } from "../slices/companyApiSlice";
import { useUpdateApplicationStatusMutation } from "../slices/applicantsApiSlice";
import Loader from "../components/Loader";
import ErrorScreen from "../screens/ErrorScreen";
import { Container, Row, Col, Button, Card, Badge} from "react-bootstrap";

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
    return <Loader text="Loading applicants..." />;
  }

  if (isError) {
    return <ErrorScreen message="Failed to load applicants." retry={() => window.location.reload()} />;
  }

  if (applicants.length === 0) {
    return <ErrorScreen message="No applicants found for this job yet." navigateTo="/company-jobs" />;
  }

  // Helper function to get badge variant based on status
  const getStatusVariant = (status) => {
    switch (status) {
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 fw-bold">Applicants</h2>

      <Card className="shadow-sm">
        <Card.Body>
          {applicants.map((data) => (
            <Card 
              key={data.applicant.email} 
              className="mb-3 border"
            >
              <Card.Header 
                className="d-flex justify-content-between align-items-center"
                onClick={() => toggleExpand(data.applicant.email)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle d-flex justify-content-center align-items-center me-3 text-primary"
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: '#dbeafe',
                      fontWeight: 'bold'
                    }}
                  >
                    {data.applicant.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="fw-medium">{data.applicant.name}</span>
                  <Badge 
                    bg={getStatusVariant(data.status)} 
                    className="ms-3 text-capitalize"
                  >
                    {data.status}
                  </Badge>
                </div>
                <Button variant="light" size="sm">
                  {expandedId === data.applicant.email ? "▲" : "▼"}
                </Button>
              </Card.Header>

              {expandedId === data.applicant.email && (
                <Card.Body className="bg-light">
                  <Row className="mb-2">
                    <Col xs={12} md={3} className="fw-medium text-muted">Email:</Col>
                    <Col xs={12} md={9}>{data.applicant.email}</Col>
                  </Row>

                  {data.applicant.phone && (
                    <Row className="mb-2">
                      <Col xs={12} md={3} className="fw-medium text-muted">Phone:</Col>
                      <Col xs={12} md={9}>{data.applicant.phone}</Col>
                    </Row>
                  )}

                  {data.applicant.location && (
                    <Row className="mb-2">
                      <Col xs={12} md={3} className="fw-medium text-muted">Location:</Col>
                      <Col xs={12} md={9}>{data.applicant.location}</Col>
                    </Row>
                  )}

                  {data.resume && (
                    <Row className="mb-2">
                      <Col xs={12} md={3} className="fw-medium text-muted">Resume:</Col>
                      <Col xs={12} md={9}>
                        <a href={data.resume} target="_blank" rel="noopener noreferrer" className="text-primary fw-medium text-decoration-none">
                          View Resume
                        </a>
                      </Col>
                    </Row>
                  )}

                  {/* Status Update Buttons for Company Admin */}
                  {companyInfo && (
                    <Row className="mt-3 pt-3 border-top">
                      <Col xs={12} md={3} className="fw-medium text-muted">Update Status:</Col>
                      <Col xs={12} md={9}>
                        <div className="d-flex gap-2 flex-wrap">
                          <Button
                            variant={data.status === 'accepted' ? 'success' : 'outline-success'}
                            size="sm"
                            onClick={() => handleStatusUpdate(data._id, 'accepted')}
                          >
                            Accept
                          </Button>
                          <Button
                            variant={data.status === 'rejected' ? 'danger' : 'outline-danger'}
                            size="sm"
                            onClick={() => handleStatusUpdate(data._id, 'rejected')}
                          >
                            Reject
                          </Button>
                          <Button
                            variant={data.status === 'pending' ? 'warning' : 'outline-warning'}
                            size="sm"
                            onClick={() => handleStatusUpdate(data._id, 'pending')}
                          >
                            Pending
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  )}
                </Card.Body>
              )}
            </Card>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Applicants;
