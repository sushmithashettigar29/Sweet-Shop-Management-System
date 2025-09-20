import { useNavigate } from "react-router-dom";

const SweetCard = ({ sweet }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-none shadow-xl p-4 transform transition-transform duration-300 hover:scale-105 cursor-pointer">
      <img
        src={sweet.image || "https://placehold.co/400x550/F5C7A9/8B2321?text=Sweet"}
        alt={sweet.name}
        className="w-full h-56 object-cover rounded-none mb-4 shadow-md sm:h-64"
      />
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-[#8B2321]">{sweet.name}</h3>
        <p className="text-lg font-bold text-[#8B2321]">₹{sweet.price}</p>
      </div>
      <p className="text-gray-600 text-sm">Quantity: {sweet.quantity}</p>
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <span
          className={`inline-block px-4 py-1 rounded-full text-[#8B2321] font-semibold text-sm ${
            sweet.quantity > 0 ? "bg-[#FFDAB9]" : "bg-red-500"
          }`}
        >
          {sweet.quantity > 0 ? "In Stock" : "Out of Stock"}
        </span>
        <button
          onClick={() => navigate(`/sweets/${sweet._id}`)}
          disabled={sweet.quantity === 0}
          className={`px-4 py-2 rounded-full font-semibold cursor-pointer transition-colors ${
            sweet.quantity > 0
              ? "bg-[#8B2321] text-white hover:bg-[#6e1c1a] shadow-lg"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default SweetCard;
