/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAdminJobsQuery } from "../slices/jobsApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import ErrorScreen from "../screens/ErrorScreen";
import { Container, Row, Col, Form, Card, Badge, Button } from "react-bootstrap";

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

  if (isLoading) return <Loader text="Loading jobs..." />;
  
  if (isError) return <ErrorScreen message="Failed to load company jobs." retry={() => window.location.reload()} />;
  
  if (!adminJobs.length) return <ErrorScreen message="No jobs found. Create your first job listing." navigateTo="/create-job" />;

  return (
    <Container className="py-4" style={{ maxWidth: "1200px" }}>
      {/* Search Bar */}
      <Row className="mb-5">
        <Col xs={12} className="ps-md-5">
          <Form.Control
            type="text"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "1000px",
              height: "40px",
              background: "#D9D9D9",
              border: "none",
              borderRadius: "25px",
              padding: "0 20px",
              fontSize: "14px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
            }}
          />
        </Col>
      </Row>

      {/* Job Listings */}
      <Row className="ps-md-5">
        <Col xs={12}>
          <div className="d-flex flex-column gap-4">
            {filteredJobs.map((job) => (
              <Card 
                key={job._id} 
                className="border-0 shadow-sm" 
                style={{ 
                  width: "90%",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
                }}
              >
                <Card.Body className="d-flex justify-content-between align-items-center flex-md-row flex-column">
                  <div>
                    <h5 className="fw-bold mb-2">{job.title}</h5>
                    <p className="text-muted mb-1">{job.company || "Unknown Company"}</p>
                    <p className="text-muted mb-2">{job.location || "Location not available"}</p>
                    <div className="d-flex gap-3 mb-2">
                      <small className="text-muted">🕒 {new Date(job.createdAt).toDateString()}</small>
                      <small className="text-muted">⚡ Full-time</small>
                    </div>
                    <div>
                      {job.badges && job.badges.map((badge, index) => (
                        <Badge 
                          key={index} 
                          bg="secondary" 
                          className="me-2"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Link 
                    to={`/company-jobs/${job._id}`} 
                    className="mt-3 mt-md-0 text-decoration-none"
                  >
                    <Button
                      style={{
                        background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                        border: "none",
                        fontWeight: "600",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 126, 95, 0.4)";
                        e.currentTarget.style.background = "linear-gradient(to right, #ff6e4a, #ffa76b)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.background = "linear-gradient(to right, #ff7e5f, #feb47b)";
                      }}
                    >
                      View Applicants
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>

      {filteredJobs.length === 0 && searchTerm && (
        <Row className="mt-5">
          <Col xs={12} className="text-center">
            <p className="text-muted">No jobs matching "{searchTerm}" found</p>
            <Button 
              variant="outline-secondary"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CompanyJobs;
