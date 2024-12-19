
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Spinner } from 'react-bootstrap';
import { useGetJobByIdQuery } from '../slices/jobsApiSlice'; // Import the query hook

const JobDetailPage = () => {
  const { jobId } = useParams(); // Get the jobId from the route parameters
  const navigate = useNavigate(); // For navigation

  // Fetch job data based on the jobId using the hook
  const { data, error, isLoading } = useGetJobByIdQuery(jobId);
  const job = data?.job;

  // Handle Apply button click (for example, navigate to the application page)
  const handleApply = () => {
    if (job) {
      navigate(`/apply/${jobId}`); // Navigate to the application page
    }
  };

  // Display a loading spinner while fetching data
  if (isLoading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // Display error message if something goes wrong
  if (error) {
    return (
      <div className="alert alert-danger text-center my-5">
        {error?.message || 'Failed to load job details'}
      </div>
    );
  }

  // Ensure job exists before rendering the content
  if (!job) {
    return (
      <div className="alert alert-warning text-center my-5">
        No job details found.
      </div>
    );
  } 

  return (
    <div className="container mt-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white text-center">
          <h2>{job.title}</h2>
        </Card.Header>
        <Card.Body>
          <div className="mb-4">
            <h5>Company:</h5>
            <p>{job.company}</p>
          </div>
          <div className="mb-4">
            <h5>Location:</h5>
            <p>{job.location}</p>
          </div>
          <div className="mb-4">
            <h5>Job Description:</h5>
            <p>{job.description}</p>
          </div>
          <div className="mb-4">
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
          <div className="text-center">
            <Button variant="success" size="lg" onClick={handleApply}>
              Apply Now
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobDetailPage;
