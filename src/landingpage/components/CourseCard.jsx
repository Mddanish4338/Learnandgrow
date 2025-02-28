import { Button } from '@nextui-org/react';
import React, { useState } from 'react';

export const CourseCard = ({ title, description, tag, imageSrc }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Color mappings
  const colorClasses = {
    purple: "bg-purple-100 text-purple-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600"
  };

  const glowColors = {
    purple: 'rgba(147, 51, 234, 0.7)',
    blue: 'rgba(59, 130, 246, 0.7)',
    green: 'rgba(34, 197, 94, 0.7)'
  };

  return (
    <div 
      className="flex overflow-hidden relative flex-col flex-1 shrink bg-stone-100 rounded-xl shadow-2xl transition-shadow duration-300"
      style={{
        boxShadow: isHovered 
          ? `var(--tw-shadow), 0 0 20px ${glowColors[tag.color]}`
          : 'var(--tw-shadow)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      
      {/* Tag */}
      <div
        className={`flex absolute top-4 left-4 justify-center items-center px-2 py-1 h-6 text-sm leading-snug whitespace-nowrap rounded ${colorClasses[tag.color]}`}
      >
        {tag.text}
      </div>
    </div>
  );
};