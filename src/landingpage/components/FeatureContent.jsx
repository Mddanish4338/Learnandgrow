import React from 'react';
import  {ViewFeaturesButton}  from './ViewFeatureButton';

export const FeatureContent = () => {
  return (
    <div className="flex relative flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7158b5f8ebdb1f220b02fd6471d450c6a2264af40c4d53c4f6d2765b534cb41b?placeholderIfAbsent=true&apiKey=acdba41aa2944c3882a28ccbc21fcf8a"
        className="object-contain absolute top-12 z-0 max-w-full h-3 aspect-[16.95] right-[71px] stroke-[10px] stroke-orange-400 w-[205px]"
        alt=""
      />
      <div className="flex z-0 flex-col w-full max-md:max-w-full">
        <h3 className="w-full text-6xl font-extrabold leading-none max-md:max-w-full max-md:text-4xl">
          Get placed in your dream company
        </h3>
        <p className="mt-8 leading-9 max-md:max-w-full">
        Get placed in top companies with our expert guidance! We provide the right resources, training, and mentorship to help you crack job interviews with confidence. From resume building to mastering technical and HR rounds, our tailored programs ensure you stand out in the competitive job market. Whether you're a fresher or looking for a career switch, our dedicated support will equip you with the skills and strategies needed to secure your dream job. Join us and take the first step towards a successful career!
        </p>
        <ViewFeaturesButton />
      </div>
    </div>
  );
};