import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AddSweet = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSweet = async () => {
    // Basic validation
    if (!form.name || !form.category || !form.price || !form.quantity) {
      setMessage("❌ Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://backend-nine-zeta-55.vercel.app/api/sweets", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Sweet added successfully");
      setTimeout(() => navigate("/admin"), 1500);
    } catch (err) {
      console.error("Error adding sweet:", err);
      setMessage("❌ Failed to add sweet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF0D5] p-6 font-sans">
      <div className="bg-white p-8 w-full max-w-xl">
        <h2 className="text-4xl font-extrabold text-[#8B2321] mb-6 text-center">
          Add New Sweet
        </h2>
        {message && (
          <div
            className={`p-4 rounded-lg text-center font-semibold mb-4 ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Sweet Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B2321] focus:border-[#8B2321] transition-all"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B2321] focus:border-[#8B2321] transition-all"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#8B2321] focus:border-[#8B2321] transition-all"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFC7AE] focus:border-[#FFC7AE] transition-all"
          />
          <div className="sm:col-span-2">
            <input
              type="text"
              name="image"
              placeholder="Image URL (optional)"
              value={form.image}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-[#8B2321] focus:border-[#8B2321] transition-all"
            />
          </div>
        </div>
        <button
          onClick={addSweet}
          disabled={loading}
          className={`mt-6 w-full px-4 py-3  text-white cursor-pointer font-semibold shadow-md transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#8B2321]"
          }`}
        >
          {loading ? "Creating..." : "Create Sweet"}
        </button>
        <button
          onClick={() => navigate("/admin")}
          className="mt-4 w-full px-4 py-3 cursor-pointer  bg-gray-400 text-white hover:bg-gray-500 shadow-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddSweet;
