import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthRoute from "./auth/route/AuthRoute";
import CompanyApp from "./company/companyApp";
import { AuthProvider } from "./context/AuthContext";
import LandingRoutes from "./landingpage/LandingRoutes";
import MentorDashboard from "./mentor/pages/MentorDashboard";
import StudentDashBoard from "./student/studentDashboard";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/auth/*" element={<AuthRoute />} />
          <Route path="/mentor-dashboard" element={<MentorDashboard />} />
          <Route path="/company-panel/*" element={<CompanyApp />} />
          <Route path="/student-panel/*" element={<StudentDashBoard />} />
          <Route path="/" element={<LandingRoutes />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

// function App() {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/auth/*" element={<AuthRoute />} />
//         <Route path="/" element={<LandingRoutes />} />

//         <Route
//           path="/mentor-dashboard/*"
//           element={
//             <ProtectedRoute
//               element={<MentorDashboard />}
//               allowedRole="mentor"
//             />
//           }
//         />
//         <Route
//           path="/company-panel/*"
//           element={
//             <ProtectedRoute element={<CompanyApp />} allowedRole="companies" />
//           }
//         />
//         <Route
//           path="/student-panel/*"
//           element={
//             <ProtectedRoute
//               element={<StudentDashBoard />}
//               allowedRole="students"
//             />
//           }
//         />

//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </AuthProvider>
//   );
// }
