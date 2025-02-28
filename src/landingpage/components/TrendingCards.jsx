import React from "react";

const trendingCards = [
  {
    title: "Online Courses with Guaranteed Placement",
    description: "Placement guaranteed courses",
    bgColor: "bg-teal-500",
    textColor: "text-white",
  },
  {
    title: "Welcome! Special offer of 55% + 10% OFF",
    description: "Learn&Grow Trainings",
    bgColor: "bg-blue-300",
    textColor: "text-gray-900",
  },
  {
    title: "MATCH MADE ON Learn&Grow",
    description: "Match with top brands & earn up to ₹1.8 lacs",
    bgColor: "bg-pink-300",
    textColor: "text-gray-900",
  },
];

const TrendingCards = () => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <h2 className="w-full text-6xl font-extrabold leading-none max-md:max-w-full max-md:text-4xl">
        Make your dream career a reality
      </h2>
      <div className="h-1 w-88 bg-blue-500 rounded-full my-2"></div>
      <p className="w-full text-3xl font-bold mt-2 max-md:max-w-full max-md:text-3xl">
        Trending on Learn&Grow 🔥
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-6 w-full max-w-6xl px-4">
        {trendingCards.map((card, index) => (
          <div
            key={index}
            className="relative h-full rounded-xl group"
          >
            {/* Glowing Border */}
            <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 group-hover:opacity-50 transition-all duration-300 animate-spin-slow" />
            
            {/* Glow Effect */}
            <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-10 animate-pulse" />

            {/* Card Content */}
            <div
              className={`relative h-full p-8 rounded-xl shadow-2xl ${card.bgColor} ${card.textColor}`}
            >
              <p className="text-sm font-semibold mb-4 bg-white/20 px-4 py-2 inline-block rounded-lg">
                {card.description}
              </p>
              <h3 className="text-2xl font-bold mb-6">{card.title}</h3>
              
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TrendingCards;