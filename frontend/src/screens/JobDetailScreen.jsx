import { useParams, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useGetJobByIdQuery } from '../slices/jobsApiSlice';
import { useApplyForJobMutation } from '../slices/applicationApiSlice';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector} from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import ErrorScreen from './ErrorScreen';
import { FaMapMarkerAlt, FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";

const JobDetailPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { jobId } = useParams();
  const { data, error, isLoading, refetch } = useGetJobByIdQuery(jobId);
  const [applyForJob, { isLoading: isApplying }] = useApplyForJobMutation();
  const job = data?.job;
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showConfirm, setShowConfirm] = useState(false);
  

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleApply = async () => {
    if (job) {
      try {
        await applyForJob(jobId).unwrap();
        setShowConfirm(false);
        toast.success("Successfully enrolled for this job!");
      } catch (err) {
        console.error("Application failed:", err);
        toast.error("Failed to enroll. Please try again.");
      }
    }
  };

  if (isLoading || isApplying) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorScreen 
        message={error?.data?.message || error.message || 'Failed to load job details'}
        retryFunction={refetch}
      />
    );
  }

  if (!job) {
    return (
      <ErrorScreen 
        message="Job details not found"
        showRetry={false}
      />
    );
  }

  return (
    <Container fluid style={{ maxWidth: '1728px', padding: '20px',backgroundColor: '#f8f9fa'}}>
      <div style={{ 
        display: 'flex', 
        flexDirection: windowWidth <= 1024 ? 'column' : 'row',
        gap: '20px' // Reduced gap between left and right sections
      }}>
        {/* Left Section */}
        <div style={{ 
          flex: windowWidth <= 1024 ? 'none' : 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '40px', // Increased gap between job content and company info
          width: windowWidth <= 1024 ? '100%' : 'auto'
        }}>
          {/* Job Description */}
          <div style={{ 
            width: '100%',
            background: '#FFFFFF',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
            padding: '20px',
             // Add scroll if content exceeds height
                  }}>
                  <h2>{job.title}</h2>
                  <div style={{ marginTop: '10px' }}>
                    <p>
                      <strong>{job.company?.name}</strong> |  
                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          backgroundColor: '#f0f0f0',
                          display: 'inline-block',
                          marginLeft: '5px',
                        }}
                      >
                        {job.category}
                      </span>
                    </p>
                  </div>


                  <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              <p><FaBriefcase color='blue'/> {job.position}</p>
              <p><FaGraduationCap color='blue'/> {job.minqualification}</p>
            </div>
            <div style={{ marginTop: '10px' }}>
              <p><FaMapMarkerAlt /> {job.location}</p>
            </div>
            <hr style={{ margin: '20px 0', border: '1px solid #ddd' }} />

            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              <p><strong>Starts On:</strong> {new Date(job.startsOn).toLocaleDateString()}</p>
              <p><strong>Duration:</strong> {job.duration}</p>
              <p><strong>Stipend:</strong> {job.stipend}</p>
            </div>
            <hr style={{ margin: '20px 0', border: '1px solid #ddd' }} />

            <div style={{ marginTop: '15px' }}>
              <h5>Description:</h5>
              <p className="text-muted">{job.description}</p>
            </div>
          </div>
          <div style={{ 
            width: '100%',
            display: 'flex',
            flexDirection: windowWidth <= 768 ? 'column' : 'row',
            alignItems: 'center',
            background: '#FFFFFF',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
            padding: '15px',
            gap: '15px',
            textAlign: windowWidth <= 768 ? 'center' : 'left'
          }}>
            {/* <img 
              src={job.companyLogo || '/placeholder-logo.png'} 
              alt="Company Logo" 
              style={{ 
                width: '153px', 
                height: '90px', 
                borderRadius: '50%', 
                objectFit: 'cover' 
              }} 
            /> */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '600' }}>{job.company.name}</h3>
              <p><a href={job.company.website}>{job.company.website}</a> | <FaMapMarkerAlt /> {job.company.location}</p>
              <p className='text-muted'>{job.company.description}</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div style={{ 
          flex: windowWidth <= 1024 ? 'none' : 'none',
          width: windowWidth <= 1024 ? '100%' : '320px', // Reduced width
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Enroll and Eligible Card */}
                  <div style={{ 
                  background: '#FFFFFF',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '20px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  minHeight: '200px'
                  }}>
                  {userInfo ? (
                    <>
                    <p style={{ fontSize: '20px', fontWeight: '400', textAlign: 'center' }}>Click here to apply</p>
                    <button
                      onClick={() => setShowConfirm(true)}
                      style={{
                        width: '210px',
                        height: '45px',
                        background: '#0000ff',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '28px',
                        color: 'white',
                        cursor: 'pointer',
                        marginTop: '7px',
                      }}
                    >
                      Apply Now
                    </button>
                    <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Confirm Application</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Are you sure you want to apply for this job?</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                          Cancel
                        </Button>
                        <Button variant="success" onClick={handleApply}>
                          Yes, Apply!
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    </>
                  ) : (
                    <>
                    <p style={{ fontSize: '20px', fontWeight: '400', textAlign: 'center' }}>Login to apply</p>
                    <button 
                    style={{
                    width: '210px',
                    height: '45px',
                    background: '#0000ff',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '28px',
                    color: 'white',
                    cursor: 'pointer',
                    marginTop: '7px',
                    }} 
                    onClick={() => navigate('/login')}
                    disabled={isApplying}
                    >
                    {"Login"}
                    </button>
                    </>
                  )}
                  </div>

                  {/* Badges Card */}
          <div style={{ 
            background: '#FFFFFF',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            minHeight: '200px'
          }}>
            <h4 style={{ fontSize: '20px', fontWeight: '400', textAlign: 'center' }}>Required Badges:</h4>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center', 
              gap: '15px', 
              marginTop: '10px' 
            }}>
              {job.badges && job.badges.length > 0 ? (
                job.badges.map((badge) => (
                  <div key={badge._id} style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '90px'
                  }}>
                    {badge.imageUrl ? (
                      <img 
                        src={badge.imageUrl} 
                        alt={badge.title} 
                        style={{ 
                          width: '180px', 
                          height: '170px', 
                          borderRadius: '10px',
                          objectFit: 'contain'
                        }} 
                      />
                    ) : (
                      <div style={{ 
                        width: '90px', 
                        height: '80px', 
                        background: '#E6E6E6',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                      }}>
                        No Image
                      </div>
                    )}
                    <p style={{ 
                      fontSize: '12px', 
                      textAlign: 'center',
                      marginTop: '5px',
                      fontWeight: '500'
                    }}>
                      {badge.title}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <span style={{}}><p>no badges required</p></span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </Container>
  );
};

export default JobDetailPage;
