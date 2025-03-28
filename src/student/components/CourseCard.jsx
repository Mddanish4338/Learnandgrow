const CourseCard = ({ course, studentId, onEnroll, isEnrolled }) => {
  return (
    <div className="bg-gray-100 shadow-lg rounded-xl p-4 w-[300px] sm:w-80 md:w-96 mx-auto">
      {/* Instructor Info */}
      <div className="flex items-center space-x-3">
        <img
          src={course.instructorImg}
          alt={course.instructor}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
        />
        <div>
          <h2 className="text-base sm:text-lg font-semibold">{course.instructor}</h2>
          <p className="text-gray-500 text-xs sm:text-sm">{course.title}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-3 flex flex-wrap gap-1 sm:gap-2">
        {course.skills ? (
          (Array.isArray(course.skills) ? course.skills : course.skills.split(","))
            .map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md">
                {skill.trim()}
              </span>
            ))
        ) : (
          <span className="text-gray-500 text-sm">No skills listed</span>
        )}
      </div>

      {/* Course Info */}
      <div className="mt-4 flex justify-between text-center">
        <div className="text-left">
          <p className="text-base sm:text-lg font-bold">{course.duration}</p>
          <p className="text-xs text-gray-500">Duration</p>
        </div>
        <div className="text-right">
          <p className="text-base sm:text-lg font-bold">{course.price}</p>
          <p className="text-xs text-gray-500">Price</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between items-center">
        <a
          href={course.chatLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-600 transition-all ease-in duration-300"
        >
          + Chat with Tutor
        </a>

        {/* Enroll Button */}
        <button
          onClick={() => !isEnrolled && studentId && onEnroll(course.id, studentId)}
          className={`text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg transition-all ease-in duration-300
            ${isEnrolled ? "bg-green-100 text-green-700 font-thin cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-500"}
          `}
          disabled={isEnrolled || !studentId}
        >
          {isEnrolled ? "Enrolled" : "Enroll"}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
