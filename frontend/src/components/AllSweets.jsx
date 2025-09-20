import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllSweets = () => {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  // Fetch all sweets
  const fetchSweets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sweets");
      setSweets(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching sweets:", err);
    }
  };

  // Search sweets with filters
  const handleSearch = async () => {
    try {
      const params = {};
      if (name.trim()) params.name = name.trim();
      if (category.trim()) params.category = category.trim();
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await axios.get("http://localhost:5000/api/sweets/search", {
        params,
      });

      setSweets(res.data.data || res.data);
    } catch (err) {
      console.error("Error searching sweets:", err);
    }
  };

  // Debounce utility
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced search function
  const debouncedSearch = useCallback(debounce(handleSearch, 500), [
    name,
    category,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    fetchSweets(); // Load all on mount
  }, []);

  useEffect(() => {
    if (name || category || minPrice || maxPrice) {
      debouncedSearch();
    } else {
      fetchSweets();
    }
  }, [name, category, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-[#FDF0D5] font-sans py-16 px-6 sm:px-12 md:px-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#8B2321] text-center mb-8">
          All Sweets
        </h1>

        {/* Search Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#8B2321] py-2 px-3"
          />
          <input
            type="text"
            placeholder="Category..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#8B2321] py-2 px-3"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#8B2321] py-2 px-3"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#8B2321] py-2 px-3"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mb-10">
          <button
            onClick={() => {
              setName("");
              setCategory("");
              setMinPrice("");
              setMaxPrice("");
              fetchSweets();
            }}
            className="px-6 py-2 rounded-full font-semibold text-white bg-gray-500 hover:bg-gray-700"
          >
            Reset
          </button>
        </div>

        {/* Sweet List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sweets.length > 0 ? (
            sweets.map((sweet) => (
                        <div
              key={sweet._id}
              className="bg-white rounded-none shadow-xl p-4 transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={sweet.image || "https://placehold.co/400x550/F5C7A9/8B2321?text=Sweet"}
                alt={sweet.name}
                className="w-full h-56 object-cover rounded-none mb-4 shadow-md sm:h-64"
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
                  className={`px-4 py-2 rounded-full font-semibold transition-colors
                             ${sweet.quantity > 0
                              ? "bg-[#8B2321] text-white hover:bg-[#6e1c1a] shadow-lg"
                              : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                >
                  View & Buy
                </button>
              </div>
            </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">
              No sweets found matching your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllSweets;
