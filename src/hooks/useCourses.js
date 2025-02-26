import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../src/utils/firebase"; // Ensure the correct path
import {
  enrollInCourse,
  withdrawFromCourse,
  getEnrolledCourses,
  getCourseDetails, // Import getCourseDetails
} from "../services/studentService"; // Import Firestore functions

const useCourses = (studentId) => {
  const [coursesList, setCoursesList] = useState([]); // All courses
  const [filteredCourses, setFilteredCourses] = useState([]); // Filtered courses
  const [enrolledCourses, setEnrolledCourses] = useState([]); // Enrolled courses
  const [courseFilters, setCourseFilters] = useState({
    instructor: "",
    skill: "",
    duration: "",
    price: "",
  });

  // 🔹 Fetch all courses from Firestore (Real-time sync)
  useEffect(() => {
    const coursesRef = collection(db, "courses");
    const unsubscribe = onSnapshot(coursesRef, (snapshot) => {
      const coursesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCoursesList(coursesData);
      setFilteredCourses(coursesData); // Initially, show all courses
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // 🔹 Fetch enrolled courses for the given studentId
  useEffect(() => {
    if (!studentId) return;

    const fetchEnrolledCourses = async () => {
      const enrolled = await getEnrolledCourses(studentId);
      setEnrolledCourses(enrolled);
    };

    fetchEnrolledCourses();
  }, [studentId]);

  // 🔹 Apply filters whenever filter criteria change
  useEffect(() => {
    let filtered = [...coursesList];

    // Filter by instructor name
    if (courseFilters.instructor) {
      filtered = filtered.filter((course) =>
        course.instructor
          ?.toLowerCase()
          .includes(courseFilters.instructor.toLowerCase())
      );
    }

    // Filter by skill (matches any skill in the course's skills array)
    if (courseFilters.skill) {
      filtered = filtered.filter((course) =>
        course.skills?.some((skill) =>
          skill.toLowerCase().includes(courseFilters.skill.toLowerCase())
        )
      );
    }

    // Filter by duration
    if (courseFilters.duration) {
      filtered = filtered.filter((course) =>
        course.duration
          ?.toLowerCase()
          .includes(courseFilters.duration.toLowerCase())
      );
    }

    // Filter by price
    if (courseFilters.price) {
      filtered = filtered.filter((course) =>
        course.price?.includes(courseFilters.price)
      );
    }

    setFilteredCourses(filtered);
  }, [courseFilters, coursesList]);

  // 🔹 Separate available courses
  const exploreCourses = filteredCourses.filter(
    (course) => course.status === "Available"
  );

  // 🔹 Function to enroll in a course
  const enroll = async (courseId) => {
    if (!studentId) {
      console.error("No student ID provided!");
      return false;
    }

    const success = await enrollInCourse(courseId, studentId);
    if (success) {
      // Refresh enrolled courses list
      const enrolled = await getEnrolledCourses(studentId);
      setEnrolledCourses(enrolled);
    }
    return success;
  };

  // 🔹 Function to withdraw from a course
  const withdraw = async (courseId) => {
    if (!studentId) {
      console.error("No student ID provided!");
      return false;
    }

    const success = await withdrawFromCourse(courseId, studentId);
    if (success) {
      // Refresh enrolled courses list
      const enrolled = await getEnrolledCourses(studentId);
      setEnrolledCourses(enrolled);
    }
    return success;
  };

  // 🔹 Function to fetch course details using studentService
  const fetchCourseDetails = async (courseId) => {
    return await getCourseDetails(courseId);
  };

  return {
    exploreCourses,
    enrolledCourses,
    setCourseFilters,
    enroll,
    withdraw,
    fetchCourseDetails, // Add fetchCourseDetails to the returned object
  };
};

export default useCourses;