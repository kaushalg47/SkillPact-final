import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../slices/courseApiSlice";
import ReactPlayer from "react-player";

const CourseInfo = () => {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useGetCourseByIdQuery(courseId);

  if (isLoading)
    return <p className="text-center text-lg">Loading course details...</p>;
  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  const thisCourse = course.course;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      {/* Course Title */}
      <h1 className="text-4xl font-bold text-gray-900">
        {thisCourse.courseTitle}
      </h1>
      <span className="text-sm text-gray-600 bg-gray-200 px-3 py-1 rounded-md mt-2 inline-block">
        {thisCourse.category || "N/A"}
      </span>

      {/* Layout: Course Details (Left) & Video Section (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6">
        {/* Course Details Section */}
        <div className="md:col-span-2 space-y-6">
          <p className="text-lg text-gray-700">
            {thisCourse.description || "No description available."}
          </p>

          <hr className="border-gray-300" />

          <h3 className="text-xl font-semibold">Key Takeaways</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Understand Docker and containerization</li>
            <li>Create and manage containers, images, and Dockerfiles</li>
            <li>Use Docker Compose for multi-container applications</li>
            <li>Deploy and scale applications in production</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4">Prerequisites</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Basic understanding of command-line operations</li>
            <li>
              Familiarity with software development or system administration
            </li>
          </ul>
        </div>

        {/* Video & Price Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          {/* Dummy Video URL */}
          <ReactPlayer
            url="public/videos/Dummy1" // Dummy Video URL
            controls
            width="100%"
            height="200px"
          />

          <h3 className="text-lg font-semibold mt-4">
            {thisCourse.courseTitle}
          </h3>
          <p className="text-gray-700 font-medium text-xl mt-2">
            ₹{thisCourse.price || "N/A"}
          </p>

          {/* Bright Light Blue Button */}
          <button
            onClick={() => navigate(`/courses/${courseId}/course-progress`)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-4 hover:bg-blue-600 transition duration-300"
          >
            Continue Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
