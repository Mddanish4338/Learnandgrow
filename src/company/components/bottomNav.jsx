import { Button } from "@nextui-org/react";
import { Briefcase, FilePlus, LayoutDashboard, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = ({ setActivePage }) => {
  const location = useLocation();

  const basePath = "/company-panel";

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: `${basePath}/dashboard`,
    },
    {
      name: "Post Job",
      icon: <FilePlus size={18} />,
      path: `${basePath}/post-job`,
    },
    {
      name: "Manage Jobs",
      icon: <Briefcase size={18} />,
      path: `${basePath}/manage-jobs`,
    },
    { name: "Profile", icon: <User size={18} />, path: `${basePath}/profile` },
  ];

  return (
    <nav className="fixed  min-h-14 max-h-16 z-50 bottom-0 w-full bg-white border-t border-gray-200 px-2">
      <div className="max-w-lg mx-auto h-full">
        <div className="flex justify-around items-center h-full">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.name}
                as={Link}
                to={item.path}
                onPress={() => setActivePage(item.name)}
                className={`flex flex-col items-center min-w-[4.5rem] h-14 gap-1 p-2 rounded-lg transition-all
                  ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-transparent text-gray-500 hover:bg-gray-100"
                  }`}
              >
                {item.icon}
                <span className="text-xs font-medium">{item.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
