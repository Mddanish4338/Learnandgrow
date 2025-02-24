import React from "react";
import { Link } from "react-router-dom";

function FooterBottomSection() {
  return (
    <div className="flex flex-wrap gap-10 items-center py-6 w-full max-md:max-w-full bg--800">
      {/* Copyright Text */}
      <div className="flex-1 shrink self-stretch my-auto text-base leading-snug text-white basis-0 max-md:max-w-full">
        Learn&Grow © 2025. All rights reserved.
      </div>

      {/* Navigation Links */}
      <nav className="flex gap-8 items-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
        {/* Terms Page Link */}
        <Link
          to="/terms"
          className="py-3 my-auto text-base leading-snug text-white whitespace-nowrap hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Terms
        </Link>

        {/* Privacy Page Link */}
        <Link
          to="/privacy"
          className="py-3 my-auto text-base leading-snug text-white whitespace-nowrap hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Privacy
        </Link>

        {/* Contact Button - Redirects to WhatsApp */}
        <a
          href="https://wa.me/919876543210" // Replace with real number
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 my-auto text-base leading-snug text-white whitespace-nowrap hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Contact
        </a>

        {/* Language Selector */}
        <div className="flex gap-2 items-center py-3 my-auto text-base leading-snug text-white whitespace-nowrap">
          <span className="self-stretch my-auto">EN</span>
        </div>

        {/* Currency Selector with Rupee (₹) Icon */}
        <div className="flex gap-2 items-center py-3 my-auto text-base leading-snug text-white whitespace-nowrap">
          <span className="self-stretch my-auto">₹</span>
          <span className="self-stretch my-auto">INR</span>
        </div>

        {/* Additional Options Button */}
        <button
          className="flex gap-2 items-center py-3 my-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="More options"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/923a7a8a712b0302b5f2048713d445f763d7a1367a8edfca05fe13295d51ea93"
            alt="More options"
            className="object-contain self-stretch my-auto w-6 aspect-square"
          />
        </button>
      </nav>
    </div>
  );
}

export default FooterBottomSection;
