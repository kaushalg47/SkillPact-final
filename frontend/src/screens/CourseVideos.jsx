import { useState } from "react";

const CourseVideos = ({ course }) => {
  // Assuming `course` has a `videos` array with video details
  const [completedVideos, setCompletedVideos] = useState(
    course.videos.map((video) => ({ ...video, completed: false }))
  );

  const handleToggle = (index) => {
    const updatedVideos = [...completedVideos];
    updatedVideos[index].completed = !updatedVideos[index].completed;
    setCompletedVideos(updatedVideos);
  };

  const completedCount = completedVideos.filter((video) => video.completed)
    .length;
  const totalCount = completedVideos.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="container mt-5">
      <h2>{course.courseTitle} - Course Videos</h2>

      {/* Progress Bar */}
      <div className="my-4">
        <h5>Progress</h5>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progressPercentage}%` }}
            aria-valuenow={progressPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progressPercentage}%
          </div>
        </div>
      </div>

      {/* Video List */}
      <ul className="list-group">
        {completedVideos.map((video, index) => (
          <li key={video.id} className="list-group-item d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input me-3"
              checked={video.completed}
              onChange={() => handleToggle(index)}
            />
            <div>
              <h6>{video.title}</h6>
              <small>{video.description || "No description available"}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseVideos;
