import { useState } from "react";
import { FaLocationPin } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaMoneyBill } from "react-icons/fa";
import JobApplyModal from "./ui/JobApplyModal";

const JobCard = ({ job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col md:flex-row justify-between items-start w-full md:w-[800px]">
        <div className="flex-1">
          {/* Job Title and Company */}
          <h3 className="font-semibold text-xl">{job.title}</h3>
          <p className="text-gray-500">{job.company}</p>

          {/* Status: Actively Hiring */}
          {job.activelyHiring && (
            <span className="inline-block mt-2 bg-blue-100 text-blue-700 py-1 px-3 text-sm rounded-full">
              Actively hiring
            </span>
          )}

          {/* Location, Duration, Salary */}
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

          {/* Posted time */}
          <p className="text-xs text-green-500 mt-2">{job.posted}</p>

          {/* Apply Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 mt-3 transition-all duration-300 ease-in"
          >
            Apply
          </button>
        </div>

        {/* Company Logo */}
        <div className="flex-shrink-0 flex flex-col items-end gap-2 mt-4 md:mt-0">
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="w-12 h-12 rounded-full"
          />
        </div>
      </div>

      {/* Job Apply Modal */}
      <JobApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={job}
      />
    </>
  );
};

export default JobCard;
