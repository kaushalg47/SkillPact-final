import { useState } from "react";
import { useGetCoursesQuery } from "../slices/courseApiSlice";
import Card from "../components/Card"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";

const CourseScreen = () => {
  const { data, error, isLoading } = useGetCoursesQuery();
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  {
    isLoading ? " ":" "
  }
  
  if (error)
    return (
      <div className="text-center mt-5 text-danger">Error: {error.message}</div>
    );

  // Access the `courses` array from the API response
  const courses = data?.courses || [];

  // Filter courses based on title
  const filteredCourses = courses.filter((course) =>
    course.courseTitle.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort courses by title
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.courseTitle.localeCompare(b.courseTitle);
    } else {
      return b.courseTitle.localeCompare(a.courseTitle);
    }
  });

  return (
    <div className="container">
      <div className="p-5">
        <input
          type="text"
          id="filter"
          className="form-control"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="d-flex vh-100">
        {/* Filter and Sort Panel */}
        <div className="p-3">
          <div className="border p-3 h-100 sticky-top">
            <h5>Filter & Sort</h5>
            <div className="mb-3">
              <label htmlFor="filter" className="form-label">
                Search by Title
              </label>
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

        {/* Course Listings */}
        <div className="flex-grow-1 overflow-auto p-3">
          <h1 className="mb-4">Course Listings</h1>
          {sortedCourses.length > 0 ? (
            <div className="row">
              {sortedCourses.map((course) => (
                <div key={course._id} className="col-md-4 mb-4">
                  <Card
                    image="https://placehold.co/400" // Replace with dynamic image if available
                    title={course.courseTitle}
                    role={course.role || "Role Not Specified"}
                    location={course.location || "Location Not Specified"}
                    company={course.company || "Company Not Specified"}
                    onApply={() => navigate(`/courses/${course._id}`)} // Replace with your apply function
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-5">No course records found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseScreen;
