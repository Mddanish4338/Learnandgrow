// import React, { useEffect, useState } from "react";
// import { Card, CardHeader, CardBody, Progress, Button } from "@nextui-org/react";
// import { UserCheck, RefreshCcw } from "lucide-react";
// import { getTeacherProfile } from "../../services/teacherService";
// import { useAuth } from "../../context/AuthContext";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../utils/firebase";

// const TDashboard = ({ handleTabClick }) => {
//   const { user } = useAuth();
//   const [teacherProfile, setTeacherProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [profileCompletion, setProfileCompletion] = useState(0);
//   const [numberOfPosts, setNumberOfPosts] = useState(0);
//   const [latestPost, setLatestPost] = useState(null);

//   // Fetch teacher profile data
//   useEffect(() => {
//     const fetchTeacherData = async () => {
//       if (user?.uid) {
//         const profileData = await getTeacherProfile(user.uid);
//         setTeacherProfile(profileData);
//         setLoading(false);
//       }
//     };
//     fetchTeacherData();
//   }, [user?.uid]);

//   // Calculate profile completion
//   useEffect(() => {
//     if (teacherProfile) {
//       const requiredFields = [
//         "name", "expertise", "location", "experience", "email", "phone",
//         "about", "availability", "certifications", "socialLinks", "image"
//       ];
//       const filledFields = requiredFields.filter(
//         (field) => teacherProfile[field] && teacherProfile[field].toString().trim() !== ""
//       );
//       const completionPercentage = Math.round((filledFields.length / requiredFields.length) * 100);
//       setProfileCompletion(completionPercentage);
//     }
//   }, [teacherProfile]);

//   // Fetch posts data
//   const fetchPosts = async () => {
//     try {
//       const postsRef = collection(db, "courses");
//       const postsSnap = await getDocs(postsRef);
//       const posts = postsSnap.docs
//         .map(doc => ({ id: doc.id, ...doc.data() }))
//         .filter(post => post.timestamp) // Ensure timestamp exists
//         .sort((a, b) => b.timestamp - a.timestamp); // Sort by latest timestamp

//       setNumberOfPosts(posts.length);
//       setLatestPost(posts.length > 0 ? posts[0] : null);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="mb-6 bg-gradient-to-tr from-sky-400 to-sky-600 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold">Hello, {teacherProfile?.name || 'Trainer'}! 👋</h2>
//           <p className="mt-1 text-gray-200">Welcome back! Here's your progress and updates.</p>
//         </div>
//         <Button size="sm" color="secondary" onClick={fetchPosts} className="flex items-center">
//           <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
//         </Button>
//       </div>
      
//       <div className="flex flex-col md:flex-row gap-6 mb-8 justify-center">
//         <Card className="shadow-md w-full md:w-1/3">
//           <CardHeader className="flex gap-2 px-6 pt-6">
//             <div className="bg-blue-100 p-2 rounded-lg">
//               <UserCheck className="h-5 w-5 text-blue-500" />
//             </div>
//             <span className="font-bold text-lg">Profile Completion</span>
//           </CardHeader>
//           <CardBody className="px-6 pb-6">
//             <Progress
//               value={profileCompletion}
//               color="primary"
//               size="md"
//               radius="sm"
//               className="w-full"
//               showValueLabel={true}
//             />
//             <div className="flex justify-between items-center mt-2">
//               <span className="text-default-500 text-sm">{`${profileCompletion}% complete`}</span>
//             </div>
//           </CardBody>
//         </Card>

//         <Card className="shadow-md w-full md:w-1/3">
//           <CardHeader className="flex gap-2 px-6 pt-6">
//             <span className="font-bold text-lg">Latest Post</span>
//           </CardHeader>
//           <CardBody className="flex flex-col justify-center items-center text-lg font-bold text-blue-600 pb-6">
//             {latestPost ? latestPost.title : "No posts available"}
//           </CardBody>
//         </Card>

//         <Card className="shadow-md w-full md:w-1/3">
//           <CardHeader className="flex gap-2 px-6 pt-6">
//             <span className="font-bold text-lg">Number of Posts</span>
//           </CardHeader>
//           <CardBody className="flex justify-center items-center text-4xl font-bold text-blue-600 pb-6">
//             {numberOfPosts}
//           </CardBody>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default TDashboard;


import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Progress, Button } from "@nextui-org/react";
import { UserCheck, RefreshCcw } from "lucide-react";
import { getTeacherProfile } from "../../services/teacherService";
import { useAuth } from "../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";

const TDashboard = ({ handleTabClick }) => {
  const { user } = useAuth();
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [latestPost, setLatestPost] = useState(null);

  // Fetch teacher profile data
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (user?.uid) {
        const profileData = await getTeacherProfile(user.uid);
        setTeacherProfile(profileData);
        setLoading(false);
      }
    };
    fetchTeacherData();
  }, [user?.uid]);

  // Calculate profile completion
  useEffect(() => {
    if (teacherProfile) {
      const requiredFields = [
        "name", "expertise", "location", "experience", "email", "phone",
        "about", "availability", "certifications", "socialLinks", "image"
      ];
      const filledFields = requiredFields.filter(
        (field) => teacherProfile[field] && teacherProfile[field].toString().trim() !== ""
      );
      const completionPercentage = Math.round((filledFields.length / requiredFields.length) * 100);
      setProfileCompletion(completionPercentage);
    }
  }, [teacherProfile]);

  // Fetch posts data
  const fetchPosts = async () => {
    try {
      const postsRef = collection(db, "courses");
      const q = query(postsRef, where("teacherId", "==", user.uid)); // Filter posts by teacherId
      const postsSnap = await getDocs(q);
      const posts = postsSnap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(post => post.timestamp) // Ensure timestamp exists
        .sort((a, b) => b.timestamp - a.timestamp); // Sort by latest timestamp

      setNumberOfPosts(posts.length);
      setLatestPost(posts.length > 0 ? posts[0] : null);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user?.uid]); // Add user?.uid as a dependency

  return (
    <div className="p-6">
      <div className="mb-6 bg-gradient-to-tr from-sky-400 to-sky-600 text-white p-6 rounded-xl shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Hello, {teacherProfile?.name || 'Trainer'}! 👋</h2>
          <p className="mt-1 text-gray-200">Welcome back! Here's your progress and updates.</p>
        </div>
        <Button size="sm" color="secondary" onClick={fetchPosts} className="flex items-center">
          <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8 justify-center">
        <Card className="shadow-md w-full md:w-1/3">
          <CardHeader className="flex gap-2 px-6 pt-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <UserCheck className="h-5 w-5 text-blue-500" />
            </div>
            <span className="font-bold text-lg">Profile Completion</span>
          </CardHeader>
          <CardBody className="px-6 pb-6">
            <Progress
              value={profileCompletion}
              color="primary"
              size="md"
              radius="sm"
              className="w-full"
              showValueLabel={true}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-default-500 text-sm">{`${profileCompletion}% complete`}</span>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-md w-full md:w-1/3">
          <CardHeader className="flex gap-2 px-6 pt-6">
            <span className="font-bold text-lg">Latest Post</span>
          </CardHeader>
          <CardBody className="flex flex-col justify-center items-center text-lg font-bold text-blue-600 pb-6">
            {latestPost ? latestPost.title : "No posts available"}
          </CardBody>
        </Card>

        <Card className="shadow-md w-full md:w-1/3">
          <CardHeader className="flex gap-2 px-6 pt-6">
            <span className="font-bold text-lg">Number of Posts</span>
          </CardHeader>
          <CardBody className="flex justify-center items-center text-4xl font-bold text-blue-600 pb-6">
            {numberOfPosts}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default TDashboard;
