import { useState } from "react";

const CourseFilter = ({ setCourseFilters }) => {
  const [instructor, setInstructor] = useState("");
  const [skill, setSkill] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const applyFilters = () => {
    setCourseFilters({ instructor, skill, duration, price });
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg sm:w-[314px]">
      <h3 className="font-semibold text-lg mb-3">Filter Courses</h3>
      {/* Instructor Filter */}
      <label className="block text-gray-700">Instructor</label>
      <input
        type="text"
        placeholder="e.g., John Doe"
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
        className="w-full p-2 border rounded mb-3 bg-slate-50"
      />

      {/* Skill Filter */}
      <label className="block text-gray-700">Skill</label>
      <input
        type="text"
        placeholder="e.g., JavaScript"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="w-full p-2 border rounded mb-3 bg-slate-50 "
      />

      {/* Duration Filter */}
      <label className="block text-gray-700">Duration</label>
      <input
        type="text"
        placeholder="e.g., 12 weeks"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full p-2 border rounded mb-3 bg-slate-50"
      />

      {/* Price Filter */}
      <label className="block text-gray-700">Price</label>
      <input
        type="text"
        placeholder="e.g., $299"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded mb-3 bg-slate-50"
      />

      <button
        onClick={applyFilters}
        className="w-full bg-blue-600 text-white p-2 rounded mt-2"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default CourseFilter;
