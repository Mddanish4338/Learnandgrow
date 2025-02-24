import { useState } from "react";

const JobFilter = ({ setFilters }) => {
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [salary, setSalary] = useState("");
  const [profile, setProfile] = useState(""); // Add profile filter for skills

  // This function will be called on "Apply" button click
  const applyFilters = () => {
    setFilters({ location, duration, salary, profile });
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg w-[350px]">
      <h3 className="font-semibold text-lg mb-3">Filter Jobs</h3>

      {/* Location Filter */}
      <label className="block text-gray-700">Location</label>
      <input
        className="w-full p-2 border rounded mb-3 bg-slate-50"
        type="text"
        placeholder="e.g., Remote, On-site"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* Duration Filter */}
      <label className="block text-gray-700">Duration</label>
      <input
        className="w-full p-2 border rounded mb-3 bg-slate-50"
        type="text"
        placeholder="e.g., 2 Months, 6 Months"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      {/* Salary Filter */}
      <label className="block text-gray-700">Salary</label>
      <input
        className="w-full p-2 border rounded mb-3 bg-slate-50"
        type="text"
        placeholder="e.g., ₹25,000"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      {/* Profile/Skills Filter */}
      <label className="block text-gray-700">Profile (Skills)</label>
      <input
        className="w-full p-2 border rounded mb-3 bg-slate-50"
        type="text"
        placeholder="e.g., JavaScript, Data Analysis"
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
      />

      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 text-white p-2 rounded mt-2"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default JobFilter;
