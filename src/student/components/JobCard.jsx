import { useState, useEffect } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaMoneyBill } from "react-icons/fa";
import JobApplyModal from "./ui/JobApplyModal";
import { applyForJob } from "../../services/studentService";
import { getCompanyById } from "../../services/companyService"; // Import function

const JobCard = ({ job, studentId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(null); // Store company details

  // Fetch company details when job.companyId changes
  useEffect(() => {
    if (job.companyId) {
      const fetchCompanyDetails = async () => {
        const company = await getCompanyById(job.companyId);
        setCompanyInfo(company);
      };
      fetchCompanyDetails();
    }
  }, [job.companyId]);

  // console.log(studentId)

  // Check if the student has already applied
  useEffect(() => {
    if (studentId && job.candidates) {
      setHasApplied(job.candidates.some((candidate) => candidate.id === studentId));
    }
  }, [studentId, job.candidates]);

  const handleApply = async (applicationData) => {
    if (!studentId) {
      alert("You must be logged in to apply for jobs.");
      return;
    }
  
    // Ensure no undefined values in applicationData
    const sanitizedApplicationData = Object.fromEntries(
      Object.entries(applicationData).filter(([_, value]) => value !== undefined)
    );
  
    setLoading(true);
    try {
      const success = await applyForJob(job.id, studentId, sanitizedApplicationData);
      setLoading(false);
  
      if (success) {
        alert("Successfully applied for the job!");
        setHasApplied(true);
        setIsModalOpen(false);
      } else {
        alert("Failed to apply. Please try again.");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-start w-full md:w-[800px]">
        <div className="flex-1">
          <h3 className="font-semibold text-xl">{job.jobTitle}</h3>
          <p className="text-gray-500">{companyInfo?.name || "Unknown Company"}</p>

          {job.activelyHiring && (
            <span className="inline-block mt-2 bg-blue-100 text-blue-700 py-1 px-3 text-sm rounded-full">
              Actively hiring
            </span>
          )}

          <div className="mt-2 text-sm text-gray-600 flex flex-wrap md:flex-nowrap items-center gap-5">
            <div className="flex items-center gap-1">
              <FaLocationPin className="text-gray-500" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <SlCalender className="text-gray-500" />
              <span>{job.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaMoneyBill className="text-gray-500" />
              <span>{job.salary}</span>
            </div>
          </div>

          <p className="text-xs text-green-500 mt-2 mb-2">
            {job.postedAt?.seconds ? new Date(job.postedAt.seconds * 1000).toLocaleDateString() : "Unknown Date"}
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className={`px-6 py-2 rounded-md transition-all duration-300 ease-in ${hasApplied
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            disabled={hasApplied || loading}
          >
            {hasApplied ? "Applied" : loading ? "Applying..." : "Apply"}
          </button>
        </div>

        <div className="flex-shrink-0 flex flex-col items-end gap-2 mt-4 md:mt-0">
          {companyInfo?.logo ? (
            <img
              src={companyInfo.logo}
              alt={`${companyInfo.name} logo`}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-gray-300 text-black text-xl font-extrabold rounded-full">
              {companyInfo?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

      </div>

      <JobApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={job}
        company={companyInfo} // Pass company details to modal
        onApply={handleApply}
      />
    </>
  );
};

export default JobCard;
