import { useState, useEffect } from "react";

const skillsList = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Data Analysis",
  "Machine Learning",
  "SQL",
  "UI/UX Design",
  "Cybersecurity",
  "DevOps",
]; // Example skill options, modify as needed

const JobFilter = ({ setFilters }) => {
  const [filters, setLocalFilters] = useState({
    location: "",
    duration: "",
    salary: "",
    skills: [],
  });

  useEffect(() => {
    // Remove empty fields from filters before applying
    const appliedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) =>
        Array.isArray(value) ? value.length > 0 : value.trim() !== ""
      )
    );

    setFilters(appliedFilters);
  }, [filters, setFilters]);

  // Handle input changes dynamically
  const handleInputChange = (e) => {
    setLocalFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle skill selection
  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    if (!filters.skills.includes(selectedSkill)) {
      setLocalFilters({ ...filters, skills: [...filters.skills, selectedSkill] });
    }
  };

  // Remove selected skill
  const removeSkill = (skill) => {
    setLocalFilters({ ...filters, skills: filters.skills.filter((s) => s !== skill) });
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

      {/* Skills Required Filter */}
      <label className="block text-gray-700">Skills Required</label>
      <select
        className="w-full p-2 border rounded mb-3 bg-slate-50"
        onChange={handleSkillChange}
        defaultValue=""
      >
        <option value="" disabled>Select skills</option>
        {skillsList.map((skill) => (
          <option key={skill} value={skill}>
            {skill}
          </option>
        ))}
      </select>

      {/* Display Selected Skills */}
      <div className="flex flex-wrap gap-2 mb-3">
        {filters.skills.map((skill) => (
          <span key={skill} className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-2">
            {skill}
            <button onClick={() => removeSkill(skill)} className="ml-1 text-white font-bold">×</button>
          </span>
        ))}
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() =>
          setLocalFilters({ location: "", duration: "", salary: "", profile: "", skills: [] })
        }
        className="w-full bg-red-500 text-white p-2 rounded mt-2"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default JobFilter;
