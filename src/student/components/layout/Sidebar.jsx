import { useState, useEffect, useRef } from "react";
import { MdDashboard, MdOutlineWork } from "react-icons/md";
import { FaWpexplorer, FaPencilAlt, FaBell } from "react-icons/fa";
import { GoBookmarkFill } from "react-icons/go";
import { ImBooks } from "react-icons/im";
import { useAuth } from "../../../context/AuthContext";
import { getStudentById } from "../../../services/studentService";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { RiProfileFill } from "react-icons/ri";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabsRef = useRef([]);
  const { logout } = useAuth();
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
    { name: "Profile", tab: "profile", icon: <RiProfileFill /> },
  ];

  const { user } = useAuth();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Update the underline position whenever the active tab changes
  useEffect(() => {
    const index = menuItems.findIndex((item) => item.tab === activeTab);
    if (index !== -1 && tabsRef.current[index]) {
      const tabElement = tabsRef.current[index];
      setUnderlineStyle({
        top: tabElement.offsetTop,
        height: tabElement.clientHeight,
      });
    }
  }, [activeTab]);



  useEffect(() => {
    const fetchStudentData = async () => {
      if (user?.uid) {
        const studentData = await getStudentById(user.uid);
        console.log(studentData)
        setStudent(studentData);
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [user.uid]);

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
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${activeTab === item.tab ? "text-blue-700" : "text-gray-600"
                } hover:bg-blue-100`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Profile Section - Switches to "Profile" on Click */}
      <Button
        color="danger"
        as={Link}
        to="/"
        variant="flat"
        startContent={<LogOut className="w-[18px] h-full" size={20} />}
        onPress={() => logout()}
        className="mt-4 bg-gray-100"
      >
        {"Logout"}
      </Button>
    </div>
  );
};

export default Sidebar;
