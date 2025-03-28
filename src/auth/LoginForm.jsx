import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sigin_img from "../assets/signin-image.webp";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Set loading to true when login starts

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Check if email is verified
      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        setIsLoading(false); // Set loading to false if email is not verified
        return;
      }

      // Check custom claims for user role (if set during signup)
      const idTokenResult = await user.getIdTokenResult();
      const userRole = idTokenResult.claims.role;

      if (userRole) {
        // Show success toast
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Delay navigation until the toast is displayed
        setTimeout(() => {
          redirectUser(userRole);
        }, 1000);
      } else {
        // Fallback to Firestore query if custom claims are not set
        const roleCollections = ["students", "trainers", "companies"];
        const queries = roleCollections.map((role) =>
          getDoc(doc(db, role, user.uid))
        );

        // Run Firestore queries in parallel
        const results = await Promise.all(queries);
        const userData = results.find((result) => result.exists())?.data();
        const role =
          roleCollections[results.findIndex((result) => result.exists())];

        if (!userData) {
          setError("User details not found.");
          setIsLoading(false); // Set loading to false if user details are not found
          return;
        }

        // Show success toast
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Delay navigation until the toast is displayed
        setTimeout(() => {
          redirectUser(role);
        }, 1000);
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false); // Set loading to false if there's an error
      // Show error toast
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const redirectUser = (role) => {
    switch (role) {
      case "students":
        navigate("/student-panel/*");
        break;
      case "trainers":
        navigate("/mentor-dashboard");
        break;
      case "companies":
        navigate("/company-panel/*");
        break;
      default:
        setError("Invalid user role.");
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      setResetEmailSent(true);
      setError("");
      // Show success toast
      toast.success("Password reset email sent!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      setError(error.message);
      // Show error toast
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="font-[sans-serif] bg-gray-900 md:h-screen">
      <ToastContainer />
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4">
          <img
             src={sigin_img}
            // src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[80%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>

        <div className="flex items-center md:p-8 p-6 bg-[#FBF6E9] md:rounded-tl-[55px] md:rounded-bl-[55px] h-full">
          <form className="max-w-lg w-full mx-auto" onSubmit={handleLogin}>
            <div className="mb-12">
              <h3 className="text-[#0066FF] text-4xl font-bold">Sign in</h3>
              <p className="text-gray-800 text-sm mt-4">
                Don't have an account?{" "}
                <a
                  href="/"
                  className="text-[#0066FF] font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </a>
              </p>
            </div>

            <div>
              <label className="text-gray-800 text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="w-full text-sm border-b border-gray-300 focus:border-gray-800 pl-2 pr-8 py-3 outline-none"
                  onChange={handleChange}
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            <div className="mt-8">
              <label className="text-gray-800 text-xs block mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  className="w-full text-sm border-b border-gray-300 focus:border-gray-800 pl-2 pr-8 py-3 outline-none"
                  onChange={handleChange}
                  required
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  ) : (
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  )}
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex items-center">
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[#0066FF] font-semibold text-sm hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}

            {resetEmailSent && (
              <p className="text-green-500 text-sm mt-2 text-center">
                A password reset email has been sent to your registered email
                address.
              </p>
            )}

            <div className="mt-12">
              <button
                type="submit"
                className="w-full py-3 px-6 text-sm font-semibold tracking-wider rounded-full text-white bg-[#0066FF] hover:bg-[#FF7F3E] focus:outline-none"
                disabled={isLoading} // Disable the button when loading
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>


          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../utils/firebase";
// import {
//   signInWithEmailAndPassword,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { getDoc, doc } from "firebase/firestore";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import sigin_img from "../assets/signin-image.webp";

// const LoginForm = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [resetEmailSent, setResetEmailSent] = useState(false);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // New state for loading
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true); // Set loading to true when login starts

//     try {
//       // Sign in with email and password
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       );
//       const user = userCredential.user;

//       // Check if email is verified
//       if (!user.emailVerified) {
//         setError("Please verify your email before logging in.");
//         setIsLoading(false); // Set loading to false if email is not verified
//         return;
//       }

//       // Check custom claims for user role (if set during signup)
//       const idTokenResult = await user.getIdTokenResult();
//       const userRole = idTokenResult.claims.role;

//       if (userRole) {
//         // Show success toast
//         toast.success("Login successful!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });

//         // Delay navigation until the toast is displayed
//         setTimeout(() => {
//           redirectUser(userRole);
//         }, 1000);
//       } else {
//         // Fallback to Firestore query if custom claims are not set
//         const roleCollections = ["students", "trainers", "companies"];
//         const queries = roleCollections.map((role) =>
//           getDoc(doc(db, role, user.uid))
//         );

//         // Run Firestore queries in parallel
//         const results = await Promise.all(queries);
//         const userData = results.find((result) => result.exists())?.data();
//         const role =
//           roleCollections[results.findIndex((result) => result.exists())];

//         if (!userData) {
//           setError("User details not found.");
//           setIsLoading(false); // Set loading to false if user details are not found
//           return;
//         }

//         // Show success toast
//         toast.success("Login successful!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });

//         // Delay navigation until the toast is displayed
//         setTimeout(() => {
//           redirectUser(role);
//         }, 1000);
//       }
//     } catch (error) {
//       setError(error.message);
//       setIsLoading(false); // Set loading to false if there's an error
//       // Show error toast
//       toast.error(error.message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   const redirectUser = (role) => {
//     switch (role) {
//       case "students":
//         navigate("/student-panel/*");
//         break;
//       case "trainers":
//         navigate("/mentor-dashboard");
//         break;
//       case "companies":
//         navigate("/company-panel/*");
//         break;
//       default:
//         setError("Invalid user role.");
//     }
//   };

//   const handleForgotPassword = async () => {
//     if (!formData.email) {
//       setError("Please enter your email address.");
//       return;
//     }

//     try {
//       await sendPasswordResetEmail(auth, formData.email);
//       setResetEmailSent(true);
//       setError("");
//       // Show success toast
//       toast.success("Password reset email sent!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     } catch (error) {
//       setError(error.message);
//       // Show error toast
//       toast.error(error.message, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <div className="font-[sans-serif] bg-gray-900 md:h-screen">
//       <ToastContainer />
//       <div className="grid md:grid-cols-2 items-center gap-8 h-full">
//         <div className="max-md:order-1 p-4">
//           <img
//             src={sigin_img}
//             // src="https://readymadeui.com/signin-image.webp"
//             className="lg:max-w-[80%] w-full h-full object-contain block mx-auto"
//             alt="login-image"
//           />
//         </div>

//         <div className="flex items-center md:p-8 p-6 bg-[#FBF6E9] md:rounded-tl-[55px] md:rounded-bl-[55px] h-full">
//           <form className="max-w-lg w-full mx-auto" onSubmit={handleLogin}>
//             <div className="mb-12">
//               <h3 className="text-[#0066FF] text-4xl font-bold">Sign in</h3>
//               <p className="text-gray-800 text-sm mt-4">
//                 Don't have an account?{" "}
//                 <a
//                   href="/"
//                   className="text-[#0066FF] font-semibold hover:underline ml-1 whitespace-nowrap"
//                 >
//                   Register here
//                 </a>
//               </p>
//             </div>

//             <div>
//               <label className="text-gray-800 text-xs block mb-2">Email</label>
//               <div className="relative flex items-center">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter email"
//                   className="w-full text-sm border-b border-gray-300 focus:border-gray-800 pl-2 pr-8 py-3 outline-none"
//                   onChange={handleChange}
//                   required
//                 />
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="#bbb"
//                   stroke="#bbb"
//                   className="w-[18px] h-[18px] absolute right-2"
//                   viewBox="0 0 682.667 682.667"
//                 >
//                   <defs>
//                     <clipPath id="a" clipPathUnits="userSpaceOnUse">
//                       <path d="M0 512h512V0H0Z" data-original="#000000"></path>
//                     </clipPath>
//                   </defs>
//                   <g
//                     clipPath="url(#a)"
//                     transform="matrix(1.33 0 0 -1.33 0 682.667)"
//                   >
//                     <path
//                       fill="none"
//                       strokeMiterlimit="10"
//                       strokeWidth="40"
//                       d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
//                       data-original="#000000"
//                     ></path>
//                     <path
//                       d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
//                       data-original="#000000"
//                     ></path>
//                   </g>
//                 </svg>
//               </div>
//             </div>

//             <div className="mt-8">
//               <label className="text-gray-800 text-xs block mb-2">
//                 Password
//               </label>
//               <div className="relative flex items-center">
//                 <input
//                   type={passwordVisible ? "text" : "password"}
//                   name="password"
//                   placeholder="Enter password"
//                   className="w-full text-sm border-b border-gray-300 focus:border-gray-800 pl-2 pr-8 py-3 outline-none"
//                   onChange={handleChange}
//                   required
//                 />
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
//                   viewBox="0 0 1024 1024"
//                   onClick={togglePasswordVisibility}
//                 >
//                   <path
//                     fill="#bbb"
//                     d="M528 384c-79 0-144 65-144 144s65 144 144 144 144-65 144-144-65-144-144-144zM528 624c-52.9 0-96-43.1-96-96s43.1-96 96-96 96 43.1 96 96-43.1 96-96 96z"
//                   ></path>
//                   <path
//                     fill="#bbb"
//                     d="M930.5 517.5c-2.4-6.5-6.7-12.1-11.7-16.3l-13.1-12.1c-20.4-18.3-45.3-32.7-73.7-44.2-28.4-11.6-58.7-20.6-90.1-27.2-54.5-10.7-112.4-15.8-174.6-15.8-62.2 0-120.1 5.1-174.6 15.8-31.3 6.6-61.7 15.6-90.1 27.2-28.4 11.5-53.2 25.9-73.7 44.2-5.1 4.2-9.4 9.7-11.7 16.3L80.5 35.5c-22.8-33.5-56.7-56.3-98.1-56.3-61.5 0-111.7 50.2-111.7 111.7 0 61.5 50.2 111.7 111.7 111.7 33.5 0 63.6-14.6 85.2-37.4l250.5 224.3c17.9 15.7 36.4 31.1 57.1 45.1 21.2 13.5 43.8 24.5 67.4 34.3 9.7 5.5 20.1 10.7 30.4 15.8 1.5 1.1 3.1 2.2 4.6 3.3 3.2 2.7 6.4 5.5 9.6 8.3 9.1 8 18.5 16.1 28.1 24 10.4 7.8 19.3 17 28.7 26.5l150.7 157.8c30.4 31.9 30.4 81.6 0 113.5-30.4 31.9-79.7 31.9-110.1 0L512 715.5c-30.4 31.9-79.7 31.9-110.1 0-10.8-11.3-19.9-22.6-28.3-33.7-4.4 7.6-10.3 15.1-17.4 22.1-4.5 4.4-9.3 8.4-14.3 12.1-8.9 7.8-18.4 15.1-27.7 22.3l-187.4 130.3c-33.2 28.2-71.7 47.7-112.3 56.4-26.6 4.9-54.5 7.4-83.6 7.4-118.9 0-214.7-96.1-214.7-214.7 0-118.9 96.1-214.7 214.7-214.7 29.2 0 57.9 5.4 84.7 15.1 38.6 13.5 74.3 33.5 106.8 59.7L528 128l212.7 154.6c32.5-26.2 68.2-46.2 106.8-59.7 26.8-9.7 55.5-15.1 84.7-15.1 118.9 0 214.7 96.1 214.7 214.7 0 118.9-96.1 214.7-214.7 214.7-37.3 0-74.5-7.1-110.3-20.9-42.6-16.3-83.2-39.1-121.2-68.9l-60.4 53.6c27.7 24.4 54.5 50.1 83.3 76.5 30.3 27.6 62.7 52.4 96.2 77.8 7.7 6.1 15.3 12.1 23.1 18 8.2 6.1 16.8 11.9 25.6 17.3 17.2 10.9 34.6 21.1 52.6 31.1z"
//                   ></path>
//                 </svg>
//               </div>
//             </div>

//             <div className="flex justify-between items-center mt-4">
//               <div>
//                 <button
//                   type="button"
//                   onClick={handleForgotPassword}
//                   className="text-[#0066FF] font-semibold text-sm hover:underline"
//                 >
//                   Forgot password?
//                 </button>
//               </div>
//             </div>

//             <div className="mt-8">
//               <button
//                 type="submit"
//                 className="w-full bg-[#0066FF] text-white py-3 rounded-md"
//                 disabled={isLoading} // Disable button while loading
//               >
//                 {isLoading ? "Logging in..." : "Login"}
//               </button>
//             </div>

//             {error && (
//               <div className="text-red-500 text-sm mt-4">
//                 <p>{error}</p>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

