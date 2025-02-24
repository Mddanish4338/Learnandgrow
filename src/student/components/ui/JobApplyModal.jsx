import { useState } from "react";

const JobApplyModal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-[45rem] shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">
            {job.title} at {job.company}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            ✖
          </button>
        </div>

        {/* Job Details */}
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Job Type:</strong> {job.jobType}
          </p>
          <p>
            <strong>Duration:</strong> {job.duration}
          </p>
          <p>
            <strong>Salary/Stipend:</strong> {job.salary}
          </p>
          <p>
            <strong>Openings:</strong> {job.openings} positions
          </p>
          <p>
            <strong>Start Date:</strong> {job.startDate}
          </p>
          <p>
            <strong>Deadline:</strong> {job.applicationDeadline}
          </p>

          {/* Skills Required */}
          <p>
            <strong>Skills Required:</strong> {job.skills.join(", ")}
          </p>

          {/* Perks */}
          <p>
            <strong>Perks:</strong> {job.perks.join(", ")}
          </p>

          {/* About Company */}
          <p className="mt-2">
            <strong>About {job.company}:</strong>
          </p>
          <p className="text-sm">{job.aboutCompany}</p>

          {/* Job Description */}
          <p className="mt-2">
            <strong>Job Description:</strong>
          </p>
          <p className="text-sm">{job.jobDescription}</p>
        </div>

        {/* Application Form */}
        <div className="mt-4">
          <label className="block text-gray-600 mb-1">Upload Resume</label>
          <input type="file" className="w-full border p-2 rounded" />

          <label className="block text-gray-600 mt-3 mb-1">Cover Letter</label>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Write your cover letter here..."
          ></textarea>

          <label className="block text-gray-600 mt-3 mb-1">
            LinkedIn Profile
          </label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter your LinkedIn URL"
          />
        </div>

        {/* Apply Button */}
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobApplyModal;
