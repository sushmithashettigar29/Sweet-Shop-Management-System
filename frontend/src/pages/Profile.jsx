import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

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
    return <h2 className="text-center text-xl mt-10">Please login to view profile</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <h3 className="text-xl font-semibold mt-6">Purchased Sweets</h3>
      {purchases.length === 0 ? (
        <p className="text-gray-600">No purchases yet.</p>
      ) : (
        <ul className="list-disc ml-6 mt-2">
          {purchases.map((sweet, index) => (
            <li key={index} className="mb-2">
              {sweet.name} - {sweet.quantity} pcs @ ₹{sweet.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
