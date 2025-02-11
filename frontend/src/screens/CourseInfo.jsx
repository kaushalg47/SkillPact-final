import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from '../slices/courseApiSlice';

const CourseInfo = () => {
  const { courseId } = useParams(); // Extract courseId from the URL
  const { data: course, isLoading, error } = useGetCourseByIdQuery(courseId);

  if (isLoading) return <p>Loading course details...</p>;
  if (error) return <p>Error: {error.message}</p>;


  // Render course details in a card
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-center">
          <h3>{course.course.courseTitle}</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">Category: {course.course.category || 'N/A'}</h5>
          <p className="card-text">
            <strong>Description:</strong> {course.category || 'No description available.'}
          </p>

        </div>
        <div className="card-footer text-muted text-center">
          Last updated: {new Date(course.course.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
