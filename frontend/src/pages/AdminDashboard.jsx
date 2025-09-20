/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sweets, setSweets] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  // State for search filters
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchSweets = async () => {
    try {
      const res = await axios.get("https://backend-nine-zeta-55.vercel.app/api/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data.data);
    } catch (err) {
      console.error("Error fetching sweets:", err);
      setMessage("❌ Failed to fetch sweets");
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
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data.data || res.data);
    } catch (err) {
      console.error("Error searching sweets:", err);
      setMessage("❌ Failed to search for sweets");
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
    if (user && user.role === "admin") {
      if (name || category || minPrice || maxPrice) {
        debouncedSearch();
      } else {
        fetchSweets();
      }
    } else {
      navigate("/");
    }
  }, [user, navigate, name, category, minPrice, maxPrice]);

  // Delete a sweet
    const deleteSweet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await axios.delete(`https://backend-nine-zeta-55.vercel.app/api/sweets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("📦 Sweet deleted successfully");
      fetchSweets();
    } catch (err) {
      console.error("Error deleting sweet:", err);
      setMessage("❌ Failed to delete sweet");
    }
  };

  // Restock a sweet
  const restockSweet = async (id) => {
    const qty = prompt("Enter quantity to restock:");
    if (!qty || isNaN(qty)) return;
    try {
      await axios.post(
        `https://backend-nine-zeta-55.vercel.app/api/sweets/${id}/restock`,
        { quantity: Number(qty) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("📦 Sweet restocked successfully");
      fetchSweets();
    } catch (err) {
      console.error("Error restocking sweet:", err);
      setMessage("❌ Failed to restock sweet");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF0D5]">
        <h2 className="text-2xl font-bold text-[#8B2321]">
          Access Denied
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF0D5] font-sans py-16 px-6 sm:px-12 md:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
          <h1 className="text-4xl font-extrabold text-[#8B2321]">
            Admin Dashboard
          </h1>
          <button
            onClick={() => navigate("/admin/add")}
            className="bg-[#8B2321] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#6e1c1a] transition-colors shadow-md"
          >
            + Create Sweet
          </button>
        </div>
        <p className="text-gray-600 text-center sm:text-left text-lg mb-8">
          Manage your sweets, restock inventory, and maintain your store with ease.
        </p>
        
        {message && (
          <div
            className={`p-4 rounded-lg text-center font-semibold mb-4 ${
              message.startsWith("✅") || message.startsWith("📦")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

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
            Reset Filters
          </button>
        </div>

        {/* Sweets Grid */}
        {sweets.length === 0 ? (
          <p className="text-gray-600 text-center mt-10">No sweets available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sweets.map((sweet) => (
              <div key={sweet._id} className="bg-white shadow-xl p-4 transform transition-transform duration-300 hover:scale-105">
                <img
                  src={sweet.image || "https://placehold.co/400x550/F5C7A9/8B2321?text=Sweet"}
                  alt={sweet.name}
                  className="w-full h-56 object-cover mb-4"
                />
                <h3 className="text-xl font-bold text-[#8B2321]">{sweet.name}</h3>
                <p className="text-gray-600 text-sm mt-1">Category: {sweet.category || "N/A"}</p>
                <p className="text-gray-800 font-semibold text-lg mt-2">Price: ₹{sweet.price}</p>
                <p
                  className={`text-sm font-semibold mt-1 ${
                    sweet.quantity > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Stock: {sweet.quantity}
                </p>
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => deleteSweet(sweet._id)}
                    className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-full transition-colors shadow-sm font-semibold"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => restockSweet(sweet._id)}
                    className="w-full sm:w-auto bg-[#8B2321] text-white px-4 py-2 rounded-full  transition-colors shadow-sm font-semibold"
                  >
                    Restock
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-20"/>
    </div>
  );
};

export default AdminDashboard;
