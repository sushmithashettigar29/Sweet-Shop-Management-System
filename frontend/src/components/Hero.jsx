import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative flex items-center justify-center min-h-[80vh] text-left
                 bg-[#8B2321] overflow-hidden p-6 sm:p-12"
    >
      {/* Background Wave Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0,50 Q10,60 20,50 T40,50 T60,50 T80,50 T100,50 V0 H0 Z' fill='%23FFDAB9'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Content and Image Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="text-center md:text-left md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 animate-fadeIn">
            Handcrafted Confections for Every Occasion
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[#FFDAB9] mb-8 animate-fadeIn delay-100">
            From classic candies to unique creations, we have the perfect sweet treat to brighten your day.
          </p>
          <a
            href="#"
            onClick={() => navigate(`/all-sweets`)}
            className="inline-flex text-[#8B2321] bg-white border-0 py-3 px-8 
                       focus:outline-none hover:bg-gray-100 rounded-full font-bold
                       transition-colors duration-300 shadow-lg transform hover:scale-105 animate-fadeIn delay-200"
          >
            Shop Our Sweets
          </a>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src="hero.png"
            className=" max-w-full h-auto transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
