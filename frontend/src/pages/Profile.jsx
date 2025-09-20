import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import WaveBottom from "../components/WaveBottom";

const Profile = () => {
  const { user, token } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
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
    <div className="relative min-h-screen bg-[#FDF0D5] font-sans overflow-hidden">
      <div className="py-16 px-6 sm:px-12 md:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
            <div className="flex flex-col md:flex-row items-center md:space-x-8 text-center md:text-left">
              <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#8B2321] rounded-full flex items-center justify-center text-white text-5xl sm:text-6xl font-extrabold mb-4 md:mb-0">
                {userInitial}
              </div>
              <div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#8B2321] mb-2">
                  Hello, {user.username}!
                </h2>
                <p className="text-xl text-gray-600">
                  Manage your account and view your purchase history.
                </p>
              </div>
            </div>
            <div className="mt-8 md:mt-12 text-center md:text-left">
              <h3 className="text-2xl font-bold text-[#8B2321]">
                Account Details
              </h3>
              <p className="text-lg text-gray-700 mt-2">
                <strong>Role:</strong> <span className="text-gray-600">{user.role}</span>
              </p>
            </div>
          </div>

          {/* Purchased Sweets Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-20">
            <h3 className="text-3xl font-bold text-[#8B2321] mb-6 text-center md:text-left">
              Your Purchases
            </h3>
            {purchases.length === 0 ? (
              <div className="text-center text-gray-600 py-8">
                <p>You haven't purchased any sweets yet. Time to start shopping!</p>
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
            </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <WaveBottom />
    </div>
  );
};

export default Profile;
