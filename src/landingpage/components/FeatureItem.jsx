import React from 'react';

export const FeatureItem = ({ icon, text }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center w-full max-md:max-w-full">
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
      />
      <div className="self-stretch my-auto max-md:max-w-full">{text}</div>
    </div>
  );
};