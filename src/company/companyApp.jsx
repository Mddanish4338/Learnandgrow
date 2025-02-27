import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/bottomNav";
import Sidebar from "./components/sideBar";
import ViewDetails from "./components/viewDetails";
import useIsMobile from "../hooks/useIsMobile";
import DashBoard from "./pages/dashboard";
import ManageJobs from "./pages/manageJobs";
import PostJob from "./pages/postJob";
import Profile from "./pages/profile";

function CompanyApp() {
  const [activePage, setActivePage] = useState("Dashboard");
  const isMobile = useIsMobile();
  const location = useLocation();

  return (
    <div className="flex h-screen relative">
      {!isMobile && <Sidebar setActivePage={setActivePage} />}

      <div
        className={`flex-1 overflow-x-hidden ${!isMobile ? "ml-64" : "mb-28"}`}
      >
        <Routes>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="manage-jobs/job-details/:id" element={<ViewDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="*"
            element={<Navigate to="/company-panel/dashboard" replace />}
          />
        </Routes>
      </div>

      {isMobile && <BottomNav setActivePage={setActivePage} />}
    </div>
  );
}

export default CompanyApp;
