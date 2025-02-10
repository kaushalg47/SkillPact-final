import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const CourseProgress = () => {
  const { courseId } = useParams();

  // Dummy lecture list
  const lectures = [
    { id: 1, title: "Introduction to Docker and Containerization", url: "/videos/sample-video.mp4" },
    { id: 2, title: "Setting Up Your Docker Environment", url: "/videos/sample-video.mp4" },
    { id: 3, title: "Understanding Docker Images and Containers", url: "/videos/sample-video.mp4" },
    { id: 4, title: "Building Custom Docker Images with Dockerfile", url: "/videos/sample-video.mp4" },
    { id: 5, title: "Managing Multi-Container Applications with Docker Compose", url: "/videos/sample-video.mp4" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-900">Mastering Docker: From Beginner to Pro</h1>

      {/* Grid Layout: Video on Left, Lecture List on Right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        
        {/* Video Player Section */}
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-lg shadow-md">
          <ReactPlayer 
            url={lectures[0].url} // First video in the list
            controls 
            width="100%" 
            height="400px" 
          />
          <p className="text-lg font-semibold mt-4">Lecture 1: {lectures[0].title}</p>
        </div>

        {/* Lecture List */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Course Lectures</h2>
          <ul className="space-y-3">
            {lectures.map((lecture) => (
              <li key={lecture.id} className="flex items-center justify-between p-3 bg-white shadow-sm rounded-md hover:bg-gray-100 transition">
                <span className="text-gray-700">{lecture.title}</span>
                <button className="text-blue-500 hover:text-blue-600 transition">
                  ▶
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
