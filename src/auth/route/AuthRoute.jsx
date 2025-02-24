import { Routes, Route } from "react-router-dom";
import StudentSignupForm from "../StudentSignupForm";
import TrainerSignupForm from "../TrainerSignupForm";
import CompanySignupForm from "../CompanySignupForm";
import VerifyEmail from "../VerifyEmail";
import Login from "../Login";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path="/signup/student" element={<StudentSignupForm />} />
      <Route path="/signup/trainer" element={<TrainerSignupForm />} />
      <Route path="/signup/company" element={<CompanySignupForm />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AuthRoute;