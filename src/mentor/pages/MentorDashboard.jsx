import React, { useEffect, useState } from "react";
import { auth, db } from "../../utils/firebase";
import { doc, getDoc, updateDoc, addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import PostMentorship from "../pages/PostMentorship";
import DisplayPosts from "../pages/DisplayPosts"; // Corrected import
import { getTeacherCourses } from "../../services/teacherService";
import { useAuth } from "../../context/AuthContext";

const MentorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentComponent, setCurrentComponent] = useState("dashboard");
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [mentorshipProgram, setMentorshipProgram] = useState({
    title: "",
    description: "",
    skills: "",
    charge: ""
  });
  const [posts, setPosts] = useState([]);
  // const [courses, setCourses] = useState([]);
  // const { user } = useAuth();
  // console.log("User:", user);

  useEffect(() => {
    // const fetchData = async () => { 
    //   try {
    //     const courses = await getTeacherCourses(user.uid);
    //     console.log("Courses:", courses);
    //     if (courses && courses.length > 0 && trainer) {
    //       setCourses(courses);
          
    //     }


    //   } catch (error) {
    //     console.error("Error fetching courses:", error);
        
    //   }
      
    // };

    // fetchData();

    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const trainerRef = doc(db, "trainers", user.uid);
        const trainerSnap = await getDoc(trainerRef);
        if (trainerSnap.exists()) {
          const data = trainerSnap.data();
          setTrainer(data);
          if (data.profileImage) setProfileImage(data.profileImage);
        }

        const postsRef = collection(db, "mentorshipPrograms");
        const postsSnap = await getDocs(postsRef);
        const postsData = postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync currentComponent with activeTab
  useEffect(() => {
    setCurrentComponent(activeTab);
  }, [activeTab]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const user = auth.currentUser;
      if (!user) return;

      const trainerRef = doc(db, "trainers", user.uid);
      await updateDoc(trainerRef, { profileImage: base64Image });

      setProfileImage(base64Image);
    };
  };

  const handlePostMentorshipProgram = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const mentorshipRef = collection(db, "mentorshipPrograms");
    await addDoc(mentorshipRef, {
      ...mentorshipProgram,
      trainerId: user.uid,
      enrolledStudents: 0
    });

    setMentorshipProgram({
      title: "",
      description: "",
      skills: "",
      charge: ""
    });
  };

  const handleEditPost = async (postId) => {
    const postRef = doc(db, "mentorshipPrograms", postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const postData = postSnap.data();
      setMentorshipProgram(postData);
      setCurrentComponent("post-mentorship"); // Switch to the edit form
    }
  };

  const handleDeletePost = async (postId) => {
    const postRef = doc(db, "mentorshipPrograms", postId);
    await deleteDoc(postRef);
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "dashboard":
        return <Dashboard trainer={trainer} />;
      case "profile":
        return (
          <Profile
            trainer={trainer}
            profileImage={profileImage}
            onFileChange={handleFileChange}
            onClose={() => setCurrentComponent("dashboard")}
          />
        );
      case "post-mentorship":
        return (
          <PostMentorship
            mentorshipProgram={mentorshipProgram}
            setMentorshipProgram={setMentorshipProgram}
            onPost={handlePostMentorshipProgram}
          />
        );
      case "posts":
        return (
          <DisplayPosts
            posts={posts}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
          />
        );
      default:
        return <Dashboard trainer={trainer} />;
    }
  };

  return (
    <div className="flex">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setCurrentComponent={setCurrentComponent}
        onLogout={handleLogout}
      />
      <div className="flex-1">
        <Header profileImage={profileImage} onLogout={handleLogout} />
        <div className="p-6">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;