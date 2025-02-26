import { useEffect, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import useCourses from "../hooks/useCourses";
import useJobs from "../hooks/useJobs";
import CourseCard from "./components/CourseCard";
import JobFilter from "./components/ui/JobFilter";
import JobCard from "./components/JobCard";
import CourseFilter from "./components/ui/CourseFilter";
import AppliedJobs from "./components/AppliedJobs";
import BottomNavigation from "./components/BottomNavigation";
import StudentProfile from "./components/StudentProfile";
import { useAuth } from "../context/AuthContext";
import { getStudentById,getEnrolledCourses,getCourseDetails } from "../services/studentService";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [exploreCourses, setExploreCourses] = useState([]); // Available Courses
  const [enrolledCourses, setEnrolledCourses] = useState([]); // Enrolled Courses
  const [courseFilters, setCourseFilters] = useState({}); // Filters

  
  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCourses = async () => {
      const allCourses = await getCourseDetails();
      console.log(exploreCourses) // Function should return an array of courses
      setExploreCourses(allCourses || []);
    };

    fetchAllCourses();
  }, []);



  
  useEffect(() => {
    const fetchStudentData = async () => {
      if (user?.uid) {
        const studentData = await getStudentById(user.uid);
        setStudent(studentData);
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [user.uid]);

  useEffect(() => {
    if (!student?.id) return;

    const fetchEnrolledCourses = async () => {
      const enrolled = await getEnrolledCourses(student.id);
      setEnrolledCourses(enrolled || []);
    };

    fetchEnrolledCourses();
  }, [student?.id]);

  

  
  const { filteredJobs, appliedJobs, setFilters, apply } = useJobs(user);
  // Renders the appropriate filter component in the modal based on active tab.
  const renderFilterContent = () => {
    return activeTab === "jobs" ? <JobFilter setFilters={setFilters} /> : <CourseFilter setCourseFilters={setCourseFilters} />;
  };

  const getWelcomeMessage = () => {
    const messages = {
      dashboard: {
        title: `Hello, ${student?.firstName || "Student"}! 👋`,
        message: "Welcome back! Here's your progress and updates at a glance.",
      },
      explore: {
        title: "Discover New Courses 🎓",
        message: "Browse through a variety of courses and find what suits you best!",
      },
      enrolled: {
        title: "Your Enrolled Courses 📚",
        message: "Keep track of your enrolled courses and continue learning.",
      },
      jobs: {
        title: "Find Your Dream Job 💼",
        message: "Explore job opportunities and apply to the best-suited ones.",
      },
      applied: {
        title: "Track Your Job Applications 📂",
        message: "Monitor your job application progress in real time.",
      },
      notifications: {
        title: "Important Messages 📩",
        message: "Check your notifications for important updates.",
      },
    };

    return messages[activeTab] || messages.dashboard;
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <div className="fixed w-64 h-screen top-0 left-0">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 p-4 overflow-y-auto h-full bg-gray-200">
        {/* Welcome Message */}
        {activeTab !== "profile" && (
          <div className="mb-3 bg-gradient-to-tr from-sky-400 to-sky-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold">{getWelcomeMessage().title}</h2>
            <p className="mt-1 text-gray-200">{getWelcomeMessage().message}</p>
          </div>
        )}

        {/* Dashboard Stats */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold">Course Progress</h3>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Enrolled Courses: {enrolledCourses.length}</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: "65%" }}></div>
                </div>
                <p className="text-sm mt-1 text-gray-600">65% Completed</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold">Completed Courses</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">8</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold">Active Enrollments</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">{enrolledCourses.length}</p>
            </div>
          </div>
        )}

        {/* Explore Courses */}
        {activeTab === "explore" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {exploreCourses.length > 0 ? (
                exploreCourses.map((course) => (
                  <CourseCard key={course.id} course={course}  />
                ))
              ) : (
                <p className="text-gray-500">No available courses.</p>
              )}
            </div>
            <div className="hidden md:block w-full">
              <div className="sticky top-1 p-4">
                <CourseFilter setCourseFilters={setCourseFilters} />
              </div>
            </div>
          </div>
        )}

        {/* Enrolled Courses */}
        {activeTab === "enrolled" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map((course) => (
                  <CourseCard key={course.id} course={course}  />
                ))
              ) : (
                <p className="text-gray-500">You are not enrolled in any courses.</p>
              )}
            </div>
            <div className="hidden md:block w-full">
              <div className="sticky top-1 p-4">
                <CourseFilter setCourseFilters={setCourseFilters} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "applied" && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:mb-10">
            <div className="md:col-span-2 flex flex-col gap-6 mt-6">
              {filteredJobs.length > 0 ? (
                <AppliedJobs jobs={filteredJobs} />
              ) : (
                <p className="text-gray-500">No jobs found.</p>
              )}
            </div>
          </div>
        )}

        {/* Jobs Section */}
        {activeTab === "jobs" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 flex flex-col gap-6 mt-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <p className="text-gray-500">No jobs found.</p>
              )}
            </div>
          </div>
        )}



        {/* Profile Section */}
        {activeTab === "profile" && (
          <div className="flex justify-center mt-6">
            <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md">
              <StudentProfile />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} renderFilterContent={renderFilterContent} />
    </div>
  );
};

export default Dashboard;
