import { useState, useEffect } from "react";
import { jobs as dummyJobs } from "../student/lib/dummyData"; // rename import to avoid name clash

const useJobs = () => {
  // This state holds the original list of jobs
  const [jobsList, setJobsList] = useState([]);
  // This state holds the filtered results
  const [filteredJobs, setFilteredJobs] = useState([]);
  // These are the filter criteria (e.g., location, duration, salary, profile/skills)
  const [filters, setFilters] = useState({
    location: "",
    duration: "",
    salary: "",
    profile: "", // Profile filter for skills
  });

  // 1) On first mount, set jobs from the dummy data.
  useEffect(() => {
    setJobsList(dummyJobs);
    setFilteredJobs(dummyJobs); // Show all jobs by default
  }, []);

  // 2) Whenever filters change, apply them to jobsList
  useEffect(() => {
    let filtered = [...jobsList];

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by duration
    if (filters.duration) {
      filtered = filtered.filter((job) =>
        job.duration.toLowerCase().includes(filters.duration.toLowerCase())
      );
    }

    // Filter by salary
    if (filters.salary) {
      filtered = filtered.filter((job) => job.salary.includes(filters.salary));
    }

    // Filter by profile (skills)
    if (filters.profile) {
      filtered = filtered.filter((job) =>
        job.skills.some((skill) =>
          skill.toLowerCase().includes(filters.profile.toLowerCase())
        )
      );
    }

    // Update the filtered jobs
    setFilteredJobs(filtered);
  }, [filters, jobsList]);

  return { filteredJobs, setFilters };
};

export default useJobs;
