
const ContentSection = () => {
  return (
    <div className="flex flex-col flex-1 shrink self-stretch my-auto text-xl text-black basis-0 min-w-[240px] max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <h1 className="w-full text-6xl font-extrabold leading-[62px] max-md:max-w-full max-md:text-4xl max-md:leading-[50px]">
          Meet international students & teachers
        </h1>
        <p className="mt-8 leading-9 max-md:max-w-full ">
        "Learn&Grow stands as a hub of excellence, where companies find top talent effortlessly. Time moves with precision, ensuring efficiency in every hiring decision. It fosters a seamless recruitment process, balancing innovation with reliability. Like a well-structured foundation, it offers stability—connecting businesses with skilled professionals, blending expertise with opportunity, and driving growth with quiet confidence."
        </p>
        <div className="flex gap-4 items-center self-start mt-8 font-medium tracking-wide leading-tight text-black">
          <button
            className="flex justify-center items-center self-stretch py-4 pr-2 my-auto rounded-lg min-w-[240px]"
            aria-label="Explore teachers and students"
          >
           
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;