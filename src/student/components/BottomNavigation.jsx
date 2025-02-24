import { useState, useEffect, useRef } from "react";
import { FiFilter, FiHome, FiBookmark, FiBriefcase } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
// import JobFilter from "@/components/ui/JobFilter";
// import CourseFilter from "@/components/ui/CourseFilter";

const BottomNavigation = ({ activeTab, setActiveTab, renderFilterContent }) => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [jobDropdown, setJobDropdown] = useState(false);
  const tabsRef = useRef([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const menuItems = [
    { name: "Dashboard", tab: "dashboard", icon: <MdDashboard /> },
    { name: "Explore", tab: "explore", icon: <FiHome /> },
    { name: "Enrolled", tab: "enrolled", icon: <FiBookmark /> },
    { name: "Jobs", tab: "jobs", icon: <FiBriefcase /> },
  ];

  // Update underline position when activeTab changes
  useEffect(() => {
    const index = menuItems.findIndex((item) => item.tab === activeTab);
    if (index !== -1 && tabsRef.current[index]) {
      const tabElement = tabsRef.current[index];
      setUnderlineStyle({
        left: tabElement.offsetLeft,
        width: tabElement.clientWidth,
      });
    }
  }, [activeTab]);

  return (
    <div>
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
        <div className="relative flex justify-around items-center py-2">
          {/* Underline Animation */}
          <div
            className="absolute bottom-0 h-1 bg-blue-500 transition-all duration-300 rounded-t-lg"
            style={{ left: underlineStyle.left, width: underlineStyle.width }}
          />

          {menuItems.map((item, index) => (
            <button
              key={item.tab}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => {
                if (item.tab === "jobs") {
                  if (!jobDropdown) {
                    setJobDropdown(true); // Open dropdown first
                  }
                } else {
                  setActiveTab(item.tab);
                  setJobDropdown(false); // Close dropdown when switching to another tab
                }
              }}
              className={`flex flex-col items-center ${
                activeTab === item.tab ? "text-sky-700" : "text-gray-500"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}

          {/* Job Dropdown */}
          {jobDropdown && (
            <div className="absolute bottom-[3.5rem] left-[18.5rem] transform -translate-x-1/2 bg-white shadow-lg border rounded-md p-2 w-32">
              <button
                className={`block w-full text-left px-2 py-1 hover:bg-gray-100 ${
                  activeTab === "jobs" ? "text-sky-700" : "text-gray-500"
                }`}
                onClick={() => {
                  setActiveTab("jobs");
                  setJobDropdown(false); // Close dropdown after selecting
                }}
              >
                All Jobs
              </button>
              <button
                className={`block w-full text-left px-2 py-1 hover:bg-gray-100 ${
                  activeTab === "jobs" ? "text-sky-700" : "text-gray-500"
                }`}
                onClick={() => {
                  setActiveTab("applied");
                  setJobDropdown(false); // Close dropdown after selecting
                }}
              >
                Applied Jobs
              </button>
            </div>
          )}

          {/* Filter Button */}
          <button
            onClick={() => setFilterModalOpen(true)}
            className="flex flex-col items-center text-gray-500"
          >
            <FiFilter size={20} />
            <span className="text-xs mt-1">Filter</span>
          </button>

          {/* Profile Button */}
          <button
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center text-gray-500"
          >
            <img
              src="https://avatar.iran.liara.run/public/31"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          </button>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {filterModalOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setFilterModalOpen(false)}
                className="text-blue-600"
              >
                Close
              </button>
            </div>
            {renderFilterContent()}
          </div>
        </div>
      )}

      {/* Mobile Profile Modal */}
      {profileModalOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button
                onClick={() => setProfileModalOpen(false)}
                className="text-blue-600"
              >
                Close
              </button>
            </div>
            <div>
              <label className="block text-gray-600 mb-2">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block text-gray-600 mb-2">
                Profile Picture URL
              </label>
              <input
                type="text"
                placeholder="https://avatar.iran.liara.run/public/31"
                className="w-full p-2 border rounded mb-4"
              />
              <button className="w-full bg-blue-600 text-white p-2 rounded">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNavigation;
