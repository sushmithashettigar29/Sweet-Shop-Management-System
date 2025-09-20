const Sweet = require("../models/Sweet");
const User = require("../models/User");

// Add a new sweet (Admin)
exports.addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity, image } = req.body;
    if (!name || !price) return res.status(400).json({ error: "Name and price are required" });

    const sweet = await Sweet.create({ name, category, price, quantity, image });
    res.status(201).json({ message: "Sweet added successfully", data: sweet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all sweets
exports.getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ name: 1 });
    res.status(200).json({ message: "Sweets fetched successfully", data: sweets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Search sweets
exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const filter = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = { $regex: category, $options: "i" };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const sweets = await Sweet.find(filter).sort({ name: 1 });
    res.status(200).json({ message: "Search results", data: sweets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update sweet (Admin)
exports.updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const sweet = await Sweet.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    res.status(200).json({ message: "Sweet updated successfully", data: sweet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete sweet (Admin)
exports.deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findByIdAndDelete(id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Purchase sweet (User)
exports.purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    if (!quantity || quantity <= 0) return res.status(400).json({ error: "Quantity must be greater than 0" });

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    if (sweet.quantity < quantity) return res.status(400).json({ error: "Insufficient stock" });

    sweet.quantity -= quantity;
    await sweet.save();

    const user = await User.findById(userId);
    user.purchases.push({
      name: sweet.name,
      price: sweet.price,
      quantity,
      total: sweet.price * quantity,
      image: sweet.image,
      date: new Date(),
    });
    await user.save();

    res.status(200).json({
      message: "Purchase successful",
      data: {
        sweet: sweet.name,
        quantity,
        total: sweet.price * quantity,
        remainingStock: sweet.quantity,
      },
    });
  } catch (error) {
    console.error("Purchase error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Restock sweet (Admin)
exports.restockSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (!quantity || quantity <= 0) return res.status(400).json({ error: "Quantity must be greater than 0" });

    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    sweet.quantity += quantity;
    await sweet.save();
    res.status(200).json({ message: "Restock successful", data: sweet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get sweet by id
exports.getSweetById = async (req, res) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findById(id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });
    res.status(200).json({ message: "Sweet fetched successfully", data: sweet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
