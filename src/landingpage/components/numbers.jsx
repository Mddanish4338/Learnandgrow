import { FaHeart, FaGem, FaGraduationCap } from "react-icons/fa"; // Importing icons

const stats = [
  { icon: <FaHeart className="text-[#7096D1] w-12 h-12 sm:w-16 sm:h-16" />, number: "195", label: "user countries" },
  { icon: <FaGem className="text-[#7096D1] w-12 h-12 sm:w-16 sm:h-16" />, number: "1M", label: "valued teachers" },
  { icon: <FaGraduationCap className="text-[#7096D1] w-12 h-12 sm:w-16 sm:h-16" />, number: "17M", label: "happy students" },
];

const StatsSection = () => {
  return (
    <div className="bg-gray-100 text-white py-10 md:py-16">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-20 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center w-24 sm:w-32">
            {stat.icon}
            <h3 className="text-2xl sm:text-4xl font-bold text-[#7096D1] mt-2">{stat.number}</h3>
            <p className="text-gray-500 text-sm sm:text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
