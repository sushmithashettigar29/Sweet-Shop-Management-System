import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // Fetch sweets
  const fetchSweets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data.data || res.data);
    } catch (err) {
      console.error("Error fetching sweets:", err);
    }
  };

  // Search sweets
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/sweets/search?name=${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSweets(res.data.data || res.data);
    } catch (err) {
      console.error("Error searching sweets:", err);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        Welcome, {user?.username}! 🍬
      </h1>

      {/* Search */}
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Search sweets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          Search
        </button>
        <button
          onClick={fetchSweets}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Reset
        </button>
      </div>

      {/* Sweet List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
          <div key={sweet._id} className="bg-white shadow-md p-4 rounded-lg">
            <img
              src={sweet.image || "https://via.placeholder.com/300"}
              alt={sweet.name}
              className="w-64 mx-auto rounded mb-4"
            />
            <h2 className="text-lg font-bold">{sweet.name}</h2>
            <p className="text-gray-600">Category: {sweet.category || "N/A"}</p>
            <p className="text-gray-600">Price: ₹{sweet.price}</p>
            <p
              className={`${
                sweet.quantity > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              Stock: {sweet.quantity}
            </p>
            <button
              onClick={() => navigate(`/sweets/${sweet._id}`)}
              disabled={sweet.quantity === 0}
              className={`mt-2 px-3 py-1 rounded ${
                sweet.quantity > 0
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              View & Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
