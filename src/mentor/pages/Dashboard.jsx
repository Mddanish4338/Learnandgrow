import React from "react";

const TDashboard = ({ trainer, studentsEnrolled, numberOfPosts }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {/* Welcome Message */}
      <div className="col-span-1 mb-6 bg-gradient-to-tr from-sky-400 to-sky-600 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold">Hello, Trainer! 👋</h2>
        <p className="mt-1 text-gray-200">Welcome back! Here's your progress and updates at a glance.</p>
      </div>

      {/* Trainer Details */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-2">Trainer Details</h4>
        {trainer ? (
          <div className="bg-gray-50 p-6 rounded-xl shadow-md space-y-2">
            <p>
              <span className="font-medium">First Name:</span> {trainer.firstName}
            </p>
            <p>
              <span className="font-medium">Last Name:</span> {trainer.lastName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {trainer.email}
            </p>
            <p>
              <span className="font-medium">Phone Number:</span> {trainer.phone}
            </p>
            <p>
              <span className="font-medium">Role:</span> {trainer.role}
            </p>
          </div>
        ) : (
          <p className="text-gray-700">No trainer data found.</p>
        )}
      </div>

      {/* Students Enrolled and Number of Posts Cards */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Students Enrolled Card */}
        <div className="flex-1 bg-gray-50 p-6 rounded-xl shadow-md">
          <h4 className="text-xl font-semibold mb-4">Students Enrolled</h4>
          {studentsEnrolled && studentsEnrolled.length > 0 ? (
            <ul className="space-y-2">
              {studentsEnrolled.map((student, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-lg">
                  <span className="font-medium">{student.name}</span> - {student.email}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No students enrolled yet.</p>
          )}
        </div>

        {/* Number of Posts Card */}
        <div className="flex-1 bg-gray-50 p-6 rounded-xl shadow-md flex flex-col justify-center items-center">
          <h4 className="text-xl font-semibold mb-4">Number of Posts</h4>
          <p className="text-4xl font-bold text-blue-600">{numberOfPosts || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default TDashboard;