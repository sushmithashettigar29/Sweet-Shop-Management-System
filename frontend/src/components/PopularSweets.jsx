import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PopularSweets = ({text}) => {
  const [sweets, setSweets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await axios.get("https://backend-nine-zeta-55.vercel.app/api/sweets");
        const latestFour = res.data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setSweets(latestFour);
      } catch (err) {
        console.error("Error fetching sweets:", err);
      }
    };

    fetchSweets();
  }, []);

  return (
    <section className="py-16 px-6 sm:px-12 md:px-24 bg-[#FDF0D5]">
      <div className="container mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#8B2321] text-center mb-10">
          {text}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sweets.map((sweet) => (
            <div
              key={sweet._id}
              className="bg-white rounded-none shadow-xl p-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src={sweet.image || "https://placehold.co/400x550/F5C7A9/8B2321?text=Sweet"}
                alt={sweet.name}
                className="w-full h-56 object-cover  mb-4 sm:h-64"
              />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-[#8B2321]">{sweet.name}</h3>
                <p className="text-lg font-bold text-[#8B2321]">₹{sweet.price}</p>
              </div>
              <p className="text-gray-600 text-sm">
                Quantity: {sweet.quantity}
              </p>
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-[#8B2321] font-semibold text-sm
                             ${sweet.quantity > 0 ? "bg-[#FFDAB9]" : "bg-red-500"}`}
                >
                  {sweet.quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
                <button
                  onClick={() => navigate(`/sweets/${sweet._id}`)}
                  disabled={sweet.quantity === 0}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors cursor-pointer
                             ${sweet.quantity > 0
                              ? "bg-[#8B2321] text-white shadow-lg"
                              : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSweets;
