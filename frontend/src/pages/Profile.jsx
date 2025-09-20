import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        // Using a placeholder URL for the backend to allow the UI to render.
        const res = await axios.get("https://backend-nine-zeta-55.vercel.app/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPurchases(res.data.purchases || []);
      } catch (err) {
        console.error("Error fetching user purchases:", err);
      }
    };

    if (token) fetchPurchases();
  }, [token]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDF0D5] font-sans">
        <h2 className="text-2xl font-bold text-[#8B2321]">
          Please login to view profile
        </h2>
      </div>
    );
  }

  const userInitial = user.username
    ? user.username.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-[#FDF0D5] font-sans py-16 px-6 sm:px-12 md:px-24">
      <div className=" mx-auto p-8 ">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8 text-center md:text-left mb-12 border-b-2 border-[#8B2321] pb-8">
          <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#8B2321] rounded-full flex items-center justify-center text-white text-5xl sm:text-6xl font-extrabold mb-4 md:mb-0">
            {userInitial}
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#8B2321] mb-2">
              {user.username}
            </h2>
            <p className="text-lg text-gray-600">
              Welcome to your profile, find your purchases.
            </p>
          </div>
        </div>

        {/* Purchased Sweets Section */}
        <div>
          <h3 className="text-2xl font-bold text-[#8B2321] mb-6 text-center md:text-left">
            Your Purchases
          </h3>
          {purchases.length === 0 ? (
            <div className="text-center text-gray-600 py-8">
              <p>
                You haven't purchased any sweets yet. Time to start shopping!
              </p>
              <Link
                to="/all-sweets"
                className="mt-4 inline-block px-6 py-3 rounded-full font-semibold text-white bg-[#8B2321] hover:bg-[#6e1c1a] transition-colors"
              >
                Browse Sweets
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {purchases.map((sweet) => (
                <div
                  key={sweet._id}
                  className="bg-white border border-gray-200 p-4 transform transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={
                      sweet.image ||
                      "https://placehold.co/400x550/F5C7A9/8B2321?text=Sweet"
                    }
                    alt={sweet.name}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h4 className="text-xl font-bold text-[#8B2321]">{sweet.name}</h4>
                  <p className="text-gray-600 text-sm">
                    Quantity: {sweet.quantity} pcs
                  </p>
                  <p className="text-gray-800 font-semibold text-lg mt-2">
                    Total: ₹{sweet.total}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
