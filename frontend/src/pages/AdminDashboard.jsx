import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [editingSweet, setEditingSweet] = useState(null);

  // Fetch sweets
  const fetchSweets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sweets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data.data);
    } catch (err) {
      console.error("Error fetching sweets:", err);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new sweet
  const addSweet = async () => {
    try {
      await axios.post("http://localhost:5000/api/sweets", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Sweet added successfully");
      setForm({ name: "", category: "", price: "", quantity: "" });
      fetchSweets();
    } catch (err) {
      console.error("Error adding sweet:", err);
      alert("❌ Failed to add sweet");
    }
  };

  // Edit sweet
  const editSweet = (sweet) => {
    setEditingSweet(sweet);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
  };

  // Update sweet
  const updateSweet = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/sweets/${editingSweet._id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Sweet updated successfully");
      setEditingSweet(null);
      setForm({ name: "", category: "", price: "", quantity: "" });
      fetchSweets();
    } catch (err) {
      console.error("Error updating sweet:", err);
      alert("❌ Failed to update sweet");
    }
  };

  // Delete sweet
  const deleteSweet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/sweets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Sweet deleted successfully");
      fetchSweets();
    } catch (err) {
      console.error("Error deleting sweet:", err);
      alert("❌ Failed to delete sweet");
    }
  };

  // Restock sweet
  const restockSweet = async (id) => {
    const qty = prompt("Enter quantity to restock:");
    if (!qty || isNaN(qty)) return;
    try {
      await axios.post(
        `http://localhost:5000/api/sweets/${id}/restock`,
        { quantity: Number(qty) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("📦 Sweet restocked successfully");
      fetchSweets();
    } catch (err) {
      console.error("Error restocking sweet:", err);
      alert("❌ Failed to restock sweet");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">
        Admin Dashboard 🍭
      </h1>
      <h2 className="text-lg mb-4">Welcome, {user?.username}</h2>

      {/* Form */}
      <div className="bg-gray-100 p-4 rounded shadow mb-6">
        <h3 className="font-bold mb-2">
          {editingSweet ? "Edit Sweet" : "Add New Sweet"}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Sweet Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image || ""}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={editingSweet ? updateSweet : addSweet}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {editingSweet ? "Update Sweet" : "Add Sweet"}
        </button>
        {editingSweet && (
          <button
            onClick={() => {
              setEditingSweet(null);
              setForm({ name: "", category: "", price: "", quantity: "" });
            }}
            className="mt-3 ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Sweet List */}
      <h3 className="text-xl font-bold mb-4">All Sweets</h3>
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
            <p className="text-gray-600">Stock: {sweet.quantity}</p>

            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => editSweet(sweet)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteSweet(sweet._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => restockSweet(sweet._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Restock
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
