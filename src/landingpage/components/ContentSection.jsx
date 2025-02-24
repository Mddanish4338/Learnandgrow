
const ContentSection = () => {
  return (
    <div className="flex flex-col flex-1 shrink self-stretch my-auto text-xl text-black basis-0 min-w-[240px] max-md:max-w-full">
      <div className="flex flex-col w-full max-md:max-w-full">
        <h1 className="w-full text-6xl font-extrabold leading-[62px] max-md:max-w-full max-md:text-4xl max-md:leading-[50px]">
          Meet international students & teachers
        </h1>
        <p className="mt-8 leading-9 max-md:max-w-full ">
        "Morbi sits with a dignified poise, marked by elegance. Time moves steadily like an old age, flowing gently yet firmly, now and then. It embraces comfort, finding ease in every move, with grace that never falters. Like a well-placed structure, it stands firm — a steady presence, blending softness and strength, carrying itself with quiet confidence."
        </p>
        <div className="flex gap-4 items-center self-start mt-8 font-medium tracking-wide leading-tight text-black">
          <button
            className="flex justify-center items-center self-stretch py-4 pr-2 my-auto rounded-lg min-w-[240px]"
            aria-label="Explore teachers and students"
          >
            <span className="text-[#7096D1] self-stretch pr-4 my-auto min-w-[240px]">
              Explore teachers and students
            </span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b24c157a154f50c68f83f0b03054fc7b241731d650c53545d0c7859e2263be7?placeholderIfAbsent=true&apiKey=acdba41aa2944c3882a28ccbc21fcf8a"
              alt=""
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;