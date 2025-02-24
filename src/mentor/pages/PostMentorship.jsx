// import React, { useState } from 'react';
// import { db } from '../../utils/firebase';
// import { collection, addDoc } from 'firebase/firestore';

// const PostMentorship = ({ mentorshipProgram, setMentorshipProgram }) => {
//   const [error, setError] = useState(null);

//   const onPost = async () => {
//     try {
//       await addDoc(collection(db, 'mentorshipPrograms'), mentorshipProgram);
//       alert('Mentorship program posted successfully!');
//       // Clear the fields after successful submission
//       setMentorshipProgram({
//         title: '',
//         description: '',
//         skills: '',
//         charge: '',
//         thumbnail: ''
//       });
//       setError(null); // Clear any previous errors
//     } catch (err) {
//       console.error('Error adding document: ', err);
//       setError('Failed to post mentorship program. Please try again.');
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMentorshipProgram({ ...mentorshipProgram, thumbnail: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <form className="bg-white w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md">
//       <h3 className="text-xl font-bold mb-6 text-gray-700">Post Mentorship Program</h3>
//       <div className="mb-4">
//         <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
//           Title
//         </label>
//         <input
//           type="text"
//           placeholder="Enter title"
//           value={mentorshipProgram.title}
//           onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, title: e.target.value })}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
//           Description
//         </label>
//         <textarea
//           rows="5"
//           placeholder="Enter your description"
//           value={mentorshipProgram.description}
//           onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, description: e.target.value })}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="skills" className="block text-gray-700 text-sm font-bold mb-2">
//           Skills
//         </label>
//         <input
//           type="text"
//           placeholder="Enter skills"
//           value={mentorshipProgram.skills}
//           onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, skills: e.target.value })}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="charge" className="block text-gray-700 text-sm font-bold mb-2">
//           Charge (in Rupees)
//         </label>
//         <input
//           type="text"
//           placeholder="Enter charge"
//           value={mentorshipProgram.charge}
//           onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, charge: e.target.value })}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">
//           Thumbnail
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//         />
//         {mentorshipProgram.thumbnail && (
//           <img
//             src={mentorshipProgram.thumbnail}
//             alt="Thumbnail Preview"
//             className="mt-4 w-full h-auto rounded-lg"
//           />
//         )}
//       </div>
//       {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//       <div className="flex items-center justify-between">
//         <button
//           type="button"
//           onClick={onPost}
//           className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         >
//           Post Program
//         </button>
//         <div className="flex items-center">
//           <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-gray-700 mr-2">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
//               <g
//                 stroke-linejoin="round"
//                 stroke-linecap="round"
//                 id="SVGRepo_tracerCarrier"
//               ></g>
//               <g id="SVGRepo_iconCarrier">
//                 <path
//                   fill="#0F0F0F"
//                   d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
//                   clip-rule="evenodd"
//                   fill-rule="evenodd"
//                 ></path>
//                 <path
//                   fill="#0F0F0F"
//                   d="M4.80665 17.5211L9.1221 9.60947C9.50112 8.91461 10.4989 8.91461 10.8779 9.60947L14.0465 15.4186L15.1318 13.5194C15.5157 12.8476 16.4843 12.8476 16.8682 13.5194L19.1451 17.5039C19.526 18.1705 19.0446 19 18.2768 19H5.68454C4.92548 19 4.44317 18.1875 4.80665 17.5211Z"
//                 ></path>
//                 <path
//                   fill="#0F0F0F"
//                   d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z"
//                 ></path>
//               </g>
//             </svg>
//           </svg>
//           <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-gray-700 mr-2">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
//               <g
//                 stroke-linejoin="round"
//                 stroke-linecap="round"
//                 id="SVGRepo_tracerCarrier"
//               ></g>
//               <g id="SVGRepo_iconCarrier">
//                 <path
//                   stroke-linejoin="round"
//                   stroke-linecap="round"
//                   stroke-width="2"
//                   stroke="#000000"
//                   d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
//                 ></path>
//               </g>
//             </svg>
//           </svg>
//           <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-gray-700">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
//               <g
//                 stroke-linejoin="round"
//                 stroke-linecap="round"
//                 id="SVGRepo_tracerCarrier"
//               ></g>
//               <g id="SVGRepo_iconCarrier">
//                 <path
//                   stroke-width="1.5"
//                   stroke="#1C274C"
//                   d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
//                 ></path>
//                 <path
//                   stroke-linecap="round"
//                   stroke-width="1.5"
//                   stroke="#1C274C"
//                   d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
//                 ></path>
//               </g>
//             </svg>
//           </svg>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PostMentorship;


import React, { useState, useRef } from 'react';
import { db } from '../../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

const PostMentorship = ({ mentorshipProgram, setMentorshipProgram }) => {
  const [error, setError] = useState(null);
  const [postDate, setPostDate] = useState('');
  const [thumbnailStatus, setThumbnailStatus] = useState('default'); // 'default', 'success', or 'error'
  const [dateStatus, setDateStatus] = useState('default'); // 'default', 'success', or 'error'
  const dateInputRef = useRef(null); // Ref for the date input

  const onPost = async () => {
    if (!mentorshipProgram.title || !mentorshipProgram.description || !mentorshipProgram.skills || !mentorshipProgram.charge) {
      setError('Please fill all fields.');
      return;
    }

    try {
      const programData = {
        ...mentorshipProgram,
        postDate: postDate || new Date().toISOString(), // Use selected date or current date
      };
      await addDoc(collection(db, 'mentorshipPrograms'), programData);
      alert('Mentorship program posted successfully!');
      // Clear the fields after successful submission
      setMentorshipProgram({
        title: '',
        description: '',
        skills: '',
        charge: '',
        thumbnail: '',
      });
      setPostDate(''); // Reset post date
      setError(null); // Clear any previous errors
      setThumbnailStatus('default'); // Reset thumbnail status
      setDateStatus('default'); // Reset date status
    } catch (err) {
      console.error('Error adding document: ', err);
      setError('Failed to post mentorship program. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMentorshipProgram({ ...mentorshipProgram, thumbnail: reader.result });
        setThumbnailStatus('success'); // Set thumbnail status to success
      };
      reader.onerror = () => {
        setThumbnailStatus('error'); // Set thumbnail status to error if there's an issue
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailStatus('error'); // Set thumbnail status to error if no file is selected
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      setPostDate(selectedDate);
      setDateStatus('success'); // Set date status to success
    } else {
      setDateStatus('error'); // Set date status to error if no date is selected
    }
  };

  // Function to trigger the date input when the calendar icon is clicked
  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Open the date picker
    }
  };

  // Determine icon color based on status
  const getIconColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-green-500'; // Green for success
      case 'error':
        return 'text-red-500'; // Red for error
      default:
        return 'text-gray-700'; // Default gray
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form className="bg-gray-50 w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md mt-[-300px]">
        <h3 className="text-xl font-bold mb-6 text-gray-700">Post Mentorship Program</h3>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter title"
            value={mentorshipProgram.title}
            onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, title: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            rows="5"
            placeholder="Enter your description"
            value={mentorshipProgram.description}
            onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, description: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700 text-sm font-bold mb-2">
            Skills
          </label>
          <input
            type="text"
            placeholder="Enter skills"
            value={mentorshipProgram.skills}
            onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, skills: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="charge" className="block text-gray-700 text-sm font-bold mb-2">
            Charge (in Rupees)
          </label>
          <input
            type="text"
            placeholder="Enter charge"
            value={mentorshipProgram.charge}
            onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, charge: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onPost}
            className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Post Program
          </button>
          <div className="flex items-center relative">
            {/* Image Icon for Thumbnail Upload */}
            <label htmlFor="thumbnail-upload" className="cursor-pointer">
              <svg
                viewBox="0 0 24 24"
                className={`h-6 w-6 ${getIconColor(thumbnailStatus)}`}
                fill="currentColor" // Use currentColor to inherit the parent's color
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
                />
                <path d="M4.80665 17.5211L9.1221 9.60947C9.50112 8.91461 10.4989 8.91461 10.8779 9.60947L14.0465 15.4186L15.1318 13.5194C15.5157 12.8476 16.4843 12.8476 16.8682 13.5194L19.1451 17.5039C19.526 18.1705 19.0446 19 18.2768 19H5.68454C4.92548 19 4.44317 18.1875 4.80665 17.5211Z" />
                <path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z" />
              </svg>
            </label>
            <input
              type="file"
              id="thumbnail-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {/* Calendar Icon for Date Selection */}
            <div
              className="cursor-pointer relative"
              onClick={handleCalendarClick} // Trigger date picker on icon click
            >
              {/* Corrected Calendar SVG Icon */}
              <svg
                viewBox="0 0 24 24"
                className={`h-6 w-6 ${getIconColor(dateStatus)}`}
                fill="none" // Ensure no fill
                stroke="currentColor" // Use stroke for the outline
                strokeWidth="2" // Adjust stroke width as needed
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" />
              </svg>
              {/* Position the date input absolutely above the calendar icon */}
              <input
                type="date"
                id="post-date"
                value={postDate}
                onChange={handleDateChange}
                ref={dateInputRef}
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostMentorship;