// import React, { useEffect, useState } from 'react';
// import { collection, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
// import { db } from '../../utils/firebase';
// import { useAuth } from '../../context/AuthContext'; // Import useAuth

// const DisplayPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentPost, setCurrentPost] = useState(null);
//   const { user } = useAuth(); // Get the logged-in user

//   // Fetch posts created by the logged-in teacher
//   useEffect(() => {
//     const fetchPosts = async () => {
//       if (user?.uid) {
//         const postsRef = collection(db, 'courses');
//         const q = query(postsRef, where('teacherId', '==', user.uid)); // Filter posts by teacherId
//         const postsSnap = await getDocs(q);
//         const postsData = postsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setPosts(postsData);
//       }
//     };

//     fetchPosts();
//   }, [user?.uid]); // Add user?.uid as a dependency

//   // Handle opening the edit modal and setting the current post
//   const handleEditPost = (post) => {
//     setCurrentPost(post);
//     setIsEditModalOpen(true);
//   };

//   // Handle updating a post in Firestore
//   const handleUpdatePost = async () => {
//     if (!currentPost.title || !currentPost.description || !currentPost.skills || !currentPost.charge) {
//       alert('Please fill all fields.');
//       return;
//     }

//     try {
//       const postRef = doc(db, 'courses', currentPost.id); // Update the correct collection name
//       await updateDoc(postRef, currentPost);
//       setIsEditModalOpen(false);
//       const updatedPosts = posts.map((post) =>
//         post.id === currentPost.id ? currentPost : post
//       );
//       setPosts(updatedPosts);
//     } catch (error) {
//       console.error('Error updating post: ', error);
//     }
//   };

//   // Handle deleting a post from Firestore
//   const handleDeletePost = async (postId) => {
//     try {
//       const postRef = doc(db, 'courses', postId); // Update the correct collection name
//       await deleteDoc(postRef);
//       setPosts(posts.filter((post) => post.id !== postId));
//     } catch (error) {
//       console.error('Error deleting post: ', error);
//     }
//   };

//   // Handle input changes in the edit modal
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentPost((prevState) => ({ ...prevState, [name]: value }));
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg">
//       <h3 className="text-xl font-semibold mb-4">My Mentorship Programs</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {posts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-gray-100 rounded-lg shadow-md overflow-hidden flex flex-col"
//           >
//             {post.thumbnail && (
//               <div className="w-full h-48">
//                 <img
//                   src={post.thumbnail}
//                   alt="Thumbnail"
//                   className="w-full h-full object-fill"
//                 />
//               </div>
//             )}
//             <div className="p-4 flex-grow">
//               <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
//               <p className="text-gray-700 mb-2">{post.description}</p>
//               <p className="text-gray-700 mb-2">
//                 <span className="font-medium">Skills:</span> {post.skills}
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <span className="font-medium">Charge:</span> {post.charge} INR
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <span className="font-medium">Posted On:</span>{' '}
//                 {new Date(post.timestamp?.toDate()).toLocaleDateString()} {/* Use timestamp field */}
//               </p>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleEditPost(post)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeletePost(post.id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Edit Modal */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-96 relative">
//             <button
//               onClick={() => setIsEditModalOpen(false)}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//             >
//               ✖
//             </button>
//             <h3 className="text-xl font-bold mb-4">Edit Mentorship Program</h3>
//             <input
//               type="text"
//               name="title"
//               value={currentPost.title}
//               onChange={handleChange}
//               placeholder="Title"
//               className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//             />
//             <textarea
//               name="description"
//               value={currentPost.description}
//               onChange={handleChange}
//               placeholder="Description"
//               className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//             />
//             <input
//               type="text"
//               name="skills"
//               value={currentPost.skills}
//               onChange={handleChange}
//               placeholder="Skills"
//               className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//             />
//             <input
//               type="text"
//               name="charge"
//               value={currentPost.charge}
//               onChange={handleChange}
//               placeholder="Charge in Rupees"
//               className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//             />
//             <button
//               onClick={handleUpdatePost}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//             >
//               Update Program
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DisplayPosts;





import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaTrash, FaEye, FaShare } from "react-icons/fa"; // Import React Icons

const DisplayPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const { user } = useAuth();

  // Fetch posts created by the logged-in teacher
  useEffect(() => {
    const fetchPosts = async () => {
      if (user?.uid) {
        const postsRef = collection(db, "courses");
        const q = query(postsRef, where("teacherId", "==", user.uid));
        const postsSnap = await getDocs(q);
        const postsData = postsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      }
    };

    fetchPosts();
  }, [user?.uid]);

  // Open the edit modal
  const handleEditPost = (post) => {
    setCurrentPost(post);
    setIsEditModalOpen(true);
  };

  // Handle updating a post in Firestore
  const handleUpdatePost = async () => {
    if (!currentPost.title || !currentPost.description || !currentPost.skills || !currentPost.charge) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const postRef = doc(db, "courses", currentPost.id);
      await updateDoc(postRef, currentPost);
      setIsEditModalOpen(false);
      setPosts(posts.map((post) => (post.id === currentPost.id ? currentPost : post)));
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  // Handle deleting a post from Firestore
  const handleDeletePost = async (postId) => {
    try {
      const postRef = doc(db, "courses", postId);
      await deleteDoc(postRef);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  // Handle input changes in the edit modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({ ...prevState, [name]: value }));
  };

  // Open the view modal
  const handleViewPost = (post) => {
    setCurrentPost(post);
    setIsViewModalOpen(true);
  };

  // Handle share button click to copy the post link
  const handleSharePost = (postId) => {
    const postLink = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(postLink).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4">My Mentorship Programs</h3>

      {/* Display posts in list format */}
      <div className="divide-y divide-gray-300">
        {posts.map((post) => (
          <div key={post.id} className="py-4 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold">{post.title}</h4>
              <p className="text-gray-600">{post.skills}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditPost(post)}
                className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <FaTrash />
              </button>
              <button
                onClick={() => handleViewPost(post)}
                className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
              >
                <FaEye />
              </button>
              <button
                onClick={() => handleSharePost(post.id)}
                className="bg-purple-500 text-white px-3 py-2 rounded-lg hover:bg-purple-600 transition"
              >
                <FaShare />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {isViewModalOpen && currentPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-96 relative">
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4">{currentPost.title}</h3>

            {currentPost.thumbnail && (
              <img
                src={currentPost.thumbnail}
                alt="Thumbnail"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <p className="text-gray-800 mb-2">
              <strong>Description:</strong> {currentPost.description}
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Skills:</strong> {currentPost.skills}
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Charge:</strong> ₹{currentPost.price}
            </p>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && currentPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-96 relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4">Edit Mentorship Program</h3>
            <input
              type="text"
              name="title"
              value={currentPost.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <textarea
              name="description"
              value={currentPost.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <input
              type="text"
              name="skills"
              value={currentPost.skills}
              onChange={handleChange}
              placeholder="Skills"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <input
              type="text"
              name="charge"
              value={currentPost.charge}
              onChange={handleChange}
              placeholder="Charge in Rupees"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <button
              onClick={handleUpdatePost}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Update Program
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPosts;

