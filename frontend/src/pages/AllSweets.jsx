import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import SweetCard from "../components/SweetCard";

const AllSweets = () => {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchSweets = async () => {
    try {
      const res = await axios.get("https://backend-nine-zeta-55.vercel.app/api/sweets");
      setSweets(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching sweets:", err);
    }
  };

  const handleSearch = async () => {
    try {
      const params = {};
      if (name.trim()) params.name = name.trim();
      if (category.trim()) params.category = category.trim();
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await axios.get("https://backend-nine-zeta-55.vercel.app/api/sweets/search", {
        params,
      });

      setSweets(res.data.data || res.data);
    } catch (err) {
      console.error("Error searching sweets:", err);
    }
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 500), [
    name,
    category,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    fetchSweets();
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

        {/* Reset Button */}
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
            sweets.map((sweet) => <SweetCard key={sweet._id} sweet={sweet} />)
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