import React from 'react';
import { FeatureItem } from './FeatureItem';
import { CourseCard } from './CourseCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const features = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/640fefebceff3e120b28dc16fbfcd06c4c260e6b3a8b8bbe729e13f8a5d08cf0", text: "It is also great for organizing or enhancing your learning experience." },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/640fefebceff3e120b28dc16fbfcd06c4c260e6b3a8b8bbe729e13f8a5d08cf0", text: "Discover new ways to achieve your goals with our innovative tools." },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/640fefebceff3e120b28dc16fbfcd06c4c260e6b3a8b8bbe729e13f8a5d08cf0", text: "Master new skills and reach new heights effortlessly." },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/640fefebceff3e120b28dc16fbfcd06c4c260e6b3a8b8bbe729e13f8a5d08cf0", text: "Transform your career with smarter learning strategies." },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/640fefebceff3e120b28dc16fbfcd06c4c260e6b3a8b8bbe729e13f8a5d08cf0", text: "Empower your future through skill-driven innovation." },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/640fefebceff3e120b28dc16fbfcd06c4c260e6b3a8b8bbe729e13f8a5d08cf0", text: "Simplify your tasks and focus on what truly matters." }
];

const courses = [
  { title: "Master Python for Success", description: "Master Python and Unlock Endless Opportunities in Programming and Data Science", tag: { text: "Featured", color: "purple" }, imageSrc: 'https://images.velog.io/images/xxhaileypark/post/8c4a3b45-7a20-4bee-bc98-48586c498587/Python-language.png' },
  { title: "JavaScript Mastery Made Easy", description: "Learn JavaScript to Build Dynamic Websites, Interactive Apps, and Scalable Solutions", tag: { text: "Popular", color: "blue" }, imageSrc: 'https://www.keycdn.com/img/support/javascript.png' },
  { title: "Become a Java Expert", description: "Learn Java for High-Performance Applications, Scalable Systems, and Career Growth", tag: { text: "New", color: "green" }, imageSrc: 'https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.jpg' }
];

export const AllInOneApp = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <main className="grid grid-cols-2 items-start gap-10 p-20 w-full max-md:px-5 max-md:max-w-full max-md:grid-cols-1">
      
      {/* Left Section (Features) */}
      <section className="relative text-xl text-black min-w-[240px] max-md:max-w-full">
        <h1 className="relative z-10 text-6xl font-extrabold leading-[62px] max-md:text-4xl max-md:leading-[50px]">
          An all-in-one app that makes learning easier
        </h1>
        <div className="relative z-10 flex flex-col mt-8 w-full leading-9">
          {features.map((feature, index) => (
            <FeatureItem key={index} icon={feature.icon} text={feature.text} />
          ))}
        </div>
        <button className="relative z-10 flex justify-center items-center py-2 pr-2 mt-8 font-medium tracking-wide leading-tight text-black rounded-lg">
        </button>
      </section>

      {/* Right Section (Courses) */}
      <section className="min-w-[240px] max-md:max-w-full relative z-10">
        
        {/* Desktop View - Normal Cards */}
        <div className="flex flex-wrap gap-4 max-md:hidden">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>

        {/* Mobile View - Carousel */}
        <div className="hidden max-md:block">
          <Slider {...settings}>
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </Slider>
        </div>

      </section>
    </main>
  );
};
