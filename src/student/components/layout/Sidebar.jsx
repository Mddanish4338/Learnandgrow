import { useState, useEffect, useRef } from "react";
import { MdDashboard } from "react-icons/md";
import { FaWpexplorer } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { GoBookmarkFill } from "react-icons/go";
import { FaBell } from "react-icons/fa";
import { ImBooks } from "react-icons/im";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const tabsRef = useRef([]);
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const [underlineStyle, setUnderlineStyle] = useState({
    top: 0,
    height: 0,
  });

  const menuItems = [
    { name: "Dashboard", tab: "dashboard", icon: <MdDashboard /> },
    { name: "Explore", tab: "explore", icon: <FaWpexplorer /> },
    { name: "Enrolled", tab: "enrolled", icon: <FaPencilAlt /> },
    { name: "Jobs", tab: "jobs", icon: <MdOutlineWork /> },
    { name: "Applied", tab: "applied", icon: <GoBookmarkFill /> },
    { name: "Notifications", tab: "notifications", icon: <FaBell /> },
  ];

  // Update the underline position whenever the active tab changes
  useEffect(() => {
    const index = menuItems.findIndex((item) => item.tab === activeTab);
    setActiveTabIndex(index);

    if (index !== -1 && tabsRef.current[index]) {
      const tabElement = tabsRef.current[index];
      setUnderlineStyle({
        top: tabElement.offsetTop,
        height: tabElement.clientHeight,
      });
    }
  }, [activeTab]);

  return (
    <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col justify-between relative">
      {/* Sidebar Underline Animation */}
      <div
        className="absolute left-0 w-2 bg-blue-500 rounded-r-lg transition-all duration-300"
        style={{ top: underlineStyle.top, height: underlineStyle.height }}
      />

      <div>
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 mb-6 text-center flex items-center gap-2">
          <span>
            <ImBooks />
          </span>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-600 to-sky-900">
            Learn&Grow
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={item.tab}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => setActiveTab(item.tab)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                activeTab === item.tab ? "text-blue-700" : "text-gray-600"
              } hover:bg-blue-100`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Profile Section */}
      <div
        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 text-blue-700 hover:bg-blue-200"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        <img
          src="https://avatar.iran.liara.run/public/38"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <span>John Doe</span>
      </div>

      {/* Profile Drawer */}
      {isProfileOpen && (
        <div className="absolute bottom-16 left-4 w-56 bg-white shadow-lg rounded-lg p-4">
          <p className="text-blue-700 font-semibold">John Doe</p>
          <p className="text-sm text-gray-600">johndoe@example.com</p>
          <button className="mt-2 w-full p-2 bg-sky-400 text-white rounded-lg">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
