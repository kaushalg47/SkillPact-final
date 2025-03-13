import { useState } from 'react';
import { useGetCoursesQuery } from '../slices/courseApiSlice';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import '../components/styles/CourseScreen.css';
import Loader from "../components/Loader";
import ErrorScreen from "../screens/ErrorScreen";

const CourseScreen = () => {
  const { data, error, isLoading } = useGetCoursesQuery();
  console.log(data || "nothing");
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  if (isLoading) return <Loader text="Loading courses..." />;
  if (error) return <ErrorScreen message="Failed to load courses." retry={() => window.location.reload()} />;

  const courses = data?.courses || [];
  const categories = ['All', 'software', 'AI/ML', 'Blockchain']; // Replace with actual categories

  // Filter courses based on title and category
  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesFilter = course.courseTitle.toLowerCase().includes(filter.toLowerCase());
    return matchesCategory && matchesFilter;
  });

  // Sort courses by title
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    return sortOrder === 'asc'
      ? a.courseTitle.localeCompare(b.courseTitle)
      : b.courseTitle.localeCompare(a.courseTitle);
  });

  return (
    <div className="course-page-container" style={{ backgroundColor: '#f8f9fa' }}>
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
        <div className="mb-3 text-start">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn btn-outline-primary me-3 ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <center><h3 className='my-5 text-start'>Get top courses</h3></center>

        

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