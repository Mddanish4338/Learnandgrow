import React from "react";

const TestimonialCard = ({ content, name, role, imageSrc, isHovered }) => {
  return (
    <div
      className={`flex overflow-hidden flex-col self-stretch my-auto bg-white rounded-3xl shadow-lg min-w-[240px] w-[412px] transition-all duration-300 mb-[30px] ${
        isHovered ? "scale-105 shadow-2xl" : "hover:scale-105 hover:shadow-2xl"
      }`}
    >
      <div className="flex flex-col p-8 w-full max-md:px-5">
        <div className="text-lg leading-7 italic">{content}</div>
        <div className="flex gap-4 items-center pt-4 mt-4 w-full">
          <img
            loading="lazy"
            src={imageSrc}
            alt={`Portrait of ${name}`}
            className="object-cover shrink-0 gap-2.5 self-stretch my-auto w-16 aspect-square min-h-[64px] rounded-full"
          />
          <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px]">
            <div className="text-lg leading-relaxed font-bold">{name}</div>
            <div className="text-base leading-snug font-semibold text-[#7096D1]">
              {role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
