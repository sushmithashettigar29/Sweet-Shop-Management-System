import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const SweetDetail = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [sweet, setSweet] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Fetch single sweet
  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/sweets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSweet(res.data.data || res.data);
      } catch (err) {
        console.error("Error fetching sweet:", err);
      }
    };
    fetchSweet();
  }, [id, token]);

  // Purchase
  const handlePurchase = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/sweets/${id}/purchase`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Purchase successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error purchasing:", err);
      alert("❌ Failed to purchase. Maybe stock is low.");
    }
  };

  if (!sweet) return <p>Loading sweet...</p>;

  return (
    <div className="p-6">
      <img src={sweet.image || "https://via.placeholder.com/300"} alt={sweet.name} className="w-64 mx-auto rounded mb-4"/>
      <h1 className="text-2xl font-bold mb-4">{sweet.name}</h1>
      <p className="text-gray-700 mb-2">Category: {sweet.category}</p>
      <p className="text-gray-700 mb-2">Price: ₹{sweet.price}</p>
      <p
        className={`mb-2 ${
          sweet.quantity > 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        Stock: {sweet.quantity}
      </p>

      <div className="flex items-center space-x-2 mb-4">
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          max={sweet.quantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 w-20 rounded"
        />
      </div>

      <button
        onClick={handlePurchase}
        disabled={sweet.quantity === 0}
        className={`px-4 py-2 rounded ${
          sweet.quantity > 0
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
      >
        Buy Now
      </button>
    </div>
  );
};

export default SweetDetail;
