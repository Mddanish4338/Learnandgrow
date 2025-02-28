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
//         setThumbnailStatus('success');
//       };
//       reader.onerror = () => {
//         setThumbnailStatus('error');
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setThumbnailStatus('error');
//     }
//   };

//   return (
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
  Divider,
} from "@nextui-org/react";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  Code,
  User,
  Link,
} from "lucide-react";
import { serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext"; // Import useAuth

const PostMentorship = ({ mentorshipProgram, setMentorshipProgram }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [thumbnailStatus, setThumbnailStatus] = useState('default');
  const dateInputRef = useRef(null);
  const { user } = useAuth(); // Get the logged-in user

  const onPost = async () => {
    const requiredFields = ['title', 'description', 'skills', 'instructor', 'thumbnail', 'duration', 'price', 'status', 'chatLink'];
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
      setThumbnailStatus('error');
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen p-3 md:p-8 pb-20">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-white to-gray-50">
          <CardHeader className="flex flex-col gap-2 items-center px-6 pt-6 pb-2">
            <div className="bg-primary-100 p-3 rounded-full">
              <Briefcase className="w-6 h-6 text-primary-500" />
            </div>
            <h2 className="text-xl font-bold">Mentorship Program Details</h2>
          </CardHeader>
          <Divider className="my-2" />
          <CardBody className="p-6">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
