import { useParams } from 'react-router-dom';
import { useGetCourseDetailWithStatusQuery } from '../slices/coursePurchaseApiSlice';
import { Link } from 'react-router-dom';
import Loader from "../components/Loader";
import ErrorScreen from "../screens/ErrorScreen";

const CourseInfo = () => {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <Loader text="Loading course details..." />;
  if (error) return <ErrorScreen message={`Failed to load course: ${error.message}`} navigateTo="/courses" />;

  
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

        {/* Badges */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded">
            <div className="card-body p-4">
            {course.course.badges && course.course.badges.length > 0 ? (
                course.course.badges.map((badge) => (
                  <div key={badge._id} style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '90px'
                  }}>
                    {badge.imageUrl ? (
                      <img 
                        src={badge.imageUrl} 
                        alt={badge.title} 
                        style={{ 
                          width: '85px', 
                          height: '75px', 
                          borderRadius: '10px',
                          objectFit: 'contain'
                        }} 
                      />
                    ) : (
                      <div style={{ 
                        width: '90px', 
                        height: '80px', 
                        background: '#E6E6E6',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                      }}>
                        No Image
                      </div>
                    )}
                    <p style={{ 
                      fontSize: '12px', 
                      textAlign: 'center',
                      marginTop: '5px',
                      fontWeight: '500'
                    }}>
                      {badge.title}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <span style={{ width: '90px', height: '80px', background: '#E6E6E6', borderRadius: '10px' }}></span>
                  <span style={{ width: '90px', height: '80px', background: '#E6E6E6', borderRadius: '10px' }}></span>
                </>
              )}
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
