import { useGetJobsQuery } from '../slices/jobsApiSlice';
import { useGetCoursesQuery } from '../slices/courseApiSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../components/Card';
import { useEffect, useRef } from 'react';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { data: jobData, error: jobError, isLoading: jobLoading } = useGetJobsQuery();
  const { data: courseData } = useGetCoursesQuery();
  
  const jobs = jobData?.jobs || [];
  const courses = courseData?.courses.slice(0, 5) || [];

  const jobCarouselRef = useRef(null);

  useEffect(() => {
    const jobInterval = setInterval(() => {
      if (jobCarouselRef.current) {
        jobCarouselRef.current.scrollLeft += 200;
        if (
          jobCarouselRef.current.scrollLeft >=
          jobCarouselRef.current.scrollWidth - jobCarouselRef.current.clientWidth
        ) {
          jobCarouselRef.current.scrollLeft = 0;
        }
      }
    }, 2000);
    return () => clearInterval(jobInterval);
  }, []);

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }}>
      <section>
        <div className='height-150 bg-primary text-white text-center d-flex align-items-center justify-content-center' style={{ height: '200px', background: '#007bff' }}>
          <h1 className='fw-bold display-4'>Explore Internships & Courses</h1>
        </div>
      </section>
      
      <section className='trending-courses my-5'>
        <Container>
          <h2 className='text-center text-primary fw-bold mb-4' style={{ fontSize: '2rem' }}>Trending Courses</h2>
          <Row className='d-flex flex-wrap justify-content-center'>
            {courses.map((course) => (
              <Col key={course._id} xs={12} sm={6} md={4} lg={3} className='p-2'>
                <div 
                  className='course-card-custom shadow-sm p-3 bg rounded text-center'
                  style={{
                    transition: 'transform 0.3s ease-in-out',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  onClick={() => navigate(`/courses/${course._id}`)}
                >
                  <h3 className='fw-semibold text-primary' style={{ fontSize: '1.5rem' }}>{course.courseTitle}</h3>
                  <p className='text-muted' style={{ fontSize: '1rem' }}>{course.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      <section>
        <Container fluid className='job-carousel-container py-4'>
          <Row className='flex-nowrap overflow-auto' ref={jobCarouselRef} style={{ scrollBehavior: 'smooth', whiteSpace: 'nowrap' }}>
            {jobs.slice(0, 8).map((job) => (
              <Col key={job._id} xs={12} sm={6} md={4} lg={3} xl={3} className='d-flex justify-content-center p-2'>
                <Card
                  className='job-card-custom shadow-sm'
                  title={job.title}
                  role={job.position || 'Role Not Specified'}
                  location={job.location || 'Location Not Specified'}
                  company={job.company?.name || 'Company Not Specified'}
                  duration={job.duration || 'Duration Not Specified'}
                  startsOn={job.startsOn || 'Start Date Not Specified'}
                  onClick={() => navigate(`/job-info/${job._id}`)}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      <Container className='my-5'>
        <h1 className='text-center text-primary fw-bold mb-4' style={{ fontSize: '2rem' }}>Job Listings</h1>
        {jobs.length > 0 ? (
          <ul className='list-group shadow-sm'>
            {jobs.map((job) => (
              <li key={job._id} className='list-group-item p-3'>
                <h3 className='fw-semibold text-dark' style={{ fontSize: '1.5rem' }}>{job.title}</h3>
                <p className='text-muted' style={{ fontSize: '1rem' }}>{job.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center text-muted' style={{ fontSize: '1.2rem' }}>No job records found.</p>
        )}
      </Container>
      
      <footer className='text-center py-3' style={{ background: '#343a40', color: '#ffffff', fontFamily: 'Lora, serif', fontSize: '1.2rem' }}>
        @skilledity 2025
      </footer>
    </div>
  );
};

export default HomeScreen;
