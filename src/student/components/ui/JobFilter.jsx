import { useState, useEffect } from "react";

const JobFilter = ({ setFilters }) => {
  const [filters, setLocalFilters] = useState({
    location: "",
    duration: "",
    salary: "",
    profile: "",
  });

  // Update filters dynamically when user types
  useEffect(() => {
    // Remove empty fields from filters
    const appliedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value.trim() !== "")
    );

    setFilters(appliedFilters);
  }, [filters, setFilters]);

  // Handle input change dynamically
  const handleInputChange = (e) => {
    setLocalFilters({ ...filters, [e.target.name]: e.target.value });
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
        name="location"
        value={filters.location}
        onChange={handleInputChange}
      />

      {/* Duration Filter */}
      <label className="block text-gray-700">Duration</label>
      <input
        className="w-full p-2 border rounded mb-3 bg-slate-50"
        type="text"
        placeholder="e.g., 2 Months, 6 Months"
        name="duration"
        value={filters.duration}
        onChange={handleInputChange}
      />

      {/* Salary Filter */}
      <label className="block text-gray-700">Salary</label>
      <input
        className="w-full p-2 border rounded mb-3 bg-slate-50"
        type="text"
        placeholder="e.g., ₹25,000"
        name="salary"
        value={filters.salary}
        onChange={handleInputChange}
      />

      {/* Profile/Skills Filter */}
      <label className="block text-gray-700">Profile (Skills)</label>
      <input
        className="w-full p-2 border rounded mb-3 bg-slate-50"
        type="text"
        placeholder="e.g., JavaScript, Data Analysis"
        name="profile"
        value={filters.profile}
        onChange={handleInputChange}
      />

      {/* Clear Filters Button */}
      <button
        onClick={() => setLocalFilters({ location: "", duration: "", salary: "", profile: "" })}
        className="w-full bg-red-500 text-white p-2 rounded mt-2"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default JobFilter;
