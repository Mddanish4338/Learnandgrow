import { useState, useEffect } from "react";

const CourseFilter = ({ setCourseFilters }) => {
  const [filters, setFilters] = useState({
    instructor: "",
    skill: "",
    duration: "",
    price: "",
  });

  // Update parent state whenever filters change
  useEffect(() => {
    // Remove empty filters
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value.trim() !== "")
    );
    setCourseFilters(activeFilters);
  }, [filters, setCourseFilters]);

  // Handle input change dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg sm:w-[314px] mt-2">
      <h3 className="font-semibold text-lg mb-3">Filter Courses</h3>

      {/* Instructor Filter */}
      <label className="block text-gray-700">Instructor</label>
      <input
        type="text"
        name="instructor"
        placeholder="e.g., John Doe"
        value={filters.instructor}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-3 bg-slate-50"
      />

      {/* Skill Filter */}
      <label className="block text-gray-700">Skill</label>
      <input
        type="text"
        name="skill"
        placeholder="e.g., JavaScript"
        value={filters.skill}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-3 bg-slate-50"
      />

      {/* Duration Filter */}
      <label className="block text-gray-700">Duration</label>
      <input
        type="text"
        name="duration"
        placeholder="e.g., 12 weeks"
        value={filters.duration}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-3 bg-slate-50"
      />

      {/* Price Filter */}
      <label className="block text-gray-700">Price</label>
      <input
        type="text"
        name="price"
        placeholder="e.g., $299"
        value={filters.price}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-3 bg-slate-50"
      />

      {/* Clear Filters Button */}
      <button
        onClick={() => setFilters({ instructor: "", skill: "", duration: "", price: "" })}
        className="w-full bg-red-500 text-white p-2 rounded mt-2"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default CourseFilter;
