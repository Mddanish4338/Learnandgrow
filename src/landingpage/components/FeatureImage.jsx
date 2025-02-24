import React from 'react';
import CompanyImage from '../assets/handShaking.png'

export const FeatureImage = () => {
  return (
    <img
      loading="lazy"
      src={CompanyImage}
      className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-[1.2] basis-0 min-w-[240px] max-md:max-w-full"
      alt="Feature illustration"
    />
  );
};