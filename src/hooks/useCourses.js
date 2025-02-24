import { useState, useEffect } from "react";
import { courses as dummyCourses } from "../student/lib/dummyData";

const useCourses = () => {
  // Holds the full courses data
  const [coursesList, setCoursesList] = useState([]);
  // Holds the filtered courses based on filter criteria
  const [filteredCourses, setFilteredCourses] = useState([]);
  // Filter criteria for courses
  const [courseFilters, setCourseFilters] = useState({
    instructor: "",
    skill: "",
    duration: "",
    price: "",
  });

  // On first mount, load courses from dummy data
  useEffect(() => {
    setCoursesList(dummyCourses);
    setFilteredCourses(dummyCourses); // Show all courses initially
  }, []);

  // Whenever filters change, update the filtered courses
  useEffect(() => {
    let filtered = [...coursesList];

    // Filter by instructor name
    if (courseFilters.instructor) {
      filtered = filtered.filter((course) =>
        course.instructor
          .toLowerCase()
          .includes(courseFilters.instructor.toLowerCase())
      );
    }

    // Filter by skill (matches any skill in the course's skills array)
    if (courseFilters.skill) {
      filtered = filtered.filter((course) =>
        course.skills.some((skill) =>
          skill.toLowerCase().includes(courseFilters.skill.toLowerCase())
        )
      );
    }

    // Filter by duration
    if (courseFilters.duration) {
      filtered = filtered.filter((course) =>
        course.duration
          .toLowerCase()
          .includes(courseFilters.duration.toLowerCase())
      );
    }

    // Filter by price
    if (courseFilters.price) {
      filtered = filtered.filter((course) =>
        course.price.includes(courseFilters.price)
      );
    }

    setFilteredCourses(filtered);
  }, [courseFilters, coursesList]);

  // Separate courses based on their status
  const exploreCourses = filteredCourses.filter(
    (course) => course.status === "Available"
  );
  const enrolledCourses = filteredCourses.filter(
    (course) => course.status === "Enrolled" || course.status === "Completed"
  );

  return { exploreCourses, enrolledCourses, setCourseFilters };
};

export default useCourses;
