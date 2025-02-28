import { useGetJobsQuery } from '../slices/jobsApiSlice';

const HomeScreen = () => {
  const { data, error, isLoading } = useGetJobsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Access the `jobs` array from the API response
  const jobs = data?.jobs || [];

  return (
    <div>
      <section>
        <div></div>
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
