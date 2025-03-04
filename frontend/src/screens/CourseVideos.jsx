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

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/course-progress/${courseId}`);
        const data = await response.json();
        setProgress(data);
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
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  }

  const handleViewProgress = async () => {
    try {
      const response = await fetch(`/api/course-progress/${courseId}`);
      const data = await response.json();
      setProgress(data);
      console.log(data);
    } catch (err) {
      console.error('Error fetching progress:', err);
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
      <h2 className="text-center mb-4">Course Content - {course?.title}</h2>
      <button className="btn btn-primary mb-3" onClick={handleViewProgress}>View Course Progress</button>
      {progress && (
        <div className="alert alert-info">Progress: {progress.data?.progress.length || 0} lectures completed</div>
      )}
      <div className="card mb-3">
        <div className="card-body text-center">
          <h5 className="card-title">{lectures.lectures[currentVideo]?.lectureTitle}</h5>
          <ReactPlayer url={lectures.lectures[currentVideo]?.videoUrl} controls width="100%" height="400px" onEnded={() => handleVideoEnd(lectures.lectures[currentVideo]._id)} />
          <div className="mt-3">
            <button className="btn btn-secondary me-2" onClick={handlePrevious} disabled={currentVideo === 0}>Previous</button>
            <button className="btn btn-secondary" onClick={handleNext} disabled={currentVideo === lectures.lectures.length - 1}>Next</button>
          </div>
        </div>
      </div>
      <h3 className="mt-4">Upcoming Videos</h3>
      <ul className="list-group">
        {Array.isArray(lectures.lectures) && lectures.lectures.map((video, index) => (
          <li key={video._id} className={`list-group-item list-group-item-action ${index === currentVideo ? 'active' : ''}`} onClick={() => setCurrentVideo(index)}>
            {video.lectureTitle}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseVideos;
