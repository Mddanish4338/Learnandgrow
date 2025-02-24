import React from 'react';
import { FeatureItem } from './FeatureItem';
import { CourseCard } from './CourseCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const features = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/640fefebceff3e120b28dc16fbfcd06c4c260e6b3a8b8bbe729e13f8a5d08cf0", text: "It is also great for organizing or enhancing your learning experience." },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/640fefebceff3e120b28dc16fbfcd06c4c260e6b3a8b8bbe729e13f8a5d08cf0", text: "Discover new ways to achieve your goals with our innovative tools." },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/640fefebceff3e120b28dc16fbfcd06c4c260e6b3a8b8bbe729e13f8a5d08cf0", text: "Simplify your tasks and focus on what truly matters." }
];

const courses = [
  { title: "The Map of Mathematics", description: "Explore the fascinating world of mathematics and its applications.", tag: { text: "Featured", color: "purple" }, imageSrc: 'https://images.velog.io/images/xxhaileypark/post/8c4a3b45-7a20-4bee-bc98-48586c498587/Python-language.png' },
  { title: "Design for How People Think", description: "Learn how to create designs that resonate with human psychology.", tag: { text: "Popular", color: "blue" }, imageSrc: 'https://www.keycdn.com/img/support/javascript.png' },
  { title: "International & Commercial Law", description: "Understand the complexities of global and business law very effeciently.", tag: { text: "New", color: "green" }, imageSrc: 'https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.jpg' }
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
          <span className="pr-4 text-[#7096D1] my-auto min-w-[240px] ml-4">Learn more about the app</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5d03c0bbba4f7bb7467339711d8c230c541e4c78fb0260e4f751fa95165957e?placeholderIfAbsent=true&apiKey=acdba41aa2944c3882a28ccbc21fcf8a"
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square ml-1 mt-1"
          />
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
