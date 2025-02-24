import React from "react";

const trendingCards = [
  {
    title: "Online Courses with Guaranteed Placement",
    description: "Placement guaranteed courses",
    btnText: "Know more",
    bgColor: "bg-teal-500",
    textColor: "text-white",
  },
  {
    title: "Welcome! Special offer of 55% + 10% OFF",
    description: "Learn&Grow Trainings",
    btnText: "Know more",
    bgColor: "bg-blue-300",
    textColor: "text-gray-900",
  },
  {
    title: "MATCH MADE ON Learn&Grow",
    description: "Match with top brands & earn up to ₹1.8 lacs",
    btnText: "Participate now",
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

      <div className="grid md:grid-cols-3 gap-6 mt-6 w-full max-w-6xl">
        {trendingCards.map((card, index) => (
          <div
            key={index}
            className={` p-12 rounded-xl shadow-2xl ${card.bgColor} ${card.textColor}`}
          >
            <p className="text-sm font-semibold mb-2 bg-white/20 px-3 py-1 inline-block rounded-lg">
              {card.description}
            </p>
            <h3 className="text-lg font-bold">{card.title}</h3>
            <button className="mt-4 px-4 py-2 bg-white text-black rounded-full font-medium cursor-pointer hover:bg-gray-700 hover:text-white">
              {card.btnText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCards;
