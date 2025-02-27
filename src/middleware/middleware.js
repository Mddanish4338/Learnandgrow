import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ element, allowedRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <AuthCheckingFallback />;
  }

  if (!user || !user.uid) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  console.log(user);
  if (allowedRole && user.role !== allowedRole) {
    return <UnauthorizedFallback role={user.role} requiredRole={allowedRole} />;
  }

  return element;
};

export const AuthCheckingFallback = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-700">
        Verifying your access...
      </h2>
      <p className="text-gray-500 mt-2">
        Please wait while we check your credentials.
      </p>
    </div>
  );
};

export const UnauthorizedFallback = ({ role, requiredRole }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 text-center mb-6">
          You don't have permission to access this page. This area requires{" "}
          <span className="font-semibold text-indigo-600">{requiredRole}</span>{" "}
          privileges, but your account has{" "}
          <span className="font-semibold text-indigo-600">{role || "no"}</span>{" "}
          role.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="/"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 transition duration-200"
          >
            Go to Homepage
          </a>
          <a
            href="/auth/login"
            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md text-center hover:bg-gray-50 transition duration-200"
          >
            Switch Account
          </a>
        </div>
      </div>
    </div>
  );
};
