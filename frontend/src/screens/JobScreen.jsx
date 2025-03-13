import { useState } from 'react';
import { useGetJobsQuery } from '../slices/jobsApiSlice';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../components/styles/JobScreen.css';
import Loader from '../components/Loader';
import ErrorScreen from './ErrorScreen';

const JobCategories = ({ selectedCategories, toggleCategory }) => {
  const categories = [
    'Software', 'AI/ML', 'Data Science', 'Cloud',
    'DevOps', 'Security', 'Frontend', 'Backend'
  ];

  return (
    <div className="categories-grid">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`category-item ${selectedCategories.includes(category) ? 'selected' : ''}`}
          onClick={() => toggleCategory(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

const JobScreen = () => {
  const { data, error, isLoading } = useGetJobsQuery();
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 18;
  const navigate = useNavigate();

  if (isLoading) return <Loader text="Loading jobs..." />;
  if (error) return <ErrorScreen message="Failed to load jobs. Please try again." retry={() => window.location.reload()} />;

  const jobs = data?.jobs || [];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const filteredJobs = jobs.filter((job) =>
    (selectedCategories.length === 0 || selectedCategories.includes(job.category)) &&
    job.title.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOrder === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return 0; // No sorting for 'all'
    }
  });

  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = sortedJobs.slice(startIndex, startIndex + jobsPerPage);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  return (
    <div className="job-page-container" style={{ fontFamily: 'Poppins, sans-serif', backgroundColor: '#f8f9fa' }}>
      <div className="categories-section">
        <h2 className="job-categories-title mb-5">Categories</h2>
        <JobCategories selectedCategories={selectedCategories} toggleCategory={toggleCategory} />
      </div>

      <div className="main-content">
        <div className="search-container">
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search for jobs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className="filter-dropdown-container">
            <select
              className="form-select sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="all">All</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        <div className="jobs-grid">
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <Card
                key={job._id}
                className="job-card-custom"
                title={job.title}
                role={job.position || 'Role Not Specified'}
                location={job.location || 'Location Not Specified'}
                company={job.company?.name || 'Company Not Specified'}
                duration={job.duration || 'Duration Not Specified'}
                startsOn={job.startsOn || 'Start Date Not Specified'}
                onClick={() => navigate(`/job-info/${job._id}`)}
              />
            ))
          ) : (
            <div className="no-jobs-message">No job records found.</div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button
                      onClick={() => handlePageChange(i + 1)}
                      className="page-link"
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

JobCategories.propTypes = {
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleCategory: PropTypes.func.isRequired,
};

export default JobScreen;
