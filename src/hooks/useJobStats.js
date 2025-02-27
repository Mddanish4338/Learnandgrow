import { useState, useEffect } from "react";

const useJobStats = (jobs, pastJobs = []) => {
  const [activeJobs, setActiveJobs] = useState(0);
  const [newJobsCount, setNewJobsCount] = useState(0);
  const [trendText, setTrendText] = useState("No new jobs this week");
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [applicantTrend, setApplicantTrend] = useState("+0 new");
  const [totalOpenings, setTotalOpenings] = useState(0);
  const [openingsTrend, setOpeningsTrend] = useState("No change");

  useEffect(() => {
    if (!jobs || jobs.length === 0) {
      setActiveJobs(0);
      setNewJobsCount(0);
      setTrendText("No new jobs this week");
      setTotalApplicants(0);
      setApplicantTrend("+0 new");
      setTotalOpenings(0);
      setOpeningsTrend("No change");
      return;
    }

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Properly handle Firestore Timestamp objects
    const getDateFromTimestamp = (timestamp) => {
      if (!timestamp) return null;

      if (timestamp.seconds && typeof timestamp.seconds === "number") {
        return new Date(timestamp.seconds * 1000);
      }

      try {
        return new Date(timestamp);
      } catch (error) {
        console.error("Invalid timestamp format:", timestamp);
        return null;
      }
    };

    // Count active jobs
    const activeCount = jobs.filter((job) => job.status === "Active").length;

    // Count jobs posted within the last 7 days
    const recentCount = jobs.filter((job) => {
      const jobDate = getDateFromTimestamp(job.postedAt);
      return jobDate && jobDate >= oneWeekAgo;
    }).length;

    // Count total applicants across all jobs
    const allApplicants = jobs.reduce(
      (sum, job) => sum + (job.candidates?.length || 0),
      0
    );

    // Count new applicants (hiringStatus === "New")
    const newApplicants = jobs.reduce((sum, job) => {
      return (
        sum +
        (job.candidatesArray?.filter(
          (candidate) => candidate.hiringStatus === "New"
        ).length || 0)
      );
    }, 0);

    // Calculate total openings across all jobs
    const totalOpeningsCount = jobs.reduce(
      (sum, job) => sum + Number(job.openings || 1),
      0
    );

    // Calculate past openings for trend comparison
    const pastOpeningsCount = pastJobs.reduce(
      (sum, job) => sum + Number(job.openings || 0),
      0
    );

    // Calculate trend percentage
    let openingTrendPercentage = 0;
    if (pastOpeningsCount > 0) {
      openingTrendPercentage =
        ((totalOpeningsCount - pastOpeningsCount) / pastOpeningsCount) * 100;
    }

    const openingTrendText =
      openingTrendPercentage > 0
        ? `+${openingTrendPercentage.toFixed(1)}% increase`
        : openingTrendPercentage < 0
        ? `${openingTrendPercentage.toFixed(1)}% decrease`
        : "No change";

    // Set state values
    setActiveJobs(activeCount);
    setNewJobsCount(recentCount);
    setTrendText(
      recentCount > 0 ? `+${recentCount} this week` : "No new jobs this week"
    );
    setTotalApplicants(allApplicants);
    setApplicantTrend(newApplicants > 0 ? `+${newApplicants} new` : "+0 new");
    setTotalOpenings(totalOpeningsCount);
    setOpeningsTrend(openingTrendText);
  }, [jobs, pastJobs]);

  return {
    activeJobs,
    newJobsCount,
    trendText,
    totalApplicants,
    applicantTrend,
    totalOpenings,
    openingsTrend,
  };
};

export default useJobStats;
