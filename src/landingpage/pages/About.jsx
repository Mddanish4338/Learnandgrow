import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Learn & Grow</h1>
        <p className="text-gray-600 leading-relaxed">
          Welcome to <strong>Learn & Grow</strong>, your ultimate platform for online education.  
          We provide high-quality courses in various fields to help learners enhance their skills  
          and grow in their careers. Our goal is to make learning accessible, engaging, and effective  
          for everyone.
        </p>
        <p className="text-gray-600 mt-4">
          Whether you're a beginner or an expert, our platform offers something valuable for you.  
          Join us and start your journey of knowledge and growth today!
        </p>
      </div>
    </div>
  );
};

export default About;
