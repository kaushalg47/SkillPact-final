import React, { useState } from 'react';
import { useGetJobsQuery } from '../slices/jobsApiSlice';
import Card from '../components/Card'; // Adjust the path as necessary

const JobScreen = () => {
  const { data, error, isLoading } = useGetJobsQuery();
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error: {error.message}</div>;

  // Access the `jobs` array from the API response
  const jobs = data?.jobs || [];

  // Filter jobs based on title
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort jobs by title
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
      <div className="d-flex vh-100">
        {/* Filter and Sort Panel */}
        <div className="p-3">
          <div className="border p-3 h-100 sticky-top">
            <h5>Filter & Sort</h5>
            <div className="mb-3">
              <label htmlFor="filter" className="form-label">Search by Title</label>
              <input
                type="text"
                id="filter"
                className="form-control"
                placeholder="Search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="sortOrder" className="form-label">
                Sort by Title
              </label>
              <select
                id="sortOrder"
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="flex-grow-1 overflow-auto p-3">
          <h1 className="mb-4">Job Listings</h1>
          {sortedJobs.length > 0 ? (
            <div className="row">
              {sortedJobs.map((job) => (
                <div key={job._id} className="col-md-4 mb-4">
                  <Card
                    image="https://via.placeholder.com/150" // Replace with dynamic image if available
                    title={job.title}
                    role={job.role || 'Role Not Specified'}
                    location={job.location || 'Location Not Specified'}
                    company={job.company || 'Company Not Specified'}
                    onApply={() => console.log(`Applied to ${job.title}`)} // Replace with your apply function
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-5">No job records found.</div>
          )}
        </div>
      </div>
  );
};

export default JobScreen;
