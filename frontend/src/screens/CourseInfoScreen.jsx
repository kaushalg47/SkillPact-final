import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from '../slices/courseApiSlice';
import { Link } from 'react-router-dom';

const CourseInfo = () => {
  const { courseId } = useParams(); // Extract courseId from the URL
  const { data: course, isLoading, error } = useGetCourseByIdQuery(courseId);

  if (isLoading) return <p>Loading course details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-5 mb-5">
      <header className="bg-dark text-white p-3">
        <h2>{course.course.courseTitle}</h2>
        <p>{course.course.category || 'N/A'}</p>
      </header>

      <section className="mt-3">
        <h5>Description</h5>
        <p>{course.course.description || 'No description available.'}</p>
      </section>

      <section className="mt-3">
        <h5>Key Takeaways</h5>
        <ul>
          {course.course.takeaways?.map((item, index) => (
            <li key={index}>{item}</li>
          )) || <li>No takeaways available.</li>}
        </ul>
      </section>

      <section className="mt-3">
        <h5>Prerequisites</h5>
        <ul>
          {course.course.prerequisites?.map((item, index) => (
            <li key={index}>{item}</li>
          )) || <li>No prerequisites listed.</li>}
        </ul>
      </section>

      <section className="mt-3" style={{ maxWidth: '600px', margin: 'auto' }}>
        <video width="100%" height="300px" controls>
          <source src={course.course.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className="mt-3">
        <h5>Price</h5>
        <p><strong>₹{course.course.price || 'N/A'}</strong></p>
      </section>

      <Link to={`/course-content/${courseId}`} className="btn btn-secondary mt-3">
        Continue Course
      </Link>
    </div>
  );
};

export default CourseInfo;
