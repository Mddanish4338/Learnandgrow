import { useState } from "react";

const JobApplyModal = ({ isOpen, onClose, job, onApply }) => {

  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !job) return null;
  const handleSubmit = async () => {
    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    setLoading(true);

    const applicationData = {
      resume,
      coverLetter,
      linkedinProfile,
    };

    await onApply(applicationData); // Calls apply function from JobCard

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-[45rem] shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">
            {job.title} at {job.company}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            ✖
          </button>
        </div>

        {/* Job Details */}
        <div className="space-y-2 text-gray-700">
          <p><strong>Location:</strong> {job.location || "Not specified"}</p>
          <p><strong>Job Type:</strong> {job.jobType || "Not specified"}</p>
          <p><strong>Duration:</strong> {job.duration || "Not specified"}</p>
          <p><strong>Salary/Stipend:</strong> {job.salary ? `₹${job.salary}` : "Not specified"}</p>
          <p><strong>Openings:</strong> {job.openings ? `${job.openings} positions` : "Not specified"}</p>

          <p><strong>Start Date:</strong> {job.startDate?.seconds ? new Date(job.startDate.seconds * 1000).toLocaleDateString() : "Not specified"}</p>
          <p><strong>Deadline:</strong> {job.applicationDeadline?.seconds ? new Date(job.applicationDeadline.seconds * 1000).toLocaleDateString() : "Not specified"}</p>

          <p><strong>Skills Required:</strong> {Array.isArray(job.skills) && job.skills.length > 0 ? job.skills.join(", ") : "Not specified"}</p>
          <p><strong>Perks:</strong> {Array.isArray(job.perks) && job.perks.length > 0 ? job.perks.join(", ") : "Not specified"}</p>

          {/* About Company */}
          <p className="mt-2"><strong>About {job.company}:</strong></p>
          <p className="text-sm">{job.aboutCompany}</p>

          {/* Job Description */}
          <p className="mt-2"><strong>Job Description:</strong></p>
          <p className="text-sm">{job.jobDescription}</p>
        </div>

        {/* Application Form */}
        <div className="mt-4">
          <label className="block text-gray-600 mb-1">Upload Resume</label>
          <input
            type="file"
            className="w-full border p-2 rounded"
            onChange={(e) => setResume(e.target.files[0])}
          />

          <label className="block text-gray-600 mt-3 mb-1">Cover Letter</label>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Write your cover letter here..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>

          <label className="block text-gray-600 mt-3 mb-1">LinkedIn Profile</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter your LinkedIn URL"
            value={linkedinProfile}
            onChange={(e) => setLinkedinProfile(e.target.value)}
          />
        </div>

        {/* Apply Button */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default JobApplyModal;
