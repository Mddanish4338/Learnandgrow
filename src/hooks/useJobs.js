import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase"; // Ensure the correct path
import { applyForJob, getAppliedJobs } from "../services/studentService"; // Import Firestore functions

const useJobs = (studentId) => {
  const [jobsList, setJobsList] = useState([]); // All jobs
  const [filteredJobs, setFilteredJobs] = useState([]); // Filtered jobs
  const [appliedJobs, setAppliedJobs] = useState([]); // Jobs the student has applied for
  const [filters, setFilters] = useState({
    location: "",
    duration: "",
    salary: "",
    profile: "", // Profile filter for skills
  });

  // 🔹 Fetch all jobs from Firestore (Real-time sync)
  useEffect(() => {
    const jobsRef = collection(db, "jobs");
    const unsubscribe = onSnapshot(jobsRef, (snapshot) => {
      const jobsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setJobsList(jobsData);
      setFilteredJobs(jobsData); // Initially, show all jobs
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // 🔹 Fetch applied jobs for the student
  useEffect(() => {
    if (!studentId) return;

    const fetchAppliedJobs = async () => {
      const applied = await getAppliedJobs(studentId);
      setAppliedJobs(applied);
    };

    fetchAppliedJobs();
  }, [studentId]);

  // 🔹 Apply filters whenever filter criteria change
  useEffect(() => {
    let filtered = [...jobsList];

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by duration
    if (filters.duration) {
      filtered = filtered.filter((job) =>
        job.duration?.toLowerCase().includes(filters.duration.toLowerCase())
      );
    }

    // Filter by salary
    if (filters.salary) {
      filtered = filtered.filter((job) => job.salary?.includes(filters.salary));
    }

    // Filter by profile (skills)
    if (filters.profile) {
      filtered = filtered.filter((job) =>
        job.skills?.some((skill) =>
          skill.toLowerCase().includes(filters.profile.toLowerCase())
        )
      );
    }

    setFilteredJobs(filtered);
  }, [filters, jobsList]);

  // 🔹 Function to apply for a job
  const apply = async (jobId, applicationData) => {
    if (!studentId) {
      console.error("No student ID provided!");
      return false;
    }

    const success = await applyForJob(jobId, studentId, applicationData);
    if (success) {
      // Refresh applied jobs list
      const applied = await getAppliedJobs(studentId);
      setAppliedJobs(applied);
    }
    return success;
  };

  return { filteredJobs, appliedJobs, setFilters, apply };
};

export default useJobs;
