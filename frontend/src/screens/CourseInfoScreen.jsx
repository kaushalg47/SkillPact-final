import { useParams } from 'react-router-dom';
import { useGetCourseDetailWithStatusQuery } from '../slices/coursePurchaseApiSlice';
import { Link } from 'react-router-dom';

const CourseInfo = () => {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useGetCourseDetailWithStatusQuery(courseId);
  const badge = course?.course?.badges || "'";

  if (isLoading) return <p className="text-center mt-5">Loading course details...</p>;
  if (error) return <p className="text-danger text-center mt-5">Error: {error.message}</p>;

  return (
    <div className="container mt-5 mb-5">
      {/* Course Header */}
      <div className="card shadow-sm border-0 rounded">
        <div className="card-body text-white bg-dark p-4 rounded-top">
          <h2 className="fw-bold">{course.course.courseTitle}</h2>
          <span className="badge bg-grey fs-6">{course.course.category || 'N/A'}</span>
        </div>
      </div>

      {/* Course Description */}
      <div className="card mt-4 shadow-sm border-0 rounded">
        <div className="card-body p-4">
          <h5 className="fw-bold">Description</h5>
          <p className="text-muted">{course.course.description || 'No description available.'}</p>
        </div>
      </div>

      {/* Course Details */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded">
            <div className="card-body p-4">
              <h5 className="fw-bold">Course Level</h5>
              <p className="text-muted">{course.course.courseLevel}</p>
              <h5 className="fw-bold mt-3">Enrolled Students</h5>
              <p className="text-muted">{course.course.enrolledstudents?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded">
            <div className="card-body p-4">
              <img src={badge.imageUrl} alt={badge.title} className="img-fluid mb-2" />
              <h6 className="card-title">{badge.title}</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Video Preview */}
      <div className="card mt-4 shadow-sm border-0 rounded">
        <div className="card-body p-4 text-center">
          <h5 className="fw-bold mb-3">Course Preview</h5>
          <video width="100%" height="300px" controls className="rounded">
            <source src={course.course.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Pricing & Action */}
      <div className="card mt-4 shadow-sm border-0 rounded">
        <div className="card-body p-4 text-center">
          <h5 className="fw-bold">Price</h5>
          <p className="fs-4 text-success fw-bold">₹{course.course.coursePrice || 'N/A'}</p>

          {course.purchased ? (
            <Link to={`/course-content/${courseId}`} className="btn btn-secondary btn-lg mt-3">
              Continue Course
            </Link>
          ) : (
            <Link to={`/course-content/${courseId}`} className="btn btn-primary btn-lg mt-3">
              Buy Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
