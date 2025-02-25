import { Button, Divider, Tooltip } from "@nextui-org/react";
import {
  Briefcase,
  FilePlus,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { ImBooks } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ setActivePage }) {
  const location = useLocation();
  const basePath = "/company-panel";

  const navigation = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: `${basePath}/dashboard`,
    },
    {
      name: "Post Job",
      icon: <FilePlus size={20} />,
      path: `${basePath}/post-job`,
    },
    {
      name: "Manage Jobs",
      icon: <Briefcase size={20} />,
      path: `${basePath}/manage-jobs`,
    },
    { name: "Profile", icon: <User size={20} />, path: `${basePath}/profile` },
  ];

  return (
    <div
      className={`fixed left-0 top-0 ${"w-64"} h-screen bg-content1 border-r border-divider flex flex-col overflow-y-auto shadow-lg transition-all duration-300 ease-in-out`}
    >
      <div className=" pt-9 pl-7 text-2xl font-bold text-blue-600 mb-6 text-center flex items-center gap-2">
        <span>
          <ImBooks />
        </span>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-600 to-sky-900">
          Learn&Grow
        </p>
      </div>

      <Divider />

      <div className="flex-1 py-6 px-3 relative">
        <nav className="space-y-3">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Button
                as={Link}
                to={item.path}
                onPress={() => setActivePage(item.name)}
                variant={isActive ? "flat" : "light"}
                className={`w-full justify-start gap-2 mb-2 h-12 group hover:scale-102 transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium border-l-4 border-primary"
                    : "hover:bg-content2"
                }`}
                startContent={
                  <div
                    className={`${
                      isActive ? "text-primary" : "text-foreground-500"
                    } group-hover:text-primary transition-colors`}
                  >
                    {item.icon}
                  </div>
                }
              >
                {item.name}
              </Button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 mt-auto">
        <Divider className="mb-4" />
        <Button
          variant="light"
          color="danger"
          className={`w-full justify-start gap-2 hover:bg-danger/10 transition-colors`}
          startContent={<LogOut size={20} />}
        >
          {"Logout"}
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
