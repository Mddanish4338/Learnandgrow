import { Button, Divider } from "@nextui-org/react";
import {
  Briefcase,
  FilePlus,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ setActivePage }) {
  const location = useLocation();
  const basePath = "/company-panel";

  const navigation = [
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
    <div className="fixed left-0 top-0 w-64 h-screen bg-content1 border-r border-divider flex flex-col overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Briefcase size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">Company Panel</h1>
        </div>
      </div>

      <Divider />

      <div className="flex-1 py-6 px-3">
        <nav className="space-y-4">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Button
                key={item.name}
                as={Link}
                to={item.path}
                onPress={() => setActivePage(item.name)}
                variant={isActive ? "flat" : "light"}
                className={`w-full justify-start gap-2 mb-2 h-12 ${
                  isActive ? "bg-primary/10 text-primary" : ""
                }`}
                startContent={item.icon}
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
          className="w-full justify-start gap-2"
          startContent={<LogOut size={18} />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
