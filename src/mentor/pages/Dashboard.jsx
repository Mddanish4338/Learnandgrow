// import React, { useEffect, useState } from "react";

// const TDashboard = ({ trainer, courses }) => {
//   const [numberOfPosts, setNumberOfPosts] = useState(0);

//   useEffect(() => {
//     if (courses && courses.length > 0) {
//       const totalPosts = courses.reduce((sum, course) => sum + (course.posts?.length || 0), 0);
//       setNumberOfPosts(totalPosts);
//     }
//   }, [courses]);

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg">
//       {/* Welcome Message */}
//       <div className="col-span-1 mb-6 bg-gradient-to-tr from-sky-400 to-sky-600 text-white p-6 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-bold">Hello, Trainer! 👋</h2>
//         <p className="mt-1 text-gray-200">Welcome back! Here's your progress and updates at a glance.</p>
//       </div>

//       {/* Trainer Details and Number of Posts Card */}
//       <div className="flex flex-col md:flex-row gap-6 mb-8 justify-center">
//         {/* Trainer Details */}
//         {trainer && (
//           <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-2 w-full md:w-1/2">
//             <h4 className="text-xl font-semibold mb-2">Trainer Details</h4>
//             <p><span className="font-medium">First Name:</span> {trainer.firstName}</p>
//             <p><span className="font-medium">Last Name:</span> {trainer.lastName}</p>
//             <p><span className="font-medium">Email:</span> {trainer.email}</p>
//             <p><span className="font-medium">Phone Number:</span> {trainer.phone}</p>
//             <p><span className="font-medium">Role:</span> {trainer.role}</p>
//           </div>
//         )}

//         {/* Number of Posts Card */}
//         <div className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col justify-center items-center w-full md:w-1/3">
//           <h4 className="text-xl font-semibold mb-4">Number of Posts</h4>
//           <p className="text-4xl font-bold text-blue-600">{numberOfPosts}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TDashboard;



import React, { useEffect, useState } from "react";

const TDashboard = ({ trainer, courses }) => {
  const [numberOfPosts, setNumberOfPosts] = useState(0);

  useEffect(() => {
    if (courses && courses.length > 0 && trainer) {
      const trainerPosts = courses.reduce((sum, course) => {
        const trainerSpecificPosts = course.posts?.filter(post => post.trainerId === trainer.id) || [];
        return sum + trainerSpecificPosts.length;
      }, 0);
      setNumberOfPosts(trainerPosts);
    }
  }, [courses, trainer]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {/* Welcome Message */}
      <div className="col-span-1 mb-6 bg-gradient-to-tr from-sky-400 to-sky-600 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold">Hello, Trainer! 👋</h2>
        <p className="mt-1 text-gray-200">Welcome back! Here's your progress and updates at a glance.</p>
      </div>

      {/* Trainer Details and Number of Posts Card */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 justify-center">
        {/* Trainer Details */}
        {trainer && (
          <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-2 w-full md:w-1/2">
            <h4 className="text-xl font-semibold mb-2">Trainer Details</h4>
            <p><span className="font-medium">First Name:</span> {trainer.firstName}</p>
            <p><span className="font-medium">Last Name:</span> {trainer.lastName}</p>
            <p><span className="font-medium">Email:</span> {trainer.email}</p>
            <p><span className="font-medium">Phone Number:</span> {trainer.phone}</p>
            <p><span className="font-medium">Role:</span> {trainer.role}</p>
          </div>
        )}

        {/* Number of Posts Card */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col justify-center items-center w-full md:w-1/3">
          <h4 className="text-xl font-semibold mb-4">Number of Posts</h4>
          <p className="text-4xl font-bold text-blue-600">{numberOfPosts}</p>
        </div>
      </div>
    </div>
  );
};

export default TDashboard;
