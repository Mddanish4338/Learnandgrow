import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Home from "./Home";
import CompanySignupForm from "./auth/CompanySignupForm";
import Login from "./auth/Login";
import StudentSignupForm from "./auth/StudentSignupForm";
import TrainerSignupForm from "./auth/TrainerSignupForm";
import VerifyEmail from "./auth/VerifyEmail";
import CompanyApp from "./company/companyApp";
import StudentDashBoard from "./student/studentDashboard";
import AuthRoute from "./auth/route/AuthRoute";
import MentorDashboard from "./mentor/pages/MentorDashboard";
import LandingRoutes from "./landingpage/LandingRoutes";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/auth/*" element={<AuthRoute />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard/>}/>
          <Route path="/company-panel/*" element={<CompanyApp />} />
          <Route path="/student-panel/*" element={<StudentDashBoard />} />
          <Route path="/*" element={<LandingRoutes />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
