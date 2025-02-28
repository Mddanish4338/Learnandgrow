<<<<<<< Updated upstream
// // import React, { useState, useRef } from 'react';
// // import { createCourse } from '../../services/teacherService';
// // import {
// //   Card,
// //   CardBody,
// //   CardHeader,
// //   Input,
// //   Button,
// //   Textarea,
// //   Divider,
// // } from "@nextui-org/react";
// // import {
// //   Briefcase,
// //   MapPin,
// //   Clock,
// //   DollarSign,
// //   FileText,
// //   Code,
// //   User,
// //   Link,
// // } from "lucide-react";

// // const PostMentorship = ({ mentorshipProgram, setMentorshipProgram }) => {
// //   const [error, setError] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [thumbnailStatus, setThumbnailStatus] = useState('default');
// //   const dateInputRef = useRef(null);

// //   const onPost = async () => {
// //     const requiredFields = ['title', 'description', 'skills', 'instructor', 'thumbnail', 'duration', 'price', 'status', 'chatLink'];
// //     for (const field of requiredFields) {
// //       if (!mentorshipProgram[field]) {
// //         setError(`Please fill all fields. Missing: ${field}`);
// //         return;
// //       }
// //     }

// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const postcourse = {
// //         title: mentorshipProgram.title,
// //         description: mentorshipProgram.description,
// //         instructor: mentorshipProgram.instructor,
// //         skills: mentorshipProgram.skills,
// //         duration: mentorshipProgram.duration,
// //         price: mentorshipProgram.price,
// //         status: mentorshipProgram.status,
// //         chatLink: mentorshipProgram.chatLink,
// //         thumbnail: mentorshipProgram.thumbnail,
// //       };
// //       await createCourse(postcourse);

// //       setMentorshipProgram({
// //         title: '',
// //         description: '',
// //         instructor: '',
// //         skills: '',
// //         duration: '',
// //         price: '',
// //         status: '',
// //         chatLink: '',
// //         thumbnail: '',
// //       });
// //       setThumbnailStatus('default');
// //     } catch (err) {
// //       console.error('Error adding document: ', err);
// //       setError('Failed to post mentorship program. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setMentorshipProgram({ ...mentorshipProgram, thumbnail: reader.result });
// //         setThumbnailStatus('success');
// //       };
// //       reader.onerror = () => {
// //         setThumbnailStatus('error');
// //       };
// //       reader.readAsDataURL(file);
// //     } else {
// //       setThumbnailStatus('error');
// //     }
// //   };

// //   return (
// //     <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen p-3 md:p-8 pb-20"> {/* Added pb-20 for bottom padding */}
// //       <div className="max-w-4xl mx-auto">
// //         <div className=" flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 -z-10">

// //           <div>
// //             <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-800 bg-clip-text text-transparent">
// //               Post a New Mentorship Program
// //             </h1>
// //             <p className="text-default-500 mt-1">
// //               Fill in the details to create an attractive mentorship program
// //             </p>
// //           </div>
// //         </div>

// //         <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-white to-gray-50">
// //           <CardHeader className="flex flex-col gap-2 items-center px-6 pt-6 pb-2">
// //             <div className="bg-primary-100 p-3 rounded-full">
// //               <Briefcase className="w-6 h-6 text-primary-500" />
// //             </div>
// //             <h2 className="text-xl font-bold">Mentorship Program Details</h2>
// //             <p className="text-default-500 text-sm text-center">
// //               Create a compelling mentorship program to attract the best mentees
// //             </p>
// //           </CardHeader>
// //           <Divider className="my-2" />
// //           <CardBody className="p-6">
// //             <form className="  space-y-6">
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 {/* Title */}
// //                 <Input
// //                   label="Title"
// //                   placeholder="Enter title"
// //                   value={mentorshipProgram.title || ''}
// //                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, title: e.target.value })}
// //                   startContent={
// //                     <Briefcase className="w-4 h-4 text-default-400" />
// //                   }
// //                   variant="bordered"
// //                   classNames={{
// //                     label: "text-default-600 font-medium",
// //                   }}
// //                   isRequired
// //                 />

// //                 {/* Description */}
// //                 <Textarea
// //                   label="Description"
// //                   placeholder="Enter your description"
// //                   value={mentorshipProgram.description || ''}
// //                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, description: e.target.value })}
// //                   variant="bordered"
// //                   minRows={4}
// //                   startContent={
// //                     <div className="flex items-center">
// //                       <FileText className="w-4 h-4 text-default-400" />
// //                     </div>
// //                   }
// //                   classNames={{
// //                     label: "text-default-600 font-medium",
// //                     input: "pl-8",
// //                     innerWrapper: "items-start",
// //                   }}
// //                   isRequired
// //                 />

// //                 {/* Instructor */}
// //                 <Input
// //                   label="Instructor"
// //                   placeholder="Enter instructor name"
// //                   value={mentorshipProgram.instructor || ''}
// //                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, instructor: e.target.value })}
// //                   startContent={
// //                     <User className="w-4 h-4 text-default-400" />
// //                   }
// //                   variant="bordered"
// //                   classNames={{
// //                     label: "text-default-600 font-medium",
// //                   }}
// //                   isRequired
// //                 />

// //                 {/* Thumbnail Upload */}
// //                 <div className="flex flex-col gap-2">
// //                   <label className="text-default-600 font-medium">Thumbnail</label>
// //                   <input
// //                     type="file"
// //                     accept="image/*"
// //                     onChange={handleFileChange}
// //                     className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
// //                   />
// //                   {thumbnailStatus === 'success' && (
// //                     <p className="text-green-500 text-sm">Thumbnail uploaded successfully!</p>
// //                   )}
// //                   {thumbnailStatus === 'error' && (
// //                     <p className="text-red-500 text-sm">Please upload a valid image.</p>
// //                   )}
// //                 </div>

// //                 {/* Skills */}
// //                 <Input
// //                   label="Skills"
// //                   placeholder="Enter skills"
// //                   value={mentorshipProgram.skills || ''}
// //                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, skills: e.target.value })}
// //                   startContent={
// //                     <Code className="w-4 h-4 text-default-400" />
// //                   }
// //                   variant="bordered"
// //                   classNames={{
// //                     label: "text-default-600 font-medium",
// //                   }}
// //                   isRequired
// //                 />

// //                 {/* Duration */}
// //                 <Input
// //                   label="Duration"
// //                   placeholder="Enter duration"
// //                   value={mentorshipProgram.duration || ''}
// //                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, duration: e.target.value })}
// //                   startContent={
// //                     <Clock className="w-4 h-4 text-default-400" />
// //                   }
// //                   variant="bordered"
// //                   classNames={{
// //                     label: "text-default-600 font-medium",
// //                   }}
// //                   isRequired
// //                 />

// //                 {/* Price */}
// //                 <Input
// //                   label="Price"
// //                   placeholder="Enter price"
// //                   value={mentorshipProgram.price || ''}
// //                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, price: e.target.value })}
// //                   startContent={
// //                     <DollarSign className="w-4 h-4 text-default-400" />
// //                   }
// //                   variant="bordered"
// //                   classNames={{
// //                     label: "text-default-600 font-medium",
// //                   }}
// //                   isRequired
// //                 />

// //                 {/* Status */}
// //                 <Input
// //                   label="Status"
// //                   placeholder="Enter status"
// //                   value={mentorshipProgram.status || ''}
// //                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, status: e.target.value })}
// //                   startContent={
// //                     <MapPin className="w-4 h-4 text-default-400" />
// //                   }
// //                   variant="bordered"
// //                   classNames={{
// //                     label: "text-default-600 font-medium",
// //                   }}
// //                   isRequired
// //                 />

// //                 {/* Chat Link */}
// //                 <Input
// //                   label="Chat Link"
// //                   placeholder="Enter chat link"
// //                   value={mentorshipProgram.chatLink || ''}
// //                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, chatLink: e.target.value })}
// //                   startContent={
// //                     <Link className="w-4 h-4 text-default-400" />
// //                   }
// //                   variant="bordered"
// //                   classNames={{
// //                     label: "text-default-600 font-medium",
// //                   }}
// //                   isRequired
// //                 />
// //               </div>

// //               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

// //               <div className="flex justify-center md:justify-end gap-3 pb-6 md:pb-0">
// //                 <Button
// //                   type="button"
// //                   onClick={onPost}
// //                   color="primary"
// //                   size="lg"
// //                   className="font-semibold bg-gradient-to-r from-primary-600 to-primary-700 shadow-md"
// //                   disabled={loading}
// //                 >
// //                   {loading ? 'Posting...' : 'Post Program'}
// //                 </Button>
// //               </div>
// //             </form>
// //           </CardBody>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PostMentorship;



// import React, { useState, useRef } from 'react';
// import { createCourse } from '../../services/teacherService';
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Input,
//   Button,
//   Textarea,
//   Divider,
// } from "@nextui-org/react";
// import {
//   Briefcase,
//   MapPin,
//   Clock,
//   DollarSign,
//   FileText,
//   Code,
//   User,
//   Link,
// } from "lucide-react";
// import { serverTimestamp } from "firebase/firestore";

// const PostMentorship = ({ mentorshipProgram, setMentorshipProgram }) => {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [thumbnailStatus, setThumbnailStatus] = useState('default');
//   const dateInputRef = useRef(null);

//   const onPost = async () => {
//     const requiredFields = ['title', 'description', 'skills', 'instructor', 'thumbnail', 'duration', 'price', 'status', 'chatLink'];
//     for (const field of requiredFields) {
//       if (!mentorshipProgram[field]) {
//         setError(`Please fill all fields. Missing: ${field}`);
//         return;
//       }
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const postcourse = {
//         ...mentorshipProgram,
//         timestamp: serverTimestamp(), // Add timestamp for ordering
//       };
//       await createCourse(postcourse);

//       setMentorshipProgram({
//         title: '',
//         description: '',
//         instructor: '',
//         skills: '',
//         duration: '',
//         price: '',
//         status: '',
//         chatLink: '',
//         thumbnail: '',
//       });
//       setThumbnailStatus('default');
=======
// import React, { useState, useRef } from 'react';
// import { db } from '../../utils/firebase';
// import { collection, addDoc } from 'firebase/firestore';
// import { createCourse } from '../../services/teacherService';
// import { Timestamp } from "firebase/firestore";

// const PostMentorship = ({ mentorshipProgram, setMentorshipProgram }) => {
//   const [error, setError] = useState(null);
//   const [postDate, setPostDate] = useState('');
//   const [thumbnailStatus, setThumbnailStatus] = useState('default'); // 'default', 'success', or 'error'
//   const [dateStatus, setDateStatus] = useState('default'); // 'default', 'success', or 'error'
//   const dateInputRef = useRef(null); // Ref for the date input

//   const onPost = async () => {
//     if (!mentorshipProgram.title || !mentorshipProgram.description || !mentorshipProgram.skills || !mentorshipProgram.charge) {
//       setError('Please fill all fields.');
//       return;
//     }

//     try {

//       const postcourse = {
//         title: mentorshipProgram.title,
//         description: mentorshipProgram.description,
//         skills: mentorshipProgram.skills,
//         charge: mentorshipProgram.charge,
//         thumbnail: mentorshipProgram.thumbnail,
        
//       };
//       await createCourse(postcourse);
>>>>>>> Stashed changes
//     } catch (err) {
//       console.error('Error adding document: ', err);
//       setError('Failed to post mentorship program. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMentorshipProgram({ ...mentorshipProgram, thumbnail: reader.result });
<<<<<<< Updated upstream
//         setThumbnailStatus('success');
//       };
//       reader.onerror = () => {
//         setThumbnailStatus('error');
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setThumbnailStatus('error');
=======
//         setThumbnailStatus('success'); // Set thumbnail status to success
//       };
//       reader.onerror = () => {
//         setThumbnailStatus('error'); // Set thumbnail status to error if there's an issue
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setThumbnailStatus('error'); // Set thumbnail status to error if no file is selected
//     }
//   };

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     if (selectedDate) {
//       setPostDate(selectedDate);
//       setDateStatus('success'); // Set date status to success
//     } else {
//       setDateStatus('error'); // Set date status to error if no date is selected
//     }
//   };

//   // Function to trigger the date input when the calendar icon is clicked
//   const handleCalendarClick = () => {
//     if (dateInputRef.current) {
//       dateInputRef.current.showPicker(); // Open the date picker
//     }
//   };

//   // Determine icon color based on status
//   const getIconColor = (status) => {
//     switch (status) {
//       case 'success':
//         return 'text-green-500'; // Green for success
//       case 'error':
//         return 'text-red-500'; // Red for error
//       default:
//         return 'text-gray-700'; // Default gray
>>>>>>> Stashed changes
//     }
//   };

//   return (
<<<<<<< Updated upstream
//     <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen p-3 md:p-8 pb-20">
//       <div className="max-w-4xl mx-auto">
//         <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-white to-gray-50">
//           <CardHeader className="flex flex-col gap-2 items-center px-6 pt-6 pb-2">
//             <div className="bg-primary-100 p-3 rounded-full">
//               <Briefcase className="w-6 h-6 text-primary-500" />
//             </div>
//             <h2 className="text-xl font-bold">Mentorship Program Details</h2>
//           </CardHeader>
//           <Divider className="my-2" />
//           <CardBody className="p-6">
//             <form className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Input label="Title" placeholder="Enter title" value={mentorshipProgram.title || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, title: e.target.value })} variant="bordered" isRequired />
//                 <Textarea label="Description" placeholder="Enter description" value={mentorshipProgram.description || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, description: e.target.value })} variant="bordered" minRows={4} isRequired />
//                 <Input label="Instructor" placeholder="Enter instructor name" value={mentorshipProgram.instructor || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, instructor: e.target.value })} variant="bordered" isRequired />
//                 {/* <div className="flex flex-col gap-2">
//                   <label className="text-default-600 font-medium">Thumbnail</label>
//                   <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
//                 </div> */}
//                                 {/* Thumbnail Upload */}
//                  <div className="flex flex-col gap-2">
//                    <label className="text-default-600 font-medium">Thumbnail</label>
//                    <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//                   />
//                   {thumbnailStatus === 'success' && (
//                     <p className="text-green-500 text-sm">Thumbnail uploaded successfully!</p>
//                   )}
//                   {thumbnailStatus === 'error' && (
//                     <p className="text-red-500 text-sm">Please upload a valid image.</p>
//                   )}
//                 </div>
//                 <Input label="Skills" placeholder="Enter skills" value={mentorshipProgram.skills || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, skills: e.target.value })} variant="bordered" isRequired />
//                 <Input label="Duration" placeholder="Enter duration" value={mentorshipProgram.duration || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, duration: e.target.value })} variant="bordered" isRequired />
//                 <Input label="Price" placeholder="Enter price" value={mentorshipProgram.price || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, price: e.target.value })} variant="bordered" isRequired />
//                 <Input label="Status" placeholder="Enter status" value={mentorshipProgram.status || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, status: e.target.value })} variant="bordered" isRequired />
//                 <Input label="Chat Link" placeholder="Enter chat link" value={mentorshipProgram.chatLink || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, chatLink: e.target.value })} variant="bordered" isRequired />
//               </div>
//               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//               <div className="flex justify-center md:justify-end gap-3 pb-6 md:pb-0">
//                 <Button type="button" onClick={onPost} color="primary" size="lg" className="font-semibold bg-gradient-to-r from-primary-600 to-primary-700 shadow-md" disabled={loading}>
//                   {loading ? 'Posting...' : 'Post Program'}
//                 </Button>
//               </div>
//             </form>
//           </CardBody>
//         </Card>
//       </div>
=======
//     <div className="flex items-center justify-center min-h-screen bg-white">
//       <form className="bg-gray-50 w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md mt-[-300px]">
//         <h3 className="text-xl font-bold mb-6 text-gray-700">Post Mentorship Program</h3>
//         <div className="mb-4">
//           <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
//             Title
//           </label>
//           <input
//             type="text"
//             placeholder="Enter title"
//             value={mentorshipProgram.title}
//             onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, title: e.target.value })}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
//             Description
//           </label>
//           <textarea
//             rows="5"
//             placeholder="Enter your description"
//             value={mentorshipProgram.description}
//             onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, description: e.target.value })}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="skills" className="block text-gray-700 text-sm font-bold mb-2">
//             Skills
//           </label>
//           <input
//             type="text"
//             placeholder="Enter skills"
//             value={mentorshipProgram.skills}
//             onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, skills: e.target.value })}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="charge" className="block text-gray-700 text-sm font-bold mb-2">
//             Charge (in Rupees)
//           </label>
//           <input
//             type="text"
//             placeholder="Enter charge"
//             value={mentorshipProgram.charge}
//             onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, charge: e.target.value })}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           />
//         </div>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <div className="flex items-center justify-between">
//           <button
//             type="button"
//             onClick={onPost}
//             className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Post Program
//           </button>
//           <div className="flex items-center relative">
//             {/* Image Icon for Thumbnail Upload */}
//             <label htmlFor="thumbnail-upload" className="cursor-pointer">
//               <svg
//                 viewBox="0 0 24 24"
//                 className={`h-6 w-6 ${getIconColor(thumbnailStatus)}`}
//                 fill="currentColor" // Use currentColor to inherit the parent's color
//               >
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
//                 />
//                 <path d="M4.80665 17.5211L9.1221 9.60947C9.50112 8.91461 10.4989 8.91461 10.8779 9.60947L14.0465 15.4186L15.1318 13.5194C15.5157 12.8476 16.4843 12.8476 16.8682 13.5194L19.1451 17.5039C19.526 18.1705 19.0446 19 18.2768 19H5.68454C4.92548 19 4.44317 18.1875 4.80665 17.5211Z" />
//                 <path d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z" />
//               </svg>
//             </label>
//             <input
//               type="file"
//               id="thumbnail-upload"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="hidden"
//             />
//             {/* Calendar Icon for Date Selection */}
//             <div
//               className="cursor-pointer relative"
//               onClick={handleCalendarClick} // Trigger date picker on icon click
//             >
//               {/* Corrected Calendar SVG Icon */}
//               <svg
//                 viewBox="0 0 24 24"
//                 className={`h-6 w-6 ${getIconColor(dateStatus)}`}
//                 fill="none" // Ensure no fill
//                 stroke="currentColor" // Use stroke for the outline
//                 strokeWidth="2" // Adjust stroke width as needed
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" />
//               </svg>
//               {/* Position the date input absolutely above the calendar icon */}
//               <input
//                 type="date"
//                 id="post-date"
//                 value={postDate}
//                 onChange={handleDateChange}
//                 ref={dateInputRef}
//                 className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
//               />
//             </div>
//           </div>
//         </div>
//       </form>
>>>>>>> Stashed changes
//     </div>
//   );
// };

// export default PostMentorship;



import React, { useState, useRef } from 'react';
import { createCourse } from '../../services/teacherService';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Textarea,
<<<<<<< Updated upstream
=======
  Chip,
>>>>>>> Stashed changes
  Divider,
} from "@nextui-org/react";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  Code,
<<<<<<< Updated upstream
  User,
  Link,
} from "lucide-react";
import { serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
=======
  Calendar,
  Image,
  User,
  Link,
} from "lucide-react";
>>>>>>> Stashed changes

const PostMentorship = ({ mentorshipProgram, setMentorshipProgram }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [thumbnailStatus, setThumbnailStatus] = useState('default');
  const dateInputRef = useRef(null);
  const { user } = useAuth(); // Get the logged-in user

  const onPost = async () => {
<<<<<<< Updated upstream
    const requiredFields = ['title', 'description', 'skills', 'instructor', 'thumbnail', 'duration', 'price', 'status', 'chatLink'];
=======
    const requiredFields = ['title', 'description', 'skills', 'instructor', 'duration', 'price', 'status', 'chatLink'];
>>>>>>> Stashed changes
    for (const field of requiredFields) {
      if (!mentorshipProgram[field]) {
        setError(`Please fill all fields. Missing: ${field}`);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const postcourse = {
<<<<<<< Updated upstream
        ...mentorshipProgram,
        timestamp: serverTimestamp(), // Add timestamp for ordering
        teacherId: user.uid, // Add the logged-in teacher's UID
      };
      await createCourse(postcourse);

      setMentorshipProgram({
        title: '',
        description: '',
        instructor: '',
        skills: '',
        duration: '',
        price: '',
        status: '',
        chatLink: '',
        thumbnail: '',
      });
      setThumbnailStatus('default');
=======
        title: mentorshipProgram.title,
        description: mentorshipProgram.description,
        instructor: mentorshipProgram.instructor,
        // instructorImg: mentorshipProgram.instructorImg,
        skills: mentorshipProgram.skills,
        duration: mentorshipProgram.duration,
        price: mentorshipProgram.price,
        status: mentorshipProgram.status,
        chatLink: mentorshipProgram.chatLink,
        thumbnail: mentorshipProgram.thumbnail,
      };
      await createCourse(postcourse);
>>>>>>> Stashed changes
    } catch (err) {
      console.error('Error adding document: ', err);
      setError('Failed to post mentorship program. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMentorshipProgram({ ...mentorshipProgram, thumbnail: reader.result });
        setThumbnailStatus('success');
      };
      reader.onerror = () => {
        setThumbnailStatus('error');
      };
      reader.readAsDataURL(file);
    } else {
<<<<<<< Updated upstream
      setThumbnailStatus('error');
=======
      setThumbnailStatus('error'); // Set thumbnail status to error if no file is selected
>>>>>>> Stashed changes
    }
  };

  return (
<<<<<<< Updated upstream
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen p-3 md:p-8 pb-20">
      <div className="max-w-4xl mx-auto">
=======
    <div className="absolute top-16 inset-x-0 -z-10 flex flex-col bg-gradient-to-b from-gray-50 to-white min-h-screen p-3 md:p-8 overflow-y-auto">

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-800 bg-clip-text text-transparent">
              Post a New Mentorship Program
            </h1>
            <p className="text-default-500 mt-1">
              Fill in the details to create an attractive mentorship program
            </p>
          </div>
        </div>

>>>>>>> Stashed changes
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-white to-gray-50">
          <CardHeader className="flex flex-col gap-2 items-center px-6 pt-6 pb-2">
            <div className="bg-primary-100 p-3 rounded-full">
              <Briefcase className="w-6 h-6 text-primary-500" />
            </div>
            <h2 className="text-xl font-bold">Mentorship Program Details</h2>
<<<<<<< Updated upstream
=======
            <p className="text-default-500 text-sm text-center">
              Create a compelling mentorship program to attract the best mentees
            </p>
>>>>>>> Stashed changes
          </CardHeader>
          <Divider className="my-2" />
          <CardBody className="p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<<<<<<< Updated upstream
                <Input label="Title" placeholder="Enter title" value={mentorshipProgram.title || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, title: e.target.value })} variant="bordered" isRequired />
                <Textarea label="Description" placeholder="Enter description" value={mentorshipProgram.description || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, description: e.target.value })} variant="bordered" minRows={4} isRequired />
                <Input label="Instructor" placeholder="Enter instructor name" value={mentorshipProgram.instructor || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, instructor: e.target.value })} variant="bordered" isRequired />
                <div className="flex flex-col gap-2">
                  <label className="text-default-600 font-medium">Thumbnail</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  />
                  {thumbnailStatus === 'success' && (
                    <p className="text-green-500 text-sm">Thumbnail uploaded successfully!</p>
                  )}
                  {thumbnailStatus === 'error' && (
                    <p className="text-red-500 text-sm">Please upload a valid image.</p>
                  )}
                </div>
                <Input label="Skills" placeholder="Enter skills" value={mentorshipProgram.skills || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, skills: e.target.value })} variant="bordered" isRequired />
                <Input label="Duration" placeholder="Enter duration" value={mentorshipProgram.duration || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, duration: e.target.value })} variant="bordered" isRequired />
                <Input label="Price" placeholder="Enter price" value={mentorshipProgram.price || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, price: e.target.value })} variant="bordered" isRequired />
                <Input label="Status" placeholder="Enter status" value={mentorshipProgram.status || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, status: e.target.value })} variant="bordered" isRequired />
                <Input label="Chat Link" placeholder="Enter chat link" value={mentorshipProgram.chatLink || ''} onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, chatLink: e.target.value })} variant="bordered" isRequired />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-center md:justify-end gap-3 pb-6 md:pb-0">
                <Button type="button" onClick={onPost} color="primary" size="lg" className="font-semibold bg-gradient-to-r from-primary-600 to-primary-700 shadow-md" disabled={loading}>
                  {loading ? 'Posting...' : 'Post Program'}
=======
                {/* Title */}
                <Input
                  label="Title"
                  placeholder="Enter title"
                  value={mentorshipProgram.title || ''}
                  onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, title: e.target.value })}
                  startContent={
                    <Briefcase className="w-4 h-4 text-default-400" />
                  }
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                  isRequired
                />

                {/* Description */}
                <Textarea
                  label="Description"
                  placeholder="     Enter your description"
                  value={mentorshipProgram.description || ''}
                  onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, description: e.target.value })}
                  variant="bordered"
                  minRows={4}
                  startContent={
                    <FileText className="w-4 h-4 text-default-400 absolute top-8" />
                  }
                  classNames={{
                    label: "text-default-600 font-medium",
                    input: "pl-8",
                  }}
                  isRequired
                />

                {/* Instructor */}
                <Input
                  label="Instructor"
                  placeholder="Enter instructor name"
                  value={mentorshipProgram.instructor || ''}
                  onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, instructor: e.target.value })}
                  startContent={
                    <User className="w-4 h-4 text-default-400" />
                  }
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                  isRequired
                />

{/* Thumbnail Upload */}
<div className="flex flex-col gap-2">
  <label className="text-default-600 font-medium">Thumbnail</label>
  <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="border p-2 rounded"
  />
  {mentorshipProgram.thumbnail && (
    <img
      src={mentorshipProgram.thumbnail}
      alt="Thumbnail Preview"
      className="mt-2 w-32 h-32 object-cover rounded"
    />
  )}
</div>


                {/* Skills */}
                <Input
                  label="Skills"
                  placeholder="Enter skills"
                  value={mentorshipProgram.skills || ''}
                  onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, skills: e.target.value })}
                  startContent={
                    <Code className="w-4 h-4 text-default-400" />
                  }
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                  isRequired
                />

                {/* Duration */}
                <Input
                  label="Duration"
                  placeholder="Enter duration"
                  value={mentorshipProgram.duration || ''}
                  onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, duration: e.target.value })}
                  startContent={
                    <Clock className="w-4 h-4 text-default-400" />
                  }
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                  isRequired
                />

                {/* Price */}
                <Input
                  label="Price"
                  placeholder="Enter price"
                  value={mentorshipProgram.price || ''}
                  onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, price: e.target.value })}
                  startContent={
                    <DollarSign className="w-4 h-4 text-default-400" />
                  }
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                  // isRequired
                />

                {/* Status */}
                <Input
                  label="Status"
                  placeholder="Enter status"
                  value={mentorshipProgram.status || ''}
                  onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, status: e.target.value })}
                  startContent={
                    <MapPin className="w-4 h-4 text-default-400" />
                  }
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                  isRequired
                />

                {/* Chat Link */}
                <Input
                  label="Chat Link"
                  placeholder="Enter chat link"
                  value={mentorshipProgram.chatLink || ''}
                  onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, chatLink: e.target.value })}
                  startContent={
                    <Link className="w-4 h-4 text-default-400" />
                  }
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                  isRequired
                />
              </div>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <div className="flex justify-center md:justify-end gap-3 pb-6 md:pb-0">
                <Button
                  type="button"
                  onClick={onPost}
                  color="primary"
                  size="lg"
                  className="font-semibold bg-gradient-to-r from-primary-600 to-primary-700 shadow-md"
                >
                  Post Program
>>>>>>> Stashed changes
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PostMentorship;



// import React, { useState } from 'react';
// import { createCourse } from '../../services/teacherService';
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Input,
//   Button,
//   Textarea,
//   Divider,
// } from "@nextui-org/react";
// import {
//   Briefcase,
//   Clock,
//   DollarSign,
//   FileText,
//   Code,
//   User,
//   Link,
// } from "lucide-react";

// const PostMentorship = ({ mentorshipProgram, setMentorshipProgram }) => {
//   const [error, setError] = useState(null);

//   const onPost = async () => {
//     const requiredFields = ['title', 'description', 'skills', 'instructor', 'duration', 'price', 'status', 'chatLink'];
//     for (const field of requiredFields) {
//       if (!mentorshipProgram[field]) {
//         setError(`Please fill all fields. Missing: ${field}`);
//         return;
//       }
//     }

//     try {
//       await createCourse(mentorshipProgram);
//     } catch (err) {
//       console.error('Error adding document:', err);
//       setError('Failed to post mentorship program. Please try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col bg-gray-50 min-h-screen p-3 md:p-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl md:text-4xl font-bold text-primary-700 mb-2">
//           Post a New Mentorship Program
//         </h1>
//         <p className="text-gray-600 mb-4">Fill in the details to create an attractive mentorship program</p>

//         <Card className="shadow-md bg-white overflow-hidden">
//           <CardHeader className="flex flex-col items-center px-6 pt-6 pb-2">
//             <Briefcase className="w-6 h-6 text-primary-500" />
//             <h2 className="text-xl font-bold">Mentorship Program Details</h2>
//           </CardHeader>
//           <Divider />

//           {/* Scrollable Form Container */}
//           <div className="max-h-[65vh] overflow-y-auto p-6">
//             <form className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Input
//                   label="Title"
//                   placeholder="Enter title"
//                   value={mentorshipProgram.title || ''}
//                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, title: e.target.value })}
//                   startContent={<Briefcase className="w-4 h-4 text-default-400" />}
//                   variant="bordered"
//                   isRequired
//                 />

//                 <Textarea
//                   label="Description"
//                   placeholder="Enter your description"
//                   value={mentorshipProgram.description || ''}
//                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, description: e.target.value })}
//                   variant="bordered"
//                   minRows={4}
//                   startContent={<FileText className="w-4 h-4 text-default-400 absolute top-3" />}
//                   isRequired
//                 />

//                 <Input
//                   label="Instructor"
//                   placeholder="Enter instructor name"
//                   value={mentorshipProgram.instructor || ''}
//                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, instructor: e.target.value })}
//                   startContent={<User className="w-4 h-4 text-default-400" />}
//                   variant="bordered"
//                   isRequired
//                 />

//                 <Input
//                   label="Skills"
//                   placeholder="Enter skills"
//                   value={mentorshipProgram.skills || ''}
//                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, skills: e.target.value })}
//                   startContent={<Code className="w-4 h-4 text-default-400" />}
//                   variant="bordered"
//                   isRequired
//                 />

//                 <Input
//                   label="Duration"
//                   placeholder="Enter duration"
//                   value={mentorshipProgram.duration || ''}
//                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, duration: e.target.value })}
//                   startContent={<Clock className="w-4 h-4 text-default-400" />}
//                   variant="bordered"
//                   isRequired
//                 />

//                 <Input
//                   label="Price"
//                   placeholder="Enter price"
//                   value={mentorshipProgram.price || ''}
//                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, price: e.target.value })}
//                   startContent={<DollarSign className="w-4 h-4 text-default-400" />}
//                   variant="bordered"
//                 />

//                 <Input
//                   label="Status"
//                   placeholder="Enter status"
//                   value={mentorshipProgram.status || ''}
//                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, status: e.target.value })}
//                   startContent={<Clock className="w-4 h-4 text-default-400" />}
//                   variant="bordered"
//                   isRequired
//                 />

//                 <Input
//                   label="Chat Link"
//                   placeholder="Enter chat link"
//                   value={mentorshipProgram.chatLink || ''}
//                   onChange={(e) => setMentorshipProgram({ ...mentorshipProgram, chatLink: e.target.value })}
//                   startContent={<Link className="w-4 h-4 text-default-400" />}
//                   variant="bordered"
//                   isRequired
//                 />
//               </div>

//               {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//               <div className="flex justify-end gap-3 pb-6">
//                 <Button
//                   type="button"
//                   onClick={onPost}
//                   color="primary"
//                   size="lg"
//                   className="font-semibold bg-gradient-to-r from-primary-600 to-primary-700 shadow-md"
//                 >
//                   Post Program
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default PostMentorship;
