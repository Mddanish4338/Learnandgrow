import { useEffect, useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import CourseCard from "./components/CourseCard";
import JobFilter from "./components/ui/JobFilter";
import JobCard from "./components/JobCard";
import CourseFilter from "./components/ui/CourseFilter";
import AppliedJobs from "./components/AppliedJobs";
import BottomNavigation from "./components/BottomNavigation";
import StudentProfile from "./components/StudentProfile";
import { useAuth } from "../context/AuthContext";
import {
  getStudentById,
  getEnrolledCourses,
  getAllCourses,
  getAllJobs,
  getAppliedJobs,
} from "../services/studentService";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]); // This holds ALL courses before filtering
  const [courseFilters, setCourseFilters] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const [jobFilters, setJobFilters] = useState({});
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]); // Store all jobs before filtering
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch student data
  useEffect(() => {
    const fetchStudentData = async () => {
      if (user?.uid) {
        const studentData = await getStudentById(user.uid);
        setStudent(studentData);
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [user?.uid]);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getAllCourses(); // Replace with your API call
        setAllCourses(coursesData || []); // Store all courses separately
        setCourses(coursesData || []); // Initially, set courses to all courses
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Fetch all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getAllJobs();
        setAllJobs(jobsData || []);
        setJobs(jobsData || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);



  // Fetch enrolled courses & applied jobs when student data is available
  useEffect(() => {
    if (!student?.id) return;
    const fetchUserData = async () => {
      const [enrolled, applied] = await Promise.all([
        getEnrolledCourses(student.id),
        getAppliedJobs(student.id),
      ]);
      setEnrolledCourses(enrolled || []);
      setAppliedJobs(applied || []);
    };
    fetchUserData();
  }, [student?.id]);

  // Filter courses based on applied filters
  useEffect(() => {
    setCourses(
      allCourses.filter((course) => {
        if (courseFilters.instructor && !course.instructor.toLowerCase().includes(courseFilters.instructor.toLowerCase())) {
          return false;
        }

        // Ensure skills exist and is an array before using `.some()`
        if (courseFilters.skill && (!Array.isArray(course.skills) || !course.skills.some(skill => skill.toLowerCase().includes(courseFilters.skill.toLowerCase())))) {
          return false;
        }

        if (courseFilters.duration && parseInt(course.duration) !== parseInt(courseFilters.duration)) {
          return false;
        }

        if (courseFilters.priceMin && courseFilters.priceMax) {
          if (course.price < parseInt(courseFilters.priceMin) || course.price > parseInt(courseFilters.priceMax)) {
            return false;
          }
        }

        return true;
      })
    );
  }, [courseFilters, allCourses]);
  // allCourses dependency ensures filtering is applied correctly


  // Filter jobs based on applied filters
  useEffect(() => {
    setJobs(
      allJobs.filter((job) => {
        if (jobFilters.location && !job.location.toLowerCase().includes(jobFilters.location.toLowerCase())) return false;
        if (jobFilters.duration && !job.duration.toLowerCase().includes(jobFilters.duration.toLowerCase())) return false;
        if (jobFilters.salary && job.salary < parseInt(jobFilters.salary)) return false;
        if (jobFilters.profile && !job.profile.toLowerCase().includes(jobFilters.profile.toLowerCase())) return false;
        return true;
      })
    );
  }, [jobFilters, allJobs]);

  // Render filter component based on active tab
  const renderFilterContent = () =>
    activeTab === "jobs" ? <JobFilter setFilters={setJobFilters} /> : <CourseFilter setCourseFilters={setCourseFilters} />;

  const getWelcomeMessage = () => {
    const messages = {
      dashboard: { title: `Hello, ${student?.firstName || "Student"}! 👋`, message: "Welcome back! Here's your progress and updates at a glance." },
      explore: { title: "Discover New Courses 🎓", message: "Browse through a variety of courses and find what suits you best!" },
      enrolled: { title: "Your Enrolled Courses 📚", message: "Keep track of your enrolled courses and continue learning." },
      jobs: { title: "Find Your Dream Job 💼", message: "Explore job opportunities and apply to the best-suited ones." },
      applied: { title: "Track Your Job Applications 📂", message: "Monitor your job application progress in real time." },
      notifications: { title: "Important Messages 📩", message: "Check your notifications for important updates." },
    };
    return messages[activeTab] || messages.dashboard;
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed w-64 h-screen">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 p-4 overflow-y-auto h-full bg-gray-200">
        {activeTab !== "profile" && (
          <div className="mb-3 bg-gradient-to-tr from-sky-400 to-sky-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold">{getWelcomeMessage().title}</h2>
            <p className="mt-1 text-gray-200">{getWelcomeMessage().message}</p>
          </div>
        )}

        {/* Dashboard Stats */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {/* Progress Card */}
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
              <h3 className="text-lg font-semibold">Course Progress</h3>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Enrolled Courses: 5</p>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <p className="text-sm mt-1 text-gray-600">65% Completed</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold">Completed Courses</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">8</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold">Active Enrollments</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">3</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold">Saved Jobs</h3>
              <p className="text-2xl font-bold text-yellow-600 mt-2">12</p>
            </div>
          </div>
        )}

        {/* Explore Courses */}
        {activeTab === "explore" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {courses.map((course) => <CourseCard key={course.id} course={course} />)}
            </div>
            <CourseFilter setCourseFilters={setCourseFilters} />
          </div>
        )}

        {/* Jobs Section */}
        {activeTab === "jobs" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 flex flex-col gap-6 mt-6">
              {jobs.map((job) => <JobCard key={job.id} job={job} />)}
            </div>
            <JobFilter setFilters={setJobFilters} />
          </div>
        )}

        {/* Profile Section */}
        {activeTab === "profile" && (
          <div className="flex justify-center mt-6">
            <StudentProfile />
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} renderFilterContent={renderFilterContent} />
    </div>
  );
};

export default Dashboard;
