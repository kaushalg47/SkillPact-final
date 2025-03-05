import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useGetCourseByIdQuery, useGetCourseLectureQuery } from '../slices/courseApiSlice';

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
      // Update progress after marking the lecture as viewed
      handleViewProgress();
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  }

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

  const checkCourseCompletion = (progressData) => {
    if (progressData.data?.progress.length === lectures?.lectures?.length) {
      setCourseCompleted(true);
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

  if (courseLoading || lecturesLoading) return <p>Loading course content...</p>;
  if (courseError) return <p>Error: {courseError.message}</p>;
  if (lecturesError) return <p>Error: {lecturesError.message}</p>;

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
          <li key={video._id} className={`list-group-item list-group-item-action ${index === currentVideo ? 'active' : ''}`} onClick={() => setCurrentVideo(index)}>
            {video.lectureTitle}
          </li>
        ))}
      </ul>
      {courseCompleted && (
        <div className="alert alert-success mt-4 d-flex align-items-center">
        <img 
          src={course?.course?.badges[0]?.imageUrl} // Ensure the first badge image URL is used
          alt="Badge"
          className="me-2"
          style={{ width: "30px", height: "30px" }}
        />
        Congrats on completing this course!
      </div>
      )}
    </div>
  );
};

export default CourseVideos;
