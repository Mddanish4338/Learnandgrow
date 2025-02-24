import { useState, useEffect } from "react";
import { appliedJobs } from "../student/lib/dummyData";

const useAppliedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setJobs(appliedJobs);
    }, 100);
  }, []);

  return jobs;
};

export default useAppliedJobs;
