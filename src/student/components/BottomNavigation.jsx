import { useState, useEffect, useRef } from "react";
import { FiFilter, FiHome, FiBookmark, FiBriefcase } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const BottomNavigation = ({ activeTab, setActiveTab, renderFilterContent }) => {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [jobDropdown, setJobDropdown] = useState(false);
  const tabsRef = useRef([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", tab: "dashboard", icon: <MdDashboard /> },
    { name: "Explore", tab: "explore", icon: <FiHome /> },
    { name: "Enrolled", tab: "enrolled", icon: <FiBookmark /> },
    { name: "Jobs", tab: "jobs", icon: <FiBriefcase /> },
  ];

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
                    setJobDropdown(true);
                  }
                } else {
                  setActiveTab(item.tab);
                  setJobDropdown(false);
                }
              }}
              className={`flex flex-col items-center ${activeTab === item.tab ? "text-sky-700" : "text-gray-500"
                }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}

          {jobDropdown && (
            <div className="absolute bottom-[3.5rem] left-[18.5rem] transform -translate-x-1/2 bg-white shadow-lg border rounded-md p-2 w-32">
              <button
                className={`block w-full text-left px-2 py-1 hover:bg-gray-100 ${activeTab === "jobs" ? "text-sky-700" : "text-gray-500"
                  }`}
                onClick={() => {
                  setActiveTab("jobs");
                  setJobDropdown(false);
                }}
              >
                All Jobs
              </button>
              <button
                className={`block w-full text-left px-2 py-1 hover:bg-gray-100 ${activeTab === "jobs" ? "text-sky-700" : "text-gray-500"
                  }`}
                onClick={() => {
                  setActiveTab("applied");
                  setJobDropdown(false);
                }}
              >
                Applied Jobs
              </button>
            </div>
          )}

          <button
            onClick={() => setFilterModalOpen(true)}
            className="flex flex-col items-center text-gray-500"
          >
            <FiFilter size={20} />
            <span className="text-xs mt-1">Filter</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className="flex flex-col items-center text-gray-500"
          >
            {activeTab === "profile" ? (
              <button
                onClick={() => {
                  logout(); // Perform logout
                  navigate("/"); // Redirect to home
                }}
                className="flex flex-col items-center bg-white text-red-600"
              >
                <IoIosLogOut className="w-5 h-5" />
                <span className="text-xs mt-1">Logout</span>
              </button>
            ) : (
              <img
                src="https://avatar.iran.liara.run/public/31"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )}
          </button>

        </div>
      </div>

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
    </div>
  );
};

export default BottomNavigation;
