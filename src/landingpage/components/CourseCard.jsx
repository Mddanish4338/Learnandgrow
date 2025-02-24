import React from 'react';
import Button from './Button';

export const CourseCard = ({ title, description, tag, imageSrc }) => {
  // Color mapping for Tailwind classes
  const colorClasses = {
    purple: "bg-purple-100 text-purple-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600"
  };

  return (
    <div className="flex overflow-hidden relative flex-col flex-1 shrink bg-stone-200 rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300">
      {/* Top Image */}
      <img
        src={imageSrc}
        alt="Tutor"
        className="w-full h-48 object-cover rounded-t-xl"
      />
      
      {/* Content Area */}
      <div className="flex flex-col px-4 pt-4 pb-4 w-full text-black">
        <h2 className="text-xl font-medium leading-6">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-5 italic">
          {description}
        </p>
      </div>
      
      {/* Button */}
      <div className="flex gap-4 items-start p-4 w-full text-sm font-medium tracking-wide leading-6">
        <Button variant="primary" size="small">
          <span>Take Lesson</span>
        </Button>
      </div>
      
      {/* Tag */}
      <div
        className={`flex absolute top-4 left-4 justify-center items-center px-2 py-1 h-6 text-sm leading-snug whitespace-nowrap rounded ${colorClasses[tag.color]}`}
      >
        {tag.text}
      </div>
    </div>
  );
};