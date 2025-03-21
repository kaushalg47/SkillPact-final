import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useGetCourseByIdQuery, useGetCourseLectureQuery } from '../slices/courseApiSlice';
import Loader from "../components/Loader";
import ErrorScreen from "../screens/ErrorScreen";

const CourseVideos = () => {
  const { courseId } = useParams();
  const { data: course, isLoading: courseLoading, error: courseError } = useGetCourseByIdQuery(courseId);
  const { data: lectures, isLoading: lecturesLoading, error: lecturesError } = useGetCourseLectureQuery(courseId);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseCompleted, setCourseCompleted] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/course-progress/${courseId}`);
        const data = await response.json();
        setProgress(data);
        checkCourseCompletion(data);
      } catch (err) {
        console.error('Error fetching progress:', err);
      }
    };
    fetchProgress();
  }, [courseId]);

  const handleVideoEnd = async (lectureId) => {
    try {
      await fetch(`/api/course-progress/${courseId}/lecture/${lectureId}/view`, {
        method: 'POST',
      });
      handleViewProgress();
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  const handleViewProgress = async () => {
    try {
      const response = await fetch(`/api/course-progress/${courseId}`);
      const data = await response.json();
      setProgress(data);
      checkCourseCompletion(data);
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  };

  const checkCourseCompletion = async (progressData) => {
    if (progressData.data?.progress.length === lectures?.lectures?.length) {
      setCourseCompleted(true);
      await fetch(`/api/badges/add-badge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ badgeId: course?.course?.badges[0]?._id }),
      });
    }
  };

  const handleNext = () => {
    if (currentVideo < lectures.lectures.length - 1) {
      setCurrentVideo(currentVideo + 1);
    }
  };

  const handlePrevious = () => {
    if (currentVideo > 0) {
      setCurrentVideo(currentVideo - 1);
    }
  };

  if (courseLoading || lecturesLoading) return <Loader text="Loading course content..." />;
  if (courseError) return <ErrorScreen message={`Failed to load course: ${courseError.message}`} navigateTo="/courses" />;
  if (lecturesError) return <ErrorScreen message={`Failed to load lectures: ${lecturesError.message}`} navigateTo="/courses" />;

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Course Content - {course?.course?.courseTitle}</h2>
      
      {progress && lectures && (
        <div className="alert alert-info">Progress: {progress.data?.progress.length || 0}/{lectures?.lectures?.length || 0} lectures completed</div>
      )}
      <div className="card mb-3">
        <div className="card-body text-center">
          <h5 className="card-title">{lectures?.lectures?.[currentVideo]?.lectureTitle}</h5>
          <ReactPlayer 
            url={lectures?.lectures?.[currentVideo]?.videoUrl} 
            controls 
            width="100%" 
            height="400px" 
            onEnded={() => handleVideoEnd(lectures?.lectures?.[currentVideo]?._id)} 
            onReady={() => setLoading(false)}
            onBuffer={() => setLoading(true)}
          />
          {loading && <p>Loading video...</p>}
          <div className="mt-3">
            <button className="btn btn-secondary me-2" onClick={handlePrevious} disabled={currentVideo === 0}>Previous</button>
            <button className="btn btn-secondary" onClick={handleNext} disabled={currentVideo === (lectures?.lectures?.length || 0) - 1}>Next</button>
          </div>
        </div>
      </div>
      <h3 className="mt-4">Upcoming Videos</h3>
      <ul className="list-group">
        {Array.isArray(lectures?.lectures) && lectures.lectures.map((video, index) => (
          <li 
            key={video._id} 
            className={`list-group-item list-group-item-action ${index === currentVideo ? 'active' : ''} ${progress?.data?.progress.includes(video._id) ? 'bg-secondary text-light' : ''}`} 
            onClick={() => setCurrentVideo(index)}
            style={{ cursor: 'pointer' }}
          >
            {video.lectureTitle}
          </li>
        ))}
      </ul>
      {courseCompleted && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <img 
                  src={course?.course?.badges[0]?.imageUrl} 
                  alt="Badge"
                  className="mb-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <h4>Congrats on completing this course!</h4>
                <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseVideos;
