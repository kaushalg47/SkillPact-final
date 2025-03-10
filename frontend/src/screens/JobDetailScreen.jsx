import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useGetJobByIdQuery } from '../slices/jobsApiSlice';
import { useApplyForJobMutation } from '../slices/applicationApiSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import ErrorScreen from './ErrorScreen';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const { data, error, isLoading, refetch } = useGetJobByIdQuery(jobId);
  const [applyForJob, { isLoading: isApplying }] = useApplyForJobMutation();
  const job = data?.job;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleApply = async () => {
    if (job) {
      try {
        await applyForJob(jobId).unwrap();
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
    <Container fluid style={{ maxWidth: '1728px', padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: windowWidth <= 1024 ? 'column' : 'row',
        gap: '55px'
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
            height: '445px',
            background: '#FFFFFF',
            border: '2px solid #000000',
            borderRadius: '20px',
            padding: '20px',
            overflowY: 'auto' // Add scroll if content exceeds height
          }}>
            <h2>{job.title}</h2>
            <div style={{ marginTop: '15px' }}>
              <h5>Company:</h5>
              <p>{job.company?.name}</p>
            </div>
            <div style={{ marginTop: '15px' }}>
              <h5>Location:</h5>
              <p>{job.location}</p>
            </div>
            <div style={{ marginTop: '15px' }}>
              <h5>Job Description:</h5>
              <p>{job.description}</p>
            </div>
            <div style={{ marginTop: '15px' }}>
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
          <div style={{ 
            width: '100%',
            display: 'flex',
            flexDirection: windowWidth <= 768 ? 'column' : 'row',
            alignItems: 'center',
            background: '#FFFFFF',
            border: '2px solid #000000',
            borderRadius: '20px',
            padding: '15px',
            gap: '15px',
            textAlign: windowWidth <= 768 ? 'center' : 'left'
          }}>
            <img 
              src={job.companyLogo || '/placeholder-logo.png'} 
              alt="Company Logo" 
              style={{ 
                width: '153px', 
                height: '90px', 
                borderRadius: '50%', 
                objectFit: 'cover' 
              }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '600' }}>{job.company}</h3>
              <p>{job.title}</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div style={{ 
          flex: windowWidth <= 1024 ? 'none' : 'none',
          width: windowWidth <= 1024 ? '100%' : '320px', // Reduced width
          background: '#FFFFFF',
          border: '2px solid #000000',
          borderRadius: '20px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          minHeight: '595px'
        }}>
          <p style={{ fontSize: '25px', fontWeight: '350', marginTop: '2px' }}>Click here to apply</p>
          <button 
            style={{
              width: '210px',
              height: '45px',
              background: '#D9D9D9',
              border: 'none',
              borderRadius: '10px',
              fontSize: '28px',
              color: 'black',
              cursor: 'pointer',
              marginTop: '7px',
            }} 
            onClick={handleApply} 
            disabled={isApplying}
          >
            {isApplying ? "Applying..." : "Enroll"}
          </button>
          
          <div style={{
            width: '130px',
            height: '30px',
            background: '#B9E4C2',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#106516',
            padding: '8px 15px',
            borderRadius: '10px',
            textAlign: 'center',
            marginTop: '20px',
          }}>
            Eligible ✅
          </div>
          
          <div style={{ marginTop: '30px', width: '100%' }}>
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
                          width: '85px', 
                          height: '75px', 
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
                  <span style={{ width: '90px', height: '80px', background: '#E6E6E6', borderRadius: '10px' }}></span>
                  <span style={{ width: '90px', height: '80px', background: '#E6E6E6', borderRadius: '10px' }}></span>
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
