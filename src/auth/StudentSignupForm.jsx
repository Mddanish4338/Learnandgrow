// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../utils/firebase";
// import { createUserWithEmailAndPassword, sendEmailVerification, deleteUser } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import student_img from "../assets/student-image.png";

// const StudentSignupForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [verificationMessage, setVerificationMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // New state for loading
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     // Check if passwords match
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     setIsLoading(true); // Set loading to true when signup starts

//     try {
//       // Create user with email and password
//       const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//       const user = userCredential.user;

//       // Send email verification
//       await sendEmailVerification(user);
//       setVerificationMessage("A verification email has been sent. Please check your inbox.");

//       // Save user data to Firestore
//       const userData = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phone: formData.phone,
//         role: "student",
//         uid: user.uid,
//       };

//       const userDocRef = doc(db, "students", user.uid);
//       await setDoc(userDocRef, userData);

//       console.log("Document written with ID: ", user.uid);

//       // Navigate to email verification page
//       navigate("/auth/verify-email");

//       // Delete unverified user after 10 minutes
//       setTimeout(async () => {
//         await user.reload();
//         if (!user.emailVerified) {
//           await deleteUser(user);
//           console.log("Unverified user deleted");
//         }
//       }, 600000); // 10 minutes
//     } catch (error) {
//       console.error("Error:", error);
//       alert(error.message);
//     } finally {
//       setIsLoading(false); // Set loading to false when signup ends
//     }
//   };

//   return (
//     <div className="font-[sans-serif] bg-white md:h-screen">
//       <div className="grid md:grid-cols-2 items-center gap-8 h-full">
//         {/* Image Section */}
//         <div className="max-md:order-1 p-4">
//           <img
//             src={student_img}
//             className="lg:max-w-[85%] w-full h-full aspect-square object-contain block mx-auto"
//             alt="student-img"
//           />
//         </div>

//         {/* Form Section */}
//         <div className="flex items-center md:p-8 p-6 bg-[#FBF6E9] h-full lg:w-11/12 lg:ml-auto">
//           <form className="max-w-lg w-full mx-auto" onSubmit={handleSignup}>
//             <div className="mb-12">
//               <h3 className="text-2xl font-bold text-[#FF6600]">Student Create an account</h3>
//             </div>

//             {/* First Name and Last Name */}
//             <div className="flex flex-col sm:flex-row sm:space-x-4">
//               <div className="w-full sm:w-1/2">
//                 <label className="text-black text-xs block mb-2">First Name</label>
//                 <div className="relative flex items-center">
//                   <input
//                     type="text"
//                     name="firstName"
//                     placeholder="Enter first name"
//                     className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-[#FF6600] pl-2 pr-8 py-3 outline-none"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="w-full sm:w-1/2">
//                 <label className="text-black text-xs block mb-2">Last Name</label>
//                 <div className="relative flex items-center">
//                   <input
//                     type="text"
//                     name="lastName"
//                     placeholder="Enter last name"
//                     className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-[#FF6600] pl-2 pr-8 py-3 outline-none"
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Email */}
//             <div className="mt-8">
//               <label className="text-black text-xs block mb-2">Email</label>
//               <div className="relative flex items-center">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter email"
//                   className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-[#FF6600] pl-2 pr-8 py-3 outline-none"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Phone Number */}
//             <div className="mt-8">
//               <label className="text-black text-xs block mb-2">Phone Number</label>
//               <div className="relative flex items-center">
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Enter phone number"
//                   className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-[#FF6600] pl-2 pr-8 py-3 outline-none"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="mt-8">
//               <label className="text-black text-xs block mb-2">Password</label>
//               <div className="relative flex items-center">
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Enter password"
//                   className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-[#FF6600] pl-2 pr-8 py-3 outline-none"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Confirm Password */}
//             <div className="mt-8">
//               <label className="text-black text-xs block mb-2">Confirm Password</label>
//               <div className="relative flex items-center">
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="Confirm password"
//                   className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-[#FF6600] pl-2 pr-8 py-3 outline-none"
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Terms and Conditions */}
//             <div className="flex items-center mt-8">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 shrink-0 rounded accent-[#FF6600]"
//                 required
//               />
//               <label htmlFor="remember-me" className="text-black ml-3 block text-sm">
//                 I accept the{" "}
//                 <a href="/" className="text-[#FF6600] font-semibold hover:underline ml-1">
//                   Terms and Conditions
//                 </a>
//               </label>
//             </div>

//             {/* Register Button */}
//             <div className="mt-8">
//               <button
//                 type="submit"
//                 className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded bg-[#FF6600] hover:bg-[#FF7F3E] focus:outline-none"
//                 disabled={isLoading} // Disable the button when loading
//               >
//                 {isLoading ? (
//                   <div className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin h-5 w-5 mr-3 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Registering...
//                   </div>
//                 ) : (
//                   "Register"
//                 )}
//               </button>
//             </div>

//             {/* Verification Message */}
//             {verificationMessage && (
//               <p className="text-sm text-green-500 mt-4">{verificationMessage}</p>
//             )}

//             {/* Login Link */}
//             <p className="text-sm text-black mt-8">
//               Already have an account?{" "}
//               <a href="/auth/login" className="text-[#FF6600] font-semibold hover:underline ml-1">
//                 Login here
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentSignupForm;





import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, deleteUser } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import student_img from "../assets/student-image.png";

const StudentSignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [verificationMessage, setVerificationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true); // Set loading to true when signup starts

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      setVerificationMessage("A verification email has been sent. Please check your inbox.");

      // Save user data to Firestore
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: "student",
        uid: user.uid,
      };

      const userDocRef = doc(db, "students", user.uid);
      await setDoc(userDocRef, userData);

      console.log("Document written with ID: ", user.uid);

      // Navigate to email verification page
      navigate("/auth/verify-email");

      // Delete unverified user after 10 minutes
      setTimeout(async () => {
        await user.reload();
        if (!user.emailVerified) {
          await deleteUser(user);
          console.log("Unverified user deleted");
        }
      }, 600000); // 10 minutes
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setIsLoading(false); // Set loading to false when signup ends
    }
  };

  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        {/* Image Section */}
        <div className="max-md:order-1 p-4">
          <img
            src={student_img}
            className="lg:max-w-[85%] w-full h-full aspect-square object-contain block mx-auto"
            alt="student-img"
          />
        </div>

        {/* Form Section */}
        <div className="flex items-center md:p-8 p-6 bg-[#FBF6E9] h-full lg:w-11/12 lg:ml-auto">
          <form className="max-w-lg w-full mx-auto" onSubmit={handleSignup}>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-blue-500">Student Create an account</h3>
            </div>

            {/* Name */}
            <div className="mt-8">
              <label className="text-black text-xs block mb-2">Full Name</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mt-8">
              <label className="text-black text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="mt-8">
              <label className="text-black text-xs block mb-2">Phone Number</label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-8">
              <label className="text-black text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mt-8">
              <label className="text-black text-xs block mb-2">Confirm Password</label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="w-full bg-transparent text-sm text-black border-b border-gray-300 focus:border-blue-500 pl-2 pr-8 py-3 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center mt-8">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 rounded accent-blue-500"
                required
              />
              <label htmlFor="remember-me" className="text-black ml-3 block text-sm">
                I accept the{" "}
                <a href="/" className="text-blue-500 font-semibold hover:underline ml-1">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Register Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-max shadow-xl py-3 px-6 text-sm text-white font-semibold rounded bg-blue-500 hover:bg-blue-600 focus:outline-none"
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
                    Registering...
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>

            {/* Verification Message */}
            {verificationMessage && (
              <p className="text-sm text-blue-500 mt-4">{verificationMessage}</p>
            )}

            {/* Login Link */}
            <p className="text-sm text-blue-500 mt-8">
              Already have an account?{" "}
              <a href="/auth/login" className="text-blue-500 font-semibold hover:underline ml-1">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentSignupForm;
