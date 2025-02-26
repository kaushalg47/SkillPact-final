import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useGetCourseByIdQuery } from '../slices/courseApiSlice';

const CourseVideos = () => {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useGetCourseByIdQuery(courseId);
  const [currentVideo, setCurrentVideo] = useState(0);

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
      <h2 className="text-center mb-4">Course Content - {course.title}</h2>
      <div className="card mb-3">
        <div className="card-body text-center">
          <h5 className="card-title">{dummyVideos[currentVideo].title}</h5>
          <ReactPlayer url={dummyVideos[currentVideo].url} controls width="100%" height="400px" />
        </div>
      </div>
      <h3 className="mt-4">Upcoming Videos</h3>
      <ul className="list-group">
        {dummyVideos.map((video, index) => (
          index !== currentVideo && (
            <li key={video.id} className="list-group-item list-group-item-action" onClick={() => setCurrentVideo(index)}>
              {video.title}
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default CourseVideos;
