import Button from "./Button";
import TeachingImage from '../assets/imgteach.png';

const TeachingComponent = () => {
  return (
    <main className="flex flex-col md:flex-row overflow-hidden gap-10 items-center px-20 md:py-3 w-full max-md:px-5 max-md:py-6 mt-20 max-md:mt-25">{/* Adjusted padding-top */}
      {/* Left Section (Text Content) */}
      <section className="relative flex flex-col flex-1 min-w-[240px] max-md:max-w-full">
        <div className="z-10 relative">
          {/* Main Heading with Orange Line */}
          <h1 className="text-7xl font-extrabold text-black max-md:text-4xl max-md:leading-[49px]">
            <span className="relative inline-block">
              Teach
              {/* Orange Line - "Teach" ke neeche */}
              <span className="absolute left-0 bottom-[-10px] w-full h-2 bg-[#7096D1]
                max-md:bottom-[-5px] max-md:h-1.5"></span>
            </span>
            <span className="ml-4">students worldwide</span>
          </h1>

          {/* Description Text */}
          <p className="mt-8 text-2xl leading-10 text-black max-md:text-xl max-md:leading-8">
            A Platform where you can teach students and help them to secure a job in their desired field.
            Start earning now what are you waiting for? Join us now.
          </p>

          {/* Buttons */}
          <div className="flex gap-8 items-center mt-8 max-md:flex-col max-md:gap-4">
            <Button variant="primary" size="large" className="max-md:w-full">
              Sign Up Now
            </Button>
            
          </div>
        </div>
      </section>

      {/* Right Section (Image) */}
      <img
        loading="lazy"
        src={TeachingImage}
        alt="Online teaching illustration"
        className="object-contain md:self-stretch my-auto w-full max-w-[625px] max-md:mt-10"
      />
    </main>
  );
};

export default TeachingComponent;
