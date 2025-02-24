import React from "react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    content:
      "The platform has been a game-changer for our business. The tools provided are intuitive and have significantly improved our workflow. Highly recommended!",
    name: "Hellen Jummy",
    role: "App Developer",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/5c0b298a0dca116690cb0db214dc86f69a4c244912fb6272ce34c070d6eadbf6?placeholderIfAbsent=true&apiKey=acdba41aa2944c3882a28ccbc21fcf8a",
  },
  {
    content:
      "As a Python expert, I found the platform's flexibility and support for custom integrations to be outstanding. It has made my work much more efficient.",
    name: "Ralph Edwards",
    role: "Python Expert",
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/a813a7b4dde6c5111944930f9d086aed745990b1e1d36db91501dcdfccfaaa41?placeholderIfAbsent=true&apiKey=acdba41aa2944c3882a28ccbc21fcf8a",
  },
  {
    content:
      "Being a Computer Science student, I appreciate how user-friendly and resourceful this platform is. It has helped me learn and implement concepts effectively.",
    name: "Arnav Sharma",
    role: "CSE Student",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9NYDg9-wQrZiBzVjHE-PRkaDNLhqM4GqVEg&s",
  },
  {
    content:
      "The platform has streamlined our team's operations and improved collaboration. It's a must-have for any modern business looking to scale efficiently.",
    name: "Rahul Sharma",
    role: "Manager",
    imageSrc:
      "https://static8.depositphotos.com/1468291/934/i/450/depositphotos_9346925-stock-photo-portrait-of-office-worker-at.jpg",
  },
  {
    content:
      "As a CEO, I value tools that drive productivity and innovation. This platform has exceeded my expectations and has become an integral part of our strategy.",
    name: "John",
    role: "CEO",
    imageSrc:
      "https://www.cio.com/wp-content/uploads/2024/01/shutterstock_1095953582.jpg?quality=50&strip=all&w=1024",
  },
];

function TestimonialSection() {
  return (
    <section
      className="flex overflow-hidden flex-col justify-center p-20 w-full max-md:px-5 max-md:max-w-full"
      aria-labelledby="testimonials-heading"
    >
      <h2 id="testimonials-heading" className="sr-only">
        Testimonials
      </h2>
      {/* Heading with Blue Underline */}
      <div className="flex flex-wrap gap-10 items-center w-full max-md:max-w-full">
        <div className="flex flex-col flex-1 shrink self-stretch my-auto text-6xl font-extrabold leading-none text-black basis-0 min-w-[240px] max-md:max-w-full max-md:text-4xl">
          <div className="w-full max-md:max-w-full max-md:text-4xl">
            What Our{" "}
            <span className="relative inline-block">
              Users
              <span className="mt-3 absolute left-0 top-12 w-full h-2 bg-[#7096D1]"></span>
            </span>{" "}
            Say
          </div>
        </div>
      </div>

      {/* Testimonial Cards */}
      <div className="flex overflow-x-auto gap-6 items-center mt-20 w-full text-black max-md:mt-10 max-md:max-w-full">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
}

export default TestimonialSection;
