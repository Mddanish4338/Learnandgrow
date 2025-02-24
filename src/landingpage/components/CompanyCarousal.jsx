import React from "react";
import { motion } from "framer-motion";
import oyoImg from "../assets/oyoo.png";
import amazon from "../assets/amazon.png";
import netflix from "../assets/netflix.png";
import samsung from "../assets/samsung.png";
import toyota from "../assets/toyota.png";
import google from "../assets/google.png";


// Company Logos (Replace with your images)
const companies = [oyoImg, amazon, netflix, samsung, toyota, google];

const CompanyCarousel = () => {
  return (
    <div className="overflow-hidden py-10 bg-white">
      <h2 className="text-center w-full text-6xl font-extrabold leading-none max-md:max-w-full max-md:text-3xl">
        Top Companies trust us
      </h2>
      <div className="relative w-full flex items-center">
        <motion.div
          className="flex space-x-12 w-max" // Increased space between logos
          animate={{ x: ["0%", "-25%"] }} // Continuous left movement
          transition={{
            ease: "linear",
            duration: 10,
            repeat: Infinity,
          }}
        >
          {[...companies, ...companies, ...companies].map((logo, index) => (
            <img
              key={index}
              src={logo} 
              alt="Company Logo"
              className="mt-8 mb-1 w-24 h-24 sm:w-32 sm:h-32 md:w-30 md:h-40 object-contain" // Increased logo size
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyCarousel;
