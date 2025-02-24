import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../utils/firebase';

const DisplayPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  // Fetch all posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      const postsRef = collection(db, 'mentorshipPrograms');
      const postsSnap = await getDocs(postsRef);
      const postsData = postsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  // Handle opening the edit modal and setting the current post
  const handleEditPost = (post) => {
    setCurrentPost(post);
    setIsEditModalOpen(true);
  };

  // Handle updating a post in Firestore
  const handleUpdatePost = async () => {
    if (!currentPost.title || !currentPost.description || !currentPost.skills || !currentPost.charge) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const postRef = doc(db, 'mentorshipPrograms', currentPost.id);
      await updateDoc(postRef, currentPost);
      setIsEditModalOpen(false);
      const updatedPosts = posts.map((post) =>
        post.id === currentPost.id ? currentPost : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error updating post: ', error);
    }
  };

  // Handle deleting a post from Firestore
  const handleDeletePost = async (postId) => {
    try {
      const postRef = doc(db, 'mentorshipPrograms', postId);
      await deleteDoc(postRef);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post: ', error);
    }
  };

  // Handle input changes in the edit modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4">My Mentorship Programs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            {post.thumbnail && (
              <div className="w-full h-48">
                <img
                  src={post.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-full object-fill"
                />
              </div>
            )}
            <div className="p-4 flex-grow">
              <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
              <p className="text-gray-700 mb-2">{post.description}</p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Skills:</span> {post.skills}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Charge:</span> {post.charge} INR
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Posted On:</span>{' '}
                {new Date(post.postDate).toLocaleDateString()}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditPost(post)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
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