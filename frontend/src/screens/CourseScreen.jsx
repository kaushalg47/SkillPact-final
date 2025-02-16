import { useState } from 'react';
import { useGetCoursesQuery } from '../slices/courseApiSlice';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import '../components/styles/CourseScreen.css';

const CourseScreen = () => {
  const { data, error, isLoading } = useGetCoursesQuery();
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">Error: {error.message}</div>;

  const courses = data?.courses || [];

  // Filter courses based on title
  const filteredCourses = courses.filter((course) =>
    course.courseTitle.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort courses by title
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.courseTitle.localeCompare(b.courseTitle)
      : b.courseTitle.localeCompare(a.courseTitle);
  });

  return (
    <div className="course-page-container">
      <div className="course-main-content">
        <div className="course-search-container">
          <input
            type="text"
            className="course-search-bar"
            placeholder="Search for courses..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <div className="filter-dropdown-container">
            <button
              className="course-filter-button"
              onClick={() => setShowFilter(!showFilter)}
            >
              <FaFilter size={20} />
            </button>
            {showFilter && (
              <div className="course-filter-dropdown">
                <select
                  className="course-sort-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="course-grid">
          {sortedCourses.length > 0 ? (
            sortedCourses.map((course) => (
              <Card
                key={course._id}
                className="course-card-custom"
                image="https://placehold.co/400"
                title={course.courseTitle}
                role={course.role || "Role Not Specified"}
                location={course.location || "Location Not Specified"}
                company={course.company || "Company Not Specified"}
                onClick={() => navigate(`/courses/${course._id}`)}
              />
            ))
          ) : (
            <div className="no-courses-message">No course records found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseScreen;