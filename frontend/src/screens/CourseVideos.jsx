import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useGetCourseByIdQuery } from '../slices/courseApiSlice';


const CourseVideos = () => {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useGetCourseByIdQuery(courseId);
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

  if (isLoading) return <p>Loading course content...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const dummyVideos = [
    { id: 1, title: 'Introduction to React', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 2, title: 'React Components', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 3, title: 'State and Props', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 4, title: 'React Router', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 5, title: 'Hooks in React', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  ];

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-4">Course Content - {course?.title}</h2>
      <button className="btn btn-primary mb-3" onClick={handleViewProgress}>View Course Progress</button>
      {progress && (
        <div className="alert alert-info">Progress: {progress.data?.progress.length || 0} lectures completed</div>
      )}
      <div className="card mb-3">
        <div className="card-body text-center">
          <h5 className="card-title">{dummyVideos[currentVideo].title}</h5>
          <ReactPlayer url={dummyVideos[currentVideo].url} controls width="100%" height="400px" />
        </div>
      </div>
      <h3 className="mt-4">Upcoming Videos</h3>
      <ul className="list-group">
        {dummyVideos.map((video, index) => (
          <li key={video.id} className={`list-group-item list-group-item-action ${index === currentVideo ? 'active' : ''}`} onClick={() => setCurrentVideo(index)}>
            {video.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseVideos;
