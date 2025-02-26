// import { useState, useEffect, useRef } from "react";
// import { FaHome, FaUser, FaPlus, FaClipboardList } from "react-icons/fa";
// import { ImBooks } from "react-icons/im";
// import { auth, db } from "../../utils/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const TSidebar = ({ activeTab, setActiveTab, setCurrentComponent, onLogout }) => {
//   const [underlineStyle, setUnderlineStyle] = useState({ top: 0, height: 0 });
//   const [profileImage, setProfileImage] = useState("https://avatar.iran.liara.run/public/38"); 
//   const [profileName, setProfileName] = useState("Loading..."); 
//   const [profileEmail, setProfileEmail] = useState("loading..."); 
//   const [isProfileOpen, setIsProfileOpen] = useState(false); 
//   const tabsRef = useRef([]);

//   const menuItems = [
//     { name: "Dashboard", icon: <FaHome />, tab: "dashboard" },
//     { name: "Profile", icon: <FaUser />, tab: "profile" },
//     { name: "Post Mentorship", icon: <FaPlus />, tab: "post-mentorship" },
//     { name: "My Posts", icon: <FaClipboardList />, tab: "posts" },
//   ];

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userId = user.uid;
//         const studentRef = doc(db, "students", userId);
//         const trainerRef = doc(db, "trainers", userId);
//         const companyRef = doc(db, "companies", userId);

//         const studentSnap = await getDoc(studentRef);
//         const trainerSnap = await getDoc(trainerRef);
//         const companySnap = await getDoc(companyRef);

//         if (studentSnap.exists()) {
//           const studentData = studentSnap.data();
//           setProfileImage(studentData.profileImage || profileImage);
//           setProfileName(`${studentData.firstName} ${studentData.lastName}` || profileName);
//           setProfileEmail(studentData.email || profileEmail);
//         } else if (trainerSnap.exists()) {
//           const trainerData = trainerSnap.data();
//           setProfileImage(trainerData.image || profileImage);
//           setProfileName(trainerData.name || profileName);
//           setProfileEmail(trainerData.email || profileEmail);
//         } else if (companySnap.exists()) {
//           const companyData = companySnap.data();
//           setProfileImage(companyData.profileImage || profileImage);
//           setProfileName(companyData.name || profileName);
//           setProfileEmail(companyData.email || profileEmail);
//         }
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     setCurrentComponent(tab);
//   };

//   return (
//     <>
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="hidden md:flex flex-col w-64 h-screen bg-gray-100 p-4 justify-between relative">
//         <div>
//           <div className="text-2xl font-bold text-blue-600 mb-6 text-center flex items-center gap-2">
//             <ImBooks />
//             <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-600 to-sky-900">
//               Learn&Grow
//             </p>
//           </div>
//           <nav className="space-y-2">
//             {menuItems.map((item) => (
//               <div
//                 key={item.tab}
//                 onClick={() => handleTabClick(item.tab)}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
//                   activeTab === item.tab ? "text-blue-700 bg-blue-100" : "text-gray-600"
//                 } hover:bg-blue-100`}
//               >
//                 {item.icon}
//                 {item.name}
//               </div>
//             ))}
//           </nav>
//         </div>
//         <div className="relative mt-auto">
//           <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-blue-700 hover:bg-blue-200" onClick={() => setIsProfileOpen(!isProfileOpen)}>
//             <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full" />
//             <span>{profileName}</span>
//           </div>
//           {isProfileOpen && (
//             <div className="absolute bottom-16 left-4 w-56 bg-white shadow-lg rounded-lg p-4">
//               <p className="text-blue-700 font-semibold">{profileName}</p>
//               <p className="text-sm text-gray-600">{profileEmail}</p>
//               <button className="mt-2 w-full p-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500" onClick={onLogout}>Logout</button>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Main Content */}
//       <div className="flex-1 min-h-screen p-6 md:ml-64 md:mb-0 pb-16 md:pb-6"> 
//         {setCurrentComponent}
//       </div>

//       {/* Bottom Navbar */}
//       <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-100 flex justify-around p-3 shadow-lg z-50">
//         {menuItems.map((item) => (
//           <div key={item.tab} onClick={() => handleTabClick(item.tab)} className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${activeTab === item.tab ? "text-blue-700" : "text-gray-600"}`}>
//             {item.icon}
//             <span className="text-xs">{item.name}</span>
//           </div>
//         ))}
//         <div className="flex flex-col items-center cursor-pointer transition-all duration-200 text-blue-700" onClick={() => setIsProfileOpen(!isProfileOpen)}>
//           <img src={profileImage} alt="Profile" className="w-6 h-6 rounded-full" />
//           <span className="text-xs">{profileName}</span>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default TSidebar;





import { useState, useEffect, useRef } from "react";
import { FaHome, FaUser, FaPlus, FaClipboardList } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { auth, db } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const TSidebar = ({ activeTab, setActiveTab, setCurrentComponent, onLogout }) => {
  const [profileImage, setProfileImage] = useState("https://avatar.iran.liara.run/public/38"); 
  const [profileName, setProfileName] = useState("Loading..."); 
  const [profileEmail, setProfileEmail] = useState("loading..."); 
  const [isProfileOpen, setIsProfileOpen] = useState(false); 

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, tab: "dashboard" },
    { name: "Profile", icon: <FaUser />, tab: "profile" },
    { name: "Post Mentorship", icon: <FaPlus />, tab: "post-mentorship" },
    { name: "My Posts", icon: <FaClipboardList />, tab: "posts" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const studentRef = doc(db, "students", userId);
        const trainerRef = doc(db, "trainers", userId);
        const companyRef = doc(db, "companies", userId);

        const studentSnap = await getDoc(studentRef);
        const trainerSnap = await getDoc(trainerRef);
        const companySnap = await getDoc(companyRef);

        if (studentSnap.exists()) {
          const studentData = studentSnap.data();
          setProfileImage(studentData.profileImage || profileImage);
          setProfileName(`${studentData.firstName} ${studentData.lastName}` || profileName);
          setProfileEmail(studentData.email || profileEmail);
        } else if (trainerSnap.exists()) {
          const trainerData = trainerSnap.data();
          setProfileImage(trainerData.image || profileImage);
          setProfileName(trainerData.name || profileName);
          setProfileEmail(trainerData.email || profileEmail);
        } else if (companySnap.exists()) {
          const companyData = companySnap.data();
          setProfileImage(companyData.profileImage || profileImage);
          setProfileName(companyData.name || profileName);
          setProfileEmail(companyData.email || profileEmail);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentComponent(tab);
  };

  return (
    <>
      <div className="hidden md:flex fixed left-0 top-0 w-64 h-screen bg-gray-100 border-r shadow-lg flex-col justify-between">
        <div>
          <div className="text-2xl font-bold text-blue-600 mb-6 text-center flex items-center gap-2 pt-6">
            <ImBooks />
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-sky-600 to-sky-900">Learn&Grow</p>
          </div>
          <nav className="space-y-2 px-4">
            {menuItems.map((item) => (
              <div
                key={item.tab}
                onClick={() => handleTabClick(item.tab)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${activeTab === item.tab ? "text-blue-700 bg-blue-100" : "text-gray-600 hover:bg-blue-100"}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}
          </nav>
        </div>
        {/* Profile Section */}
        <div className="relative mt-auto">
          <div
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 text-blue-700 hover:bg-blue-200"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full" />
            <span>{profileName}</span>
          </div>
          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute bottom-16 left-4 w-56 bg-white shadow-lg rounded-lg p-4">
              <p className="text-blue-700 font-semibold">{profileName}</p>
              <p className="text-sm text-gray-600">{profileEmail}</p>
              <button className="mt-2 w-full p-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500" onClick={onLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="md:ml-64 p-6">
        {setCurrentComponent}
      </div>

{/* Bottom Navbar */}
<div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-100 flex justify-around p-3 shadow-lg z-50">
  {menuItems.map((item) => (
    <div key={item.tab} onClick={() => handleTabClick(item.tab)} className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${activeTab === item.tab ? "text-blue-700" : "text-gray-600"}`}>
      {item.icon}
      <span className="text-xs">{item.name}</span>
    </div>
  ))}
  {/* Profile Icon in Bottom Navbar */}
  <div className="relative">
    <div className="flex flex-col items-center cursor-pointer transition-all duration-200 text-blue-700" onClick={() => setIsProfileOpen(!isProfileOpen)}>
      <img src={profileImage} alt="Profile" className="w-6 h-6 rounded-full" />
      <span className="text-xs">{profileName}</span>
    </div>
    {/* Profile Dropdown */}
    {isProfileOpen && (
      <div className="absolute bottom-12 left-[-200px] w-56 bg-white shadow-lg rounded-lg p-4 z-50">
        <p className="text-blue-700 font-semibold">{profileName}</p>
        <p className="text-sm text-gray-600">{profileEmail}</p>
        <button className="mt-2 w-full p-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500" onClick={onLogout}>
          Logout
        </button>
      </div>
    )}
  </div>
</div>

    </>
  );
};

export default TSidebar;




















// import { useState, useEffect, useRef } from "react";
// import { FaHome, FaUser, FaPlus, FaClipboardList } from "react-icons/fa";
// import { ImBooks } from "react-icons/im";
// import { auth, db } from "../../utils/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const TSidebar = ({ activeTab, setActiveTab, setCurrentComponent, onLogout }) => {
//   const [profileImage, setProfileImage] = useState("https://avatar.iran.liara.run/public/38"); 
//   const [profileName, setProfileName] = useState("Loading..."); 
//   const [profileEmail, setProfileEmail] = useState("loading..."); 
//   const [isProfileOpen, setIsProfileOpen] = useState(false); 
//   const tabsRef = useRef([]);

//   const menuItems = [
//     { name: "Dashboard", icon: <FaHome />, tab: "dashboard" },
//     { name: "Profile", icon: <FaUser />, tab: "profile" },
//     { name: "Post Mentorship", icon: <FaPlus />, tab: "post-mentorship" },
//     { name: "My Posts", icon: <FaClipboardList />, tab: "posts" },
//   ];

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userRef = doc(db, "users", user.uid);
//         const userSnap = await getDoc(userRef);

//         if (userSnap.exists()) {
//           const userData = userSnap.data();
//           setProfileImage(userData.image || "https://avatar.iran.liara.run/public/38"); // Fallback to default avatar
//           setProfileName(userData.name || "User"); // Fallback if name is missing
//           setProfileEmail(userData.email || "No email found"); // Fallback if email is missing
//         }
//       } else {
//         setProfileName("Guest");
//         setProfileEmail("Not logged in");
//         setProfileImage("https://avatar.iran.liara.run/public/38");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleTabClick = (tab) => {
//     if (activeTab !== tab) {
//       setActiveTab(tab);
//       setCurrentComponent(tab);
//     }
//   };

//   return (
//     <>
//       <div className="fixed left-0 top-0 w-64 h-screen bg-gray-100 border-r shadow-lg flex flex-col justify-between">
//         <div>
//           <div className="text-2xl font-bold text-blue-600 mb-6 text-center flex items-center gap-2 pt-6">
//             <ImBooks />
//             <p className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-sky-600 to-sky-900">Learn&Grow</p>
//           </div>
//           <nav className="space-y-2 px-4">
//             {menuItems.map((item) => (
//               <div
//                 key={item.tab}
//                 onClick={() => handleTabClick(item.tab)}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${activeTab === item.tab ? "text-blue-700 bg-blue-100" : "text-gray-600 hover:bg-blue-100"}`}
//               >
//                 {item.icon}
//                 <span>{item.name}</span>
//               </div>
//             ))}
//           </nav>
//         </div>
//         {/* Profile Section */}
//         <div className="relative mt-auto">
//           <div
//             className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 text-blue-700 hover:bg-blue-200"
//             onClick={() => setIsProfileOpen(!isProfileOpen)}
//           >
//             <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full" />
//             <span>{profileName}</span>
//           </div>
//           {/* Profile Dropdown */}
//           {isProfileOpen && (
//             <div className="absolute bottom-16 left-4 w-56 bg-white shadow-lg rounded-lg p-4">
//               <p className="text-blue-700 font-semibold">{profileName}</p>
//               <p className="text-sm text-gray-600">{profileEmail}</p>
//               <button className="mt-2 w-full p-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500" onClick={onLogout}>
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="ml-64 p-6">
//         {setCurrentComponent}
//       </div>
//     </>
//   );
// };

// export default TSidebar;
















































// import { useState, useEffect, useRef } from "react";
// import { FaHome, FaUser, FaPlus, FaClipboardList } from "react-icons/fa";
// import { ImBooks } from "react-icons/im";
// import { auth, db } from "../../utils/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const TSidebar = ({ activeTab, setActiveTab, setCurrentComponent, onLogout }) => {
//   const [profileImage, setProfileImage] = useState("https://avatar.iran.liara.run/public/38"); 
//   const [profileName, setProfileName] = useState("Loading..."); 
//   const [profileEmail, setProfileEmail] = useState("loading..."); 
//   const [isProfileOpen, setIsProfileOpen] = useState(false); 
//   const tabsRef = useRef([]);

//   const menuItems = [
//     { name: "Dashboard", icon: <FaHome />, tab: "dashboard" },
//     { name: "Profile", icon: <FaUser />, tab: "profile" },
//     { name: "Post Mentorship", icon: <FaPlus />, tab: "post-mentorship" },
//     { name: "My Posts", icon: <FaClipboardList />, tab: "posts" },
//   ];

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userId = user.uid;
//         const userRef = doc(db, "users", userId);
//         const userSnap = await getDoc(userRef);
//         if (userSnap.exists()) {
//           const userData = userSnap.data();
//           setProfileImage(userData.image || profileImage);
//           setProfileName(userData.name || profileName);
//           setProfileEmail(userData.email || profileEmail);
//         }
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleTabClick = (tab) => {
//     if (activeTab !== tab) {
//       setActiveTab(tab);
//       setCurrentComponent(tab);
//     }
//   };

//   return (
//     <>
//       <div className="fixed left-0 top-0 w-64 h-screen bg-gray-100 border-r shadow-lg flex flex-col justify-between">
//         <div>
//           <div className="text-2xl font-bold text-blue-600 mb-6 text-center flex items-center gap-2 pt-6">
//             <ImBooks />
//             <p className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-sky-600 to-sky-900">Learn&Grow</p>
//           </div>
//           <nav className="space-y-2 px-4">
//             {menuItems.map((item) => (
//               <div
//                 key={item.tab}
//                 onClick={() => handleTabClick(item.tab)}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${activeTab === item.tab ? "text-blue-700 bg-blue-100" : "text-gray-600 hover:bg-blue-100"}`}
//               >
//                 {item.icon}
//                 <span>{item.name}</span>
//               </div>
//             ))}
//           </nav>
//         </div>
//         {/* Profile Section */}
//         <div className="relative mt-auto">
//           <div
//             className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 text-blue-700 hover:bg-blue-200"
//             onClick={() => setIsProfileOpen(!isProfileOpen)}
//           >
//             <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full" />
//             <span>{profileName}</span>
//           </div>
//           {/* Profile Dropdown */}
//           {isProfileOpen && (
//             <div className="absolute bottom-16 left-4 w-56 bg-white shadow-lg rounded-lg p-4">
//               <p className="text-blue-700 font-semibold">{profileName}</p>
//               <p className="text-sm text-gray-600">{profileEmail}</p>
//               <button className="mt-2 w-full p-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500" onClick={onLogout}>
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="ml-64 p-6">
//         {setCurrentComponent}
//       </div>
//     </>
//   );
// };

// export default TSidebar;

















// import BottomNav from "./BottomNav"; // Import BottomNav
// import { useState, useEffect, useRef } from "react";
// import { FaHome, FaUser, FaPlus, FaClipboardList } from "react-icons/fa";
// import { ImBooks } from "react-icons/im";
// import { auth, db } from "../../utils/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const TSidebar = ({ activeTab, setActiveTab, setCurrentComponent, onLogout }) => {
//   const [underlineStyle, setUnderlineStyle] = useState({ top: 0, height: 0 });
//   const [profileImage, setProfileImage] = useState("https://avatar.iran.liara.run/public/38");
//   const [profileName, setProfileName] = useState("Loading...");
//   const [profileEmail, setProfileEmail] = useState("loading...");
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const tabsRef = useRef([]);

//   const menuItems = [
//     { name: "Dashboard", icon: <FaHome />, tab: "dashboard" },
//     { name: "Profile", icon: <FaUser />, tab: "profile" },
//     { name: "Post Mentorship", icon: <FaPlus />, tab: "post-mentorship" },
//     { name: "My Posts", icon: <FaClipboardList />, tab: "posts" },
//   ];

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const userId = user.uid;
//         const trainerRef = doc(db, "trainers", userId);
//         const trainerSnap = await getDoc(trainerRef);
//         if (trainerSnap.exists()) {
//           const trainerData = trainerSnap.data();
//           setProfileImage(trainerData.image || profileImage);
//           setProfileName(trainerData.name || profileName);
//           setProfileEmail(trainerData.email || profileEmail);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const index = menuItems.findIndex((item) => item.tab === activeTab);
//     if (index !== -1 && tabsRef.current[index]) {
//       const tabElement = tabsRef.current[index];
//       setUnderlineStyle({
//         top: tabElement.offsetTop,
//         height: tabElement.clientHeight,
//       });
//     }
//   }, [activeTab]);

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     setCurrentComponent(tab);
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar for Large Screens */}
//       <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-gray-100 p-4 justify-between">
//         <div>
//           <div className="absolute left-0 w-2 bg-blue-500 rounded-r-lg transition-all duration-300" style={{ top: underlineStyle.top, height: underlineStyle.height }} />

//           <div className="text-2xl font-bold text-blue-600 mb-6 text-center flex items-center gap-2">
//             <span><ImBooks /></span>
//             <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-600 to-sky-900">Learn&Grow</p>
//           </div>

//           <nav className="space-y-2">
//             {menuItems.map((item, index) => (
//               <div
//                 key={item.tab}
//                 ref={(el) => (tabsRef.current[index] = el)}
//                 onClick={() => handleTabClick(item.tab)}
//                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
//                   activeTab === item.tab ? "text-blue-700" : "text-gray-600"
//                 } hover:bg-blue-100`}
//               >
//                 <span>{item.icon}</span>
//                 <span>{item.name}</span>
//               </div>
//             ))}
//           </nav>
//         </div>

//         {/* Profile Section */}
//         <div className="relative mt-auto">
//           <div
//             className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 text-blue-700 hover:bg-blue-200"
//             onClick={() => setIsProfileOpen(!isProfileOpen)}
//           >
//             <img src={profileImage} alt="Profile" className="w-10 h-10 rounded-full" />
//             <span>{profileName}</span>
//           </div>

//           {isProfileOpen && (
//             <div className="absolute bottom-16 left-4 w-56 bg-white shadow-lg rounded-lg p-4">
//               <p className="text-blue-700 font-semibold">{profileName}</p>
//               <p className="text-sm text-gray-600">{profileEmail}</p>
//               <button className="mt-2 w-full p-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500" onClick={onLogout}>Logout</button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 md:pl-64 h-screen overflow-y-auto p-6">{setCurrentComponent}</div>

//       {/* Bottom Navbar for Small Screens */}
//       <BottomNav setActivePage={setActiveTab} />
//     </div>
//   );
// };

// export default TSidebar;
