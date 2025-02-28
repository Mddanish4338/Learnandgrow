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
  enrollInCourse,
} from "../services/studentService";
import { Button, Card, CardBody, CardHeader, Progress } from "@nextui-org/react";
import { UserCheck } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]); // This holds ALL courses before filtering
  const [courseFilters, setCourseFilters] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filteredEnrolledCourses, setFilteredEnrolledCourses] = useState([]);

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

  const calculateProfileCompletion = (profile) => {
    if (!profile) return 0;

    const fields = ["firstName", "lastName", "email", "phone", "profilePicture", "address"];
    const filledFields = fields.filter((field) => profile[field]);
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const profileCompletion = calculateProfileCompletion(student);

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
    if (!student?.uid) return;

    const fetchUserData = async () => {
      try {
        const [enrolled, applied] = await Promise.all([
          getEnrolledCourses(student.uid),
          getAppliedJobs(student.uid), // ✅ Fetch applied jobs
        ]);

        setEnrolledCourses(enrolled || []);
        setAppliedJobs(applied || []);

        console.log("Applied Jobs:", applied); // Check if data is fetched
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [student?.uid]);



  // Filter courses based on applied filters
  useEffect(() => {
    // Common filter function
    const filterCourses = (courseList) => {
      return courseList.filter((course) => {
        // Ensure course.instructor exists before calling .toLowerCase()
        if (
          courseFilters.instructor &&
          (!course.instructor || !course.instructor.toLowerCase().includes(courseFilters.instructor.toLowerCase()))
        ) {
          return false;
        }

        // Ensure skills exist and is an array or string before using .some()
        if (courseFilters.skill) {
          const skillsArray = Array.isArray(course.skills) ? course.skills : course.skills?.split(",") || [];
          if (!skillsArray.some((skill) => skill.toLowerCase().includes(courseFilters.skill.toLowerCase()))) {
            return false;
          }
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
      });
    };

    // Apply filter to "Explore" tab courses
    setFilteredCourses(filterCourses(allCourses));

    // Apply filter to "Enrolled" tab courses
    setFilteredEnrolledCourses(filterCourses(enrolledCourses));

  }, [courseFilters, allCourses, enrolledCourses]);

  // allCourses dependency ensures filtering is applied correctly


  // Filter jobs based on applied filters
  useEffect(() => {
    setJobs(
      allJobs.filter((job) => {
        if (jobFilters.location && !job.location.toLowerCase().includes(jobFilters.location.toLowerCase()))
          return false;

        if (jobFilters.duration && !job.duration.toLowerCase().includes(jobFilters.duration.toLowerCase()))
          return false;

        if (jobFilters.salary && job.salary < parseInt(jobFilters.salary))
          return false;
        // Filtering based on skillsRequired (checking if any selected skill matches)
        if (jobFilters.skills && jobFilters.skills.length > 0) {
          const jobSkills = job.skillsRequired || []; // Ensure it's an array
          const hasMatchingSkill = jobFilters.skills.some((skill) =>
            jobSkills.includes(skill) // Direct match check
          );
          if (!hasMatchingSkill) return false;
        }

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

  const handleEnroll = async (courseId, studentId) => {
    if (!studentId) {
      console.error("Student ID is missing!");
      return;
    }

    // Check if student is already enrolled in this course
    const isAlreadyEnrolled = enrolledCourses.some((course) => course.id === courseId);

    if (isAlreadyEnrolled) {
      console.warn("Student is already enrolled in this course!");
      return; // Prevent duplicate enrollment
    }

    // Proceed with enrollment
    const success = await enrollInCourse(courseId, studentId);
    if (success) {
      // Refresh enrolled courses
      const updatedEnrolledCourses = await getEnrolledCourses(studentId);
      setEnrolledCourses(updatedEnrolledCourses || []);
    }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enrolled Courses Card */}
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
              <h3 className="text-lg font-semibold">Enrolled Courses</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">{enrolledCourses.length}</p>
            </div>

            {/* Applied Jobs Card */}
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
              <h3 className="text-lg font-semibold">Applied Jobs</h3>
              <p className="text-2xl font-bold text-green-600 mt-2">{appliedJobs.length}</p>
            </div>

            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex gap-2 px-6 pt-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <UserCheck className="h-5 w-5 text-blue-500" />
                </div>
                <span className="font-bold text-lg">Profile Completion</span>
              </CardHeader>

              <CardBody className="gap-4 px-6 pb-6">
                <Progress
                  value={profileCompletion}
                  color="primary"
                  size="md"
                  radius="sm"
                  className="w-full"
                  showValueLabel={true}
                />
                <div className="flex justify-between items-center">
                  <span className="text-default-500 text-sm">
                    {`${profileCompletion}% complete`}
                  </span>
                  {profileCompletion < 100 && (
                    <Button
                      size="sm"
                      color="primary"
                      variant="flat"
                      className="font-medium"
                      onClick={() => setActiveTab("profile")}  // Set activeTab to "profile"
                    >
                      Complete Profile
                    </Button>

                  )}
                </div>
              </CardBody>
            </Card>

          </div>
        )}


        {/* Explore Courses */}
        {activeTab === "explore" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 lg:pb-1">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {filteredCourses
                .filter((course) => !enrolledCourses.some((c) => c.id === course.id)) // Exclude enrolled courses
                .map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    studentId={student?.uid}
                    onEnroll={handleEnroll}
                    isEnrolled={false}
                  />
                ))}
            </div>
            <div className="hidden md:block w-full">
              <div className="sticky top-1 p-4">
                <CourseFilter setCourseFilters={setCourseFilters} />
              </div>
            </div>
          </div>
        )}


        {activeTab === "enrolled" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 lg:pb-1">
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {filteredEnrolledCourses.length > 0 ? (
                filteredEnrolledCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    studentId={student?.uid}
                    isEnrolled={true}
                  />
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


        {/* Jobs Section */}
        {activeTab === "jobs" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16 lg:pb-1">
            <div className="md:col-span-2 flex flex-col gap-6 mt-6">
              {jobs.length > 0 ? (
                jobs
                  .filter((job) =>
                    !appliedJobs.some(appliedJob => appliedJob.id === job.id) // Exclude applied jobs
                  )
                  .map((job) => (
                    <JobCard key={job.id} job={job} studentId={student?.uid} />
                  ))
              ) : (
                <div className="text-center text-gray-500 text-lg font-semibold mt-10">
                  🚀 No jobs available yet. Check back later!
                </div>
              )}
            </div>

            {/* Job Filters Sidebar */}
            <div className="hidden md:block w-full">
              <div className="sticky top-1 p-4">
                <JobFilter setFilters={setJobFilters} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "applied" && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:mb-10 pb-16 lg:pb-1">
            {/* Applied Jobs List */}
            <div className="md:col-span-2 flex flex-col gap-6 mt-6">
              {appliedJobs.length > 0 ? (
                <AppliedJobs jobs={appliedJobs} />
              ) : (
                <div className="text-center text-gray-500 text-lg font-semibold mt-10">
                  🚀 No applied jobs yet. Apply Before!
                </div>
              )}
            </div>

            {/* Job Filters Sidebar (Only visible on larger screens) */}
            <div className="hidden md:block w-full">
              <div className="sticky top-1 p-4">
                <JobFilter setFilters={setJobFilters} />
              </div>
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
