import { useState } from 'react';
import { useGetJobsQuery } from '../slices/jobsApiSlice';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import PropTypes from 'prop-types'; // Importing PropTypes
import '../components/styles/JobScreen.css';

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
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error: {error.message}</div>;

  const jobs = data?.jobs || [];

  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category) // Remove if already selected
        : [...prev, category] // Add if not selected
    );
  };

  // Filtering jobs based on selected categories
  const filteredJobs = jobs.filter((job) =>
    (selectedCategories.length === 0 || selectedCategories.includes(job.category)) &&
    job.title.toLowerCase().includes(filter.toLowerCase())
  );

  // Sorting logic
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  return (
    <div className="job-page-container">
      <div className="categories-section">
        <h2 className="job-categories-title">Job Categories</h2>
        <JobCategories selectedCategories={selectedCategories} toggleCategory={toggleCategory} />
      </div>

      <div className="main-content">
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for jobs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            className="filter-button"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FaFilter size={20} />
          </button>
        </div>

        {showFilter && (
          <div className="filter-container">
            <select
              className="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        )}

        <div className="jobs-grid">
          {sortedJobs.length > 0 ? (
            sortedJobs.map((job) => (
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
      </div>
    </div>
  );
};
JobCategories.propTypes = {
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  toggleCategory: PropTypes.func.isRequired,
};

// PropTypes validation for JobCategories component
JobCategories.propTypes = {
  selectedCategories: PropTypes.array.isRequired,
  toggleCategory: PropTypes.func.isRequired,
};

export default JobScreen;
