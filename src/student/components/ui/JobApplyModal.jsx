import { useState } from "react";

const JobApplyModal = ({ isOpen, onClose, job, onApply ,company}) => {
  const [resumeLink, setResumeLink] = useState(""); // Changed from file input
  const [coverLetter, setCoverLetter] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !job) return null;

  const handleSubmit = async () => {
    if (!resumeLink) {
      setError("Please provide a resume link.");
      return;
    }

    setLoading(true);
    setError("");

    const applicationData = {
      resume: resumeLink, // Now sending the link instead of a file
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
            {job.jobTitle} at {company.name}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl">
            ✖
          </button>
        </div>

        {/* Job Details */}
        <div className="space-y-2 text-gray-700">
          <p><strong>📍 Location:</strong> {job.location || "Not specified"}</p>
          <p><strong>🛠 Job Type:</strong> {job.jobType || "Not specified"}</p>
          <p><strong>⏳ Duration:</strong> {job.duration || "Not specified"}</p>
          <p><strong>💰 Salary/Stipend:</strong> {job.salary ? `${job.salary}` : "Not specified"}</p>
          <p><strong>🎯 Openings:</strong> {job.openings ? `${job.openings} positions` : "Not specified"}</p>

          <p><strong>📅 Start Date:</strong> {job.postedAt?.seconds ? new Date(job.postedAt.seconds * 1000).toLocaleDateString() : "Not specified"}</p>
          <p><strong>🚨 Deadline:</strong> {job.applicationDeadline}</p>

          <p><strong>🔹 Skills Required:</strong> {Array.isArray(job.skillsRequired) && job.skillsRequired.length > 0 ? job.skillsRequired.join(", ") : "Not specified"}</p>
          <p><strong>🎁 Company Size:</strong> {company.size}</p>

          {/* About Company */}
          <div className="mt-2 bg-gray-100 p-3 rounded-md">
            <p className="font-semibold">🏢 About {company.name}:</p>
            <p className="text-sm">{company.description}</p>
          </div>

          {/* Job Description */}
          <div className="mt-2 bg-gray-50 p-3 rounded-md">
            <p className="font-semibold">📝 Job Description:</p>
            <p className="text-sm">{job.jobDescription}</p>
          </div>
        </div>

        {/* Application Form */}
        <div className="mt-4">
          <label className="block text-gray-600 font-semibold mb-1">📄 Resume Link</label>
          <input
            type="text"
            className="w-full border p-2 rounded bg-white"
            placeholder="Paste your resume link here"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
          />

          <label className="block text-gray-600 font-semibold mt-3 mb-1">✉ Cover Letter</label>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Write your cover letter here..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>

          <label className="block text-gray-600 font-semibold mt-3 mb-1">🔗 LinkedIn Profile</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Enter your LinkedIn URL"
            value={linkedinProfile}
            onChange={(e) => setLinkedinProfile(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Apply Button */}
        <button
          onClick={handleSubmit}
          className={`mt-4 w-full py-2 rounded font-semibold transition-all ${
            loading ? "bg-gray-400 text-gray-800 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Applying..." : "🚀 Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default JobApplyModal;
