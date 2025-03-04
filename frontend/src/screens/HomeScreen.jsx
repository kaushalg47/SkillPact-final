import { useGetJobsQuery } from '../slices/jobsApiSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import Card from '../components/Card'; // Import your custom Card component

const HomeScreen = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetJobsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Access the `jobs` array from the API response
  const jobs = data?.jobs || [];

  return (
    <div>
      <section>
        <div className='height-150 bg-primary text-white text-center'>
          <h1>Find Internships and Courses</h1>
          </div>
      </section>
      <section>
        <Container fluid className="job-carousel-container">
          <Row className="flex-nowrap overflow-auto">
            {jobs.slice(0, 8).map((job) => (
              <Col key={job._id} xs={12} sm={6} md={4} lg={3} xl={3} className="d-flex justify-content-center">
                <Card
                  className="job-card-custom"
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

      <h1>Job Listings</h1>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No job records found.</p>
      )}
    </div>
  );
};

export default HomeScreen;
