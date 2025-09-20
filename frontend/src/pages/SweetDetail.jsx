import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import PopularSweets from "../components/PopularSweets";

const SweetDetail = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [sweet, setSweet] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch single sweet
  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const res = await axios.get(`https://backend-nine-zeta-55.vercel.app/api/sweets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSweet(res.data.data || res.data);
      } catch (err) {
        console.error("Error fetching sweet:", err);
        setMessage("❌ Failed to fetch sweet details.");
      }
    };
    fetchSweet();
  }, [id, token]);

  // Purchase
  const handlePurchase = async () => {
    try {
      await axios.post(
        `https://backend-nine-zeta-55.vercel.app/api/sweets/${id}/purchase`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Purchase successful!");
      // Redirect after a short delay to allow the user to see the success message
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      console.error("Error purchasing:", err);
      setMessage("❌ Failed to purchase. Maybe stock is low.");
    }
  };

  if (!sweet) return <p className="text-center mt-10">Loading sweet...</p>;

  return (
    <div className="relative min-h-screen bg-[#FDF0D5] font-sans py-16 px-6 sm:px-12 md:px-24 flex items-center justify-center flex-col">
      <div className="bg-white p-8 md:p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
        {/* Sweet Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={sweet.image || "https://placehold.co/600x600/F5C7A9/8B2321?text=Sweet"}
            alt={sweet.name}
            className="w-full max-w-sm object-cover"
          />
        </div>

        {/* Sweet Details Section */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#8B2321]">
            {sweet.name}
          </h1>
          <p className="text-xl text-gray-600">Category: {sweet.category}</p>
          <p className="text-3xl font-bold text-[#8B2321]">₹{sweet.price}</p>
          <p
            className={`text-lg font-semibold ${
              sweet.quantity > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            Stock: {sweet.quantity}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="quantity" className="text-lg font-semibold text-[#8B2321]">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={sweet.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B2321] transition-all text-center"
              />
            </div>
            <button
              onClick={handlePurchase}
              disabled={sweet.quantity === 0 || quantity > sweet.quantity}
              className={`px-6 py-3 rounded-full font-semibold transition-colors shadow-lg ${
                sweet.quantity > 0
                  ? "bg-[#8B2321] text-white hover:bg-[#6e1c1a]"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              Buy Now
            </button>
          </div>

          {message && (
            <div
              className={`p-4 rounded-lg text-center font-semibold ${
                message.startsWith("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
      <PopularSweets text="Sweets you may Like"/>
    </div>
  );
};

export default SweetDetail;
